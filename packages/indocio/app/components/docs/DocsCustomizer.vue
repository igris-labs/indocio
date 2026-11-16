<script setup lang="ts">
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue'

import {
  customizationExports,
  customizationSchema,
  interfaceFonts,
  codeFonts,
  siteSizes,
} from '../../utils/customizer'
import type { Customization, ThemeColors, ThemeMode } from '../../utils/customizer'
import type { DocsSettings } from '../../utils/docs-config'
import { docsSettingsSchema } from '../../utils/docs-config'
import { cn } from '../../utils/ui'
import { fieldVariants } from '../ui/field'

const { open, preferences, reset } = useCustomizer()
const colorMode = useColorMode()
const route = useRoute()
const { brand } = useIndocio()
const { data: page } = await useAsyncData(
  () => `docs:${route.path}`,
  () => queryCollection('docs').path(route.path).first(),
)
const { settings, spaces } = await useDocsSettings(page)
const view = ref<'theme' | 'colors' | 'typography' | 'layout' | 'visibility' | 'export'>('theme')
const settingLabelClass = cn(fieldVariants().label(), 'text-[13px] leading-4 font-normal')
const direction = ref<'forward' | 'back'>('forward')
const screenTitle = useTemplateRef<HTMLElement>('screenTitle')
const viewTitles = {
  theme: 'Theme',
  colors: 'Colors & contrast',
  typography: 'Typography',
  layout: 'Layout',
  visibility: 'Visible elements',
  export: 'Get code',
}
const editingMode = ref<ThemeMode>('light')
const currentMode = computed<ThemeMode>(() => (colorMode.value === 'dark' ? 'dark' : 'light'))
const fontOptions = [
  { value: 'site', label: 'Site default' },
  ...interfaceFonts.map((font) => ({ value: font.id, label: font.label })),
]
const monoOptions = [
  { value: 'site', label: 'Site default' },
  ...codeFonts.map((font) => ({ value: font.id, label: font.label })),
]
const sizeOptions = [
  { value: 'site', label: 'Site default' },
  ...siteSizes.map((size) => ({ value: size.id, label: size.label })),
]
const radiusOptions = computed(() => [
  { value: 'site', label: 'Site default' },
  ...[
    ...new Set([
      0,
      0.25,
      0.5,
      0.75,
      1,
      ...(preferences.value.theme?.radius === undefined ? [] : [preferences.value.theme.radius]),
    ]),
  ]
    .sort((a, b) => a - b)
    .map((value) => ({ value: String(value), label: value === 0 ? 'Square' : `${value}rem` })),
])
const status = ref('')
function navigate(next: typeof view.value) {
  direction.value = next === 'theme' ? 'back' : 'forward'
  view.value = next
  status.value = ''
  nextTick(() =>
    document.querySelector('.customizer-panel .akaza-drawer-body')?.scrollTo({ top: 0 }),
  )
}
const theme = computed(() => preferences.value.theme ?? {})
type Theme = NonNullable<Customization['theme']>
function setTheme<K extends keyof Theme>(key: K, value: Theme[K]) {
  const next = { ...preferences.value.theme, [key]: value }
  if (value === undefined) delete next[key]
  preferences.value = { ...preferences.value, theme: Object.keys(next).length ? next : undefined }
}
function setColor(key: keyof ThemeColors, value: string, mode = editingMode.value) {
  const colors = { ...theme.value[mode], [key]: value }
  if (value === 'site') delete colors[key]
  const parsed = customizationSchema.shape.theme.unwrap().shape[mode].safeParse(colors)
  if (parsed.success) setTheme(mode, Object.keys(colors).length ? parsed.data : undefined)
}
function setNumber(key: keyof Theme, value: unknown) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return
  const result = customizationSchema.shape.theme.safeParse({ ...theme.value, [key]: value })
  if (result.success) preferences.value = { ...preferences.value, theme: result.data }
}
const sizeControls = [
  { key: 'textSize', label: 'Reading text size', fallback: 15, min: 12, max: 22 },
  { key: 'headingSize', label: 'Page title size', fallback: 32, min: 24, max: 48 },
  { key: 'codeSize', label: 'Code text size', fallback: 13, min: 11, max: 20 },
] as const
function setDocs(patch: DocsSettings) {
  const previous = preferences.value.docs
  preferences.value = {
    ...preferences.value,
    docs: {
      ...previous,
      ...patch,
      content: { ...previous?.content, ...patch.content },
      sidebar: { ...previous?.sidebar, ...patch.sidebar },
      toc: { ...previous?.toc, ...patch.toc },
      actions: { ...previous?.actions, ...patch.actions },
    },
  }
}
const widthDraft = ref(settings.value.content.width)
const widthError = computed(
  () => !docsSettingsSchema.safeParse({ content: { width: widthDraft.value } }).success,
)
watch(
  () => settings.value.content.width,
  (value) => {
    widthDraft.value = value
  },
)
function changeWidth(value: unknown) {
  widthDraft.value = String(value)
  if (!widthError.value) setDocs({ content: { width: widthDraft.value } })
}
watch(
  preferences,
  () => {
    status.value = ''
  },
  { deep: true, flush: 'sync' },
)
watch(
  () => colorMode.preference,
  () => {
    status.value = ''
  },
  { flush: 'sync' },
)
watch(open, (value) => {
  if (value) {
    widthDraft.value = settings.value.content.width
    status.value = ''
    view.value = 'theme'
    editingMode.value = currentMode.value
  }
})
function resetAll() {
  reset()
  colorMode.preference = 'system'
  status.value = 'Site defaults restored'
}
const exportFiles = computed(() => customizationExports(preferences.value, colorMode.preference))
const copyOptions = [
  { key: 'mainCss', file: 'main.css', path: 'app/assets/main.css' },
  { key: 'appConfig', file: 'app.config.ts', path: 'app/app.config.ts' },
  { key: 'nuxtConfig', file: 'nuxt.config.ts', path: 'nuxt.config.ts' },
  { key: 'uiPlugin', file: 'ui.ts', path: 'app/plugins/ui.ts' },
] as const
async function copyExport(key: keyof ReturnType<typeof customizationExports>, file: string) {
  const text = exportFiles.value[key]
  if (!text) return
  try {
    await navigator.clipboard.writeText(text)
    status.value = `${file} copied`
  } catch {
    status.value = `Unable to copy ${file}`
  }
}
const switches = computed(() => [
  {
    key: 'sidebar',
    label: 'Sidebar',
    checked: settings.value.sidebar.enabled,
    set: (value: boolean) => setDocs({ sidebar: { enabled: value } }),
  },
  {
    key: 'toc',
    label: 'Table of contents',
    checked: settings.value.toc.enabled,
    set: (value: boolean) => setDocs({ toc: { enabled: value } }),
  },
  {
    key: 'breadcrumbs',
    label: 'Breadcrumbs',
    checked: settings.value.breadcrumbs,
    set: (value: boolean) => setDocs({ breadcrumbs: value }),
  },
  {
    key: 'footer',
    label: 'Footer',
    checked: settings.value.footer,
    set: (value: boolean) => setDocs({ footer: value }),
  },
  {
    key: 'navigation',
    label: 'Previous and next links',
    checked: settings.value.navigation,
    set: (value: boolean) => setDocs({ navigation: value }),
  },
  {
    key: 'search',
    label: 'Search',
    checked: settings.value.search,
    set: (value: boolean) => setDocs({ search: value }),
  },
  {
    key: 'copyLink',
    label: 'Copy link action',
    checked: settings.value.actions.copyLink,
    set: (value: boolean) => setDocs({ actions: { copyLink: value } }),
  },
])
</script>

<template>
  <UiDrawer
    v-model="open"
    :title="viewTitles[view]"
    side="right"
    inset="0.75rem"
    width="sm"
    class="customizer-panel flex flex-col overflow-hidden rounded-xl"
    :ui="{
      overlay: 'bg-scrim/30',
      header: 'shrink-0',
      body: 'min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain',
      footer: 'shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]',
    }"
  >
    <template #header="{ titleId }">
      <div class="flex w-full items-center gap-2">
        <UiButton
          v-if="view !== 'theme'"
          variant="ghost"
          color="secondary"
          shape="icon"
          aria-label="Back to theme"
          @click="navigate('theme')"
          ><Icon mode="svg" name="tabler:chevron-left" class="size-4" aria-hidden="true"
        /></UiButton>
        <div :id="titleId" ref="screenTitle" tabindex="-1" class="min-w-0 flex-1 outline-none">
          <span class="block text-base font-semibold">{{ viewTitles[view] }}</span
          ><span v-if="view === 'theme'" class="block text-xs text-muted-foreground">{{
            brand.name
          }}</span>
        </div>
        <UiButton
          variant="ghost"
          color="secondary"
          shape="icon"
          aria-label="Close customizer"
          @click="open = false"
          ><Icon mode="svg" name="tabler:x" class="size-4" aria-hidden="true"
        /></UiButton>
      </div>
    </template>
    <template #body>
      <Transition
        :name="`customizer-${direction}`"
        mode="out-in"
        @after-enter="screenTitle?.focus({ preventScroll: true })"
      >
        <div :key="view" class="customizer-screen">
          <div v-if="view === 'theme'" class="space-y-2">
            <div class="flex w-full items-center gap-3">
              <Icon
                mode="svg"
                name="tabler:device-desktop"
                class="size-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
              /><span class="min-w-0 flex-1" :class="settingLabelClass">Mode</span>
              <UiToggleGroup
                :model-value="colorMode.preference"
                :allow-empty="false"
                :options="[
                  { value: 'light', label: 'Use light mode', icon: 'tabler:sun' },
                  { value: 'dark', label: 'Use dark mode', icon: 'tabler:moon' },
                  { value: 'system', label: 'Use system mode', icon: 'tabler:device-desktop' },
                ]"
                aria-label="Color mode"
                @update:model-value="colorMode.preference = String($event)"
              >
                <template #item="{ option, label }">
                  <Icon mode="svg" :name="String(option.icon)" class="size-4" aria-hidden="true" />
                  <span class="sr-only">{{ label }}</span>
                </template>
              </UiToggleGroup>
            </div>
            <UiSeparator class="my-3" />
            <div
              v-for="token in ['primary', 'accent'] as const"
              :key="token"
              class="flex w-full items-center gap-3"
            >
              <Icon
                mode="svg"
                :name="token === 'primary' ? 'tabler:paint' : 'tabler:palette'"
                class="size-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
              /><span class="min-w-0 flex-1 capitalize" :class="settingLabelClass">{{ token }}</span
              ><DocsCustomizerColor
                class="w-44 max-w-[57%] shrink-0"
                :mode="currentMode"
                :label="`${currentMode === 'light' ? 'Light' : 'Dark'} ${token} background`"
                :model-value="theme[currentMode]?.[token]"
                :allow-primary="token === 'accent'"
                @update:model-value="setColor(token, $event, currentMode)"
              />
            </div>
            <div class="flex w-full items-center gap-3">
              <Icon
                mode="svg"
                name="tabler:typography"
                class="size-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
              /><span class="min-w-0 flex-1" :class="settingLabelClass">Font</span
              ><UiSelect
                class="w-44 max-w-[57%] shrink-0"
                :model-value="theme.font ?? 'site'"
                :options="fontOptions"
                aria-label="Interface font"
                @update:model-value="
                  setTheme('font', $event === 'site' ? undefined : ($event as Theme['font']))
                "
              />
            </div>
            <div class="flex w-full items-center gap-3">
              <Icon
                mode="svg"
                name="tabler:resize"
                class="size-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
              /><span class="min-w-0 flex-1" :class="settingLabelClass">Site size</span
              ><UiSelect
                class="w-44 max-w-[57%] shrink-0"
                :model-value="theme.size ?? 'site'"
                :options="sizeOptions"
                aria-label="Site size"
                @update:model-value="
                  setTheme('size', $event === 'site' ? undefined : ($event as Theme['size']))
                "
              />
            </div>
            <div class="flex w-full items-center gap-3">
              <Icon
                mode="svg"
                name="tabler:border-radius"
                class="size-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
              /><span class="min-w-0 flex-1" :class="settingLabelClass">Radius</span
              ><UiSelect
                class="w-44 max-w-[57%] shrink-0"
                :model-value="theme.radius === undefined ? 'site' : String(theme.radius)"
                :options="radiusOptions"
                aria-label="Corner radius preset"
                @update:model-value="
                  $event === 'site'
                    ? setTheme('radius', undefined)
                    : setNumber('radius', Number($event))
                "
              />
            </div>
            <UiSeparator class="my-3" />
            <UiButton
              v-for="item in [
                {
                  key: 'colors',
                  label: 'Colors & contrast',
                  icon: 'tabler:adjustments-horizontal',
                  summary: 'Light & dark',
                },
                {
                  key: 'typography',
                  label: 'Typography',
                  icon: 'tabler:letter-case',
                  summary: 'Fonts & sizes',
                },
                {
                  key: 'layout',
                  label: 'Layout',
                  icon: 'tabler:layout-sidebar',
                  summary: 'Content & navigation',
                },
                {
                  key: 'visibility',
                  label: 'Visible elements',
                  icon: 'tabler:eye',
                  summary: `${switches.filter((item) => item.checked).length} shown`,
                },
              ] as const"
              :key="item.key"
              variant="ghost"
              color="secondary"
              :ui="{ content: 'w-full justify-start' }"
              class="w-full text-left"
              @click="navigate(item.key)"
            >
              <Icon mode="svg" :name="item.icon" class="size-4 shrink-0" aria-hidden="true" /><span
                class="min-w-0 flex-1"
                :class="settingLabelClass"
                >{{ item.label }}</span
              ><span class="ml-auto max-w-[42%] truncate text-xs text-muted-foreground">{{
                item.summary
              }}</span
              ><Icon
                mode="svg"
                name="tabler:chevron-right"
                class="size-4 shrink-0"
                aria-hidden="true"
              />
            </UiButton>
          </div>
          <div v-else-if="view === 'colors'" class="flex min-w-0 flex-col gap-5">
            <UiToggleGroup
              v-model="editingMode"
              :allow-empty="false"
              :options="[
                { value: 'light', label: 'Light colors' },
                { value: 'dark', label: 'Dark colors' },
              ]"
              aria-label="Edit color scheme"
            />
            <p class="text-xs leading-5 text-muted-foreground">
              Edit each color scheme independently. Mode on the main screen controls the preview.
            </p>
            <fieldset
              v-for="token in ['primary', 'secondary', 'accent'] as const"
              :key="token"
              class="flex min-w-0 flex-col gap-3 text-[13px] leading-4 [&>legend]:mb-3 [&>legend]:font-medium"
            >
              <legend class="capitalize">{{ token }}</legend>
              <div class="flex min-w-0 flex-col gap-2 text-[13px] leading-4 font-normal">
                <span>Background</span
                ><DocsCustomizerColor
                  :mode="editingMode"
                  :label="`${editingMode === 'light' ? 'Light' : 'Dark'} ${token} background`"
                  :model-value="theme[editingMode]?.[token]"
                  :allow-primary="token === 'accent'"
                  @update:model-value="setColor(token, $event)"
                />
              </div>
              <div class="flex min-w-0 flex-col gap-2 text-[13px] leading-4 font-normal">
                <span>Foreground</span
                ><DocsCustomizerColor
                  :mode="editingMode"
                  :label="`${editingMode === 'light' ? 'Light' : 'Dark'} ${token} foreground`"
                  :model-value="theme[editingMode]?.[`${token}Foreground`]"
                  foreground
                  @update:model-value="setColor(`${token}Foreground`, $event)"
                />
              </div>
            </fieldset>
          </div>
          <div v-else-if="view === 'typography'" class="flex min-w-0 flex-col gap-5">
            <div class="flex min-w-0 flex-col gap-2 text-[13px] leading-4 font-normal">
              <label for="customizer-font">Interface font</label
              ><UiSelect
                id="customizer-font"
                :model-value="theme.font ?? 'site'"
                :options="fontOptions"
                aria-label="Interface font"
                @update:model-value="
                  setTheme('font', $event === 'site' ? undefined : ($event as Theme['font']))
                "
              />
            </div>
            <div class="flex min-w-0 flex-col gap-2 text-[13px] leading-4 font-normal">
              <label for="customizer-mono">Code font</label
              ><UiSelect
                id="customizer-mono"
                :model-value="theme.mono ?? 'site'"
                :options="monoOptions"
                aria-label="Code font"
                @update:model-value="
                  setTheme('mono', $event === 'site' ? undefined : ($event as Theme['mono']))
                "
              />
            </div>
            <p class="text-xs leading-5 text-muted-foreground">
              Site size scales type, controls and spacing together. Fine-tune individual values
              below.
            </p>
            <div
              v-for="control in sizeControls"
              :key="control.key"
              class="flex items-center justify-between gap-3 text-[13px] leading-4 font-normal [&>label>span]:text-xs [&>label>span]:text-muted-foreground"
            >
              <label>{{ control.label }} <span>px</span></label
              ><UiNumberField
                class="w-40 shrink-0"
                :model-value="theme[control.key] ?? control.fallback"
                :min="control.min"
                :max="control.max"
                :step="1"
                :aria-label="`${control.label} value`"
                @update:model-value="setNumber(control.key, $event)"
              />
            </div>
            <UiSeparator class="my-3" />
            <div
              class="flex items-center justify-between gap-3 text-[13px] leading-4 font-normal [&>label>span]:text-xs [&>label>span]:text-muted-foreground"
            >
              <label>Corner radius <span>rem</span></label
              ><UiNumberField
                class="w-40 shrink-0"
                :model-value="theme.radius ?? 0.625"
                :min="0"
                :max="1.5"
                :step="0.125"
                aria-label="Corner radius value"
                @update:model-value="setNumber('radius', $event)"
              />
            </div>
            <UiSlider
              :model-value="theme.radius ?? 0.625"
              :min="0"
              :max="1.5"
              :step="0.125"
              aria-label="Corner radius"
              @update:model-value="setNumber('radius', $event)"
            />
          </div>
          <div v-else-if="view === 'layout'" class="flex min-w-0 flex-col gap-5">
            <div class="flex min-w-0 flex-col gap-2 text-[13px] leading-4 font-normal">
              <label for="customizer-width">Article maximum width</label
              ><UiInput
                id="customizer-width"
                :model-value="widthDraft"
                :invalid="widthError"
                aria-label="Article maximum width"
                @update:model-value="changeWidth"
              />
              <p v-if="widthError" role="status" class="text-xs text-destructive">
                Use a positive CSS length, such as 42rem or 800px.
              </p>
              <p v-else class="text-xs leading-5 text-muted-foreground">
                Content stays centered on screen.
              </p>
            </div>
            <div class="flex min-w-0 flex-col gap-2 text-[13px] leading-4 font-normal">
              <label for="customizer-toc">Table of contents</label
              ><UiSelect
                id="customizer-toc"
                :model-value="settings.toc.position"
                :options="[
                  { value: 'content', label: 'Beside content' },
                  { value: 'right', label: 'Right edge' },
                ]"
                aria-label="Table of contents position"
                @update:model-value="setDocs({ toc: { position: $event as 'content' | 'right' } })"
              />
            </div>
            <div class="flex min-w-0 flex-col gap-2 text-[13px] leading-4 font-normal">
              <label for="customizer-depth">Heading depth</label
              ><UiSelect
                id="customizer-depth"
                :model-value="String(settings.toc.depth)"
                :options="
                  [2, 3, 4, 5, 6].map((value) => ({
                    value: String(value),
                    label: `Through H${value}`,
                  }))
                "
                aria-label="Heading depth"
                @update:model-value="setDocs({ toc: { depth: Number($event) } })"
              />
            </div>
            <div
              class="flex items-center justify-between gap-3 text-[13px] leading-4 font-normal [&>label>span]:text-xs [&>label>span]:text-muted-foreground"
            >
              <label>Sidebar width <span>px</span></label
              ><UiNumberField
                class="w-40 shrink-0"
                :model-value="settings.sidebar.width"
                :min="180"
                :max="480"
                :step="4"
                aria-label="Sidebar width value"
                @update:model-value="
                  typeof $event === 'number' && setDocs({ sidebar: { width: $event } })
                "
              />
            </div>
            <UiCheckbox
              :model-value="settings.sidebar.collapsible"
              label="Collapsible desktop sidebar"
              @update:model-value="setDocs({ sidebar: { collapsible: $event === true } })"
            />
            <div
              v-for="control in [
                { key: 'headerHeight', label: 'Header height', fallback: 56, min: 48, max: 88 },
                { key: 'tocWidth', label: 'TOC width', fallback: 208, min: 160, max: 320 },
                { key: 'tocGap', label: 'TOC gap', fallback: 96, min: 16, max: 128 },
              ] as const"
              :key="control.key"
              class="flex items-center justify-between gap-3 text-[13px] leading-4 font-normal [&>label>span]:text-xs [&>label>span]:text-muted-foreground"
            >
              <label>{{ control.label }} <span>px</span></label
              ><UiNumberField
                class="w-40 shrink-0"
                :model-value="theme[control.key] ?? control.fallback"
                :min="control.min"
                :max="control.max"
                :step="4"
                :aria-label="`${control.label} value`"
                @update:model-value="setNumber(control.key, $event)"
              />
            </div>
            <div
              v-if="spaces.length > 1"
              class="flex min-w-0 flex-col gap-2 text-[13px] leading-4 font-normal"
            >
              <label for="customizer-switcher">Product switcher</label
              ><UiSelect
                id="customizer-switcher"
                :model-value="preferences.switcher ?? brand.spaces.switcher"
                :options="[
                  { value: 'dropdown', label: 'Dropdown' },
                  { value: 'tabs', label: 'Tabs' },
                ]"
                aria-label="Product switcher"
                @update:model-value="
                  preferences = { ...preferences, switcher: $event as 'dropdown' | 'tabs' }
                "
              />
            </div>
          </div>
          <div v-else-if="view === 'visibility'" class="flex min-w-0 flex-col gap-5">
            <p class="text-xs leading-5 text-muted-foreground">
              Choose what readers see around the article.
            </p>
            <div v-for="control in switches" :key="control.key" class="py-2">
              <UiCheckbox
                :model-value="control.checked"
                :label="control.label"
                @update:model-value="control.set($event === true)"
              />
            </div>
          </div>
          <div v-else class="flex min-w-0 flex-col gap-5">
            <p class="text-xs leading-5 text-muted-foreground">
              Copy a snippet for each file, then merge it into your project.
            </p>
            <div
              v-for="option in copyOptions"
              :key="option.key"
              class="flex min-w-0 flex-col gap-1"
            >
              <UiButton
                variant="outline"
                color="secondary"
                :ui="{ content: 'w-full justify-between' }"
                class="w-full text-left"
                :aria-label="`Copy ${option.file}`"
                :aria-describedby="`customizer-export-${option.key}`"
                :disabled="!exportFiles[option.key]"
                @click="copyExport(option.key, option.file)"
              >
                <span class="truncate">{{ option.file }}</span>
                <Icon mode="svg" name="tabler:copy" class="size-4" aria-hidden="true" />
              </UiButton>
              <span
                :id="`customizer-export-${option.key}`"
                class="px-2.5 text-xs break-all text-muted-foreground"
                >{{ option.path }}</span
              >
            </div>
            <p v-if="!exportFiles.uiPlugin" class="text-xs leading-5 text-muted-foreground">
              Choose a site size to enable the UI defaults export.
            </p>
            <UiButton
              variant="outline"
              color="secondary"
              @click="copyExport('json', 'All settings (JSON)')"
              >Copy all (JSON)</UiButton
            >
          </div>
        </div>
      </Transition>
    </template>
    <template #footer>
      <UiButton variant="ghost" color="secondary" class="mr-auto" @click="resetAll">Reset</UiButton>
      <UiButton v-if="view !== 'export'" variant="solid" color="primary" @click="navigate('export')"
        >Get code<Icon mode="svg" name="tabler:code" class="size-4" aria-hidden="true"
      /></UiButton>
      <span v-else role="status" class="text-xs text-muted-foreground">{{
        status || 'Saved in this browser'
      }}</span>
      <p v-if="status && view !== 'export'" role="status" class="sr-only">
        {{ status }}
      </p>
    </template>
  </UiDrawer>
</template>
<style>
.customizer-screen {
  min-width: 0;
}
.customizer-forward-enter-active,
.customizer-back-enter-active {
  transition:
    transform 180ms var(--ease-enter),
    opacity 180ms var(--ease-enter);
  pointer-events: none;
}
.customizer-forward-leave-active,
.customizer-back-leave-active {
  transition:
    transform 120ms var(--ease-exit),
    opacity 120ms var(--ease-exit);
  pointer-events: none;
}
.customizer-forward-enter-from,
.customizer-back-leave-to {
  transform: translateX(2rem);
  opacity: 0;
}
.customizer-forward-leave-to,
.customizer-back-enter-from {
  transform: translateX(-2rem);
  opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
  .customizer-forward-enter-active,
  .customizer-forward-leave-active,
  .customizer-back-enter-active,
  .customizer-back-leave-active {
    transition-duration: 1ms;
  }
  .customizer-forward-enter-from,
  .customizer-forward-leave-to,
  .customizer-back-enter-from,
  .customizer-back-leave-to {
    transform: none;
  }
}
</style>
