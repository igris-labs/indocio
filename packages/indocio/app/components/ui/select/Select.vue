<script setup lang="ts">
import { Select as Primitive } from 'akaza-ui'
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useAttrs,
  useTemplateRef,
  watch,
} from 'vue'

import { fitSelectPopup } from '../../../utils/select-popup'
import { cn } from '../../../utils/ui'
import uiConfig from '../ui.config'
import { selectVariants, resolveSelectVariants, type SelectProps, type SelectSlots } from './index'

defineOptions({ inheritAttrs: false })
// Preserve Akaza defaults when optional props, including Boolean aliases, are omitted.
const props = withDefaults(defineProps<SelectProps>(), {
  valueKey: undefined,
  labelKey: undefined,
  descriptionKey: undefined,
  disabledKey: undefined,
  placeholder: undefined,
  multiple: undefined,
  nullableValue: undefined,
  id: undefined,
  name: undefined,
  required: undefined,
  disabled: undefined,
  invalid: undefined,
  loop: undefined,
  autocomplete: undefined,
  filter: undefined,
  loading: undefined,
  emptyLabel: undefined,
  searchPlaceholder: undefined,
  resetSearchOnSelect: undefined,
  highlightOnHover: undefined,
  side: undefined,
  align: undefined,
  sideOffset: undefined,
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  ariaDescribedby: undefined,
  ui: undefined,
  modelValue: undefined,
  open: undefined,
  search: undefined,
})
defineSlots<SelectSlots>()
const primitive = useTemplateRef<InstanceType<typeof Primitive>>('primitive')
const active = ref(false)
const popupSide = ref<SelectProps['side']>()
const availableHeight = ref<number>()
let mutationObserver: MutationObserver | undefined
let resizeObserver: ResizeObserver | undefined
let observedViewport: HTMLElement | undefined
function measurePopup() {
  if (!active.value) return
  const root = primitive.value?.$el as HTMLElement | undefined
  const trigger = root?.querySelector<HTMLElement>('.akaza-select-trigger')
  const content = root?.querySelector<HTMLElement>('.akaza-select-content')
  const viewport = content?.querySelector<HTMLElement>('[role="listbox"]')
  if (!trigger || !content || !viewport) return
  if (viewport !== observedViewport) {
    if (observedViewport) resizeObserver?.unobserve(observedViewport)
    observedViewport = viewport
    resizeObserver?.observe(viewport)
  }
  if (!viewport.offsetHeight) return
  if (props.side === 'left' || props.side === 'right') return
  let top = 8
  let bottom = window.innerHeight - 8
  // Inline popups must fit both the screen and any scrolling/clipping ancestors.
  for (let parent = root?.parentElement; parent; parent = parent.parentElement) {
    if (!/(auto|scroll|hidden|clip)/.test(getComputedStyle(parent).overflowY)) continue
    const bounds = parent.getBoundingClientRect()
    top = Math.max(top, bounds.top + parent.clientTop)
    bottom = Math.min(bottom, bounds.top + parent.clientTop + parent.clientHeight)
  }
  const bounds = trigger.getBoundingClientRect()
  const offset = props.sideOffset ?? 6
  const above = Math.max(0, bounds.top - top - offset)
  const below = Math.max(0, bottom - bounds.bottom - offset)
  const chrome = content.offsetHeight - viewport.offsetHeight
  const placement = fitSelectPopup({
    above,
    below,
    chrome,
    scrollHeight: viewport.scrollHeight,
    maxHeight: 16 * parseFloat(getComputedStyle(document.documentElement).fontSize),
    preferred: props.side === 'top' ? 'top' : 'bottom',
  })
  popupSide.value = placement.side
  availableHeight.value = placement.height
}
function onOpenChange(open: boolean) {
  active.value = open
  if (open) void nextTick(measurePopup)
}
watch(
  () => props.open,
  (open) => {
    if (open !== undefined) onOpenChange(open)
  },
  { immediate: true },
)
onMounted(() => {
  const root = primitive.value?.$el as HTMLElement | undefined
  if (root) {
    resizeObserver = new ResizeObserver(measurePopup)
    resizeObserver.observe(root)
    mutationObserver = new MutationObserver(measurePopup)
    mutationObserver.observe(root, { childList: true, subtree: true })
  }
  window.addEventListener('scroll', measurePopup, { capture: true, passive: true })
  window.addEventListener('resize', measurePopup)
})
onBeforeUnmount(() => {
  mutationObserver?.disconnect()
  resizeObserver?.disconnect()
  window.removeEventListener('scroll', measurePopup, true)
  window.removeEventListener('resize', measurePopup)
})
const attrs = useAttrs()
const styles = computed(() => selectVariants(resolveSelectVariants(props, uiConfig)))
const mergedUi = computed(() => {
  const overrides = props.ui as Record<string, string | undefined> | undefined
  return Object.fromEntries(
    Object.entries(styles.value).map(([part, style]) => [
      part,
      cn(style(), overrides?.[part], part === 'root' ? props.class : undefined),
    ]),
  )
})
const primitiveProps = computed(() => {
  const { class: _class, ui: _ui, size: _size, variant: _variant, ...native } = props
  return { ...native, side: popupSide.value ?? native.side }
})
</script>
<template>
  <component
    :is="Primitive"
    ref="primitive"
    v-bind="{ ...primitiveProps, ...attrs }"
    :ui="mergedUi"
    :style="
      availableHeight === undefined
        ? undefined
        : { '--ipex-select-available-height': `${availableHeight}px` }
    "
    @open-change="onOpenChange"
  >
    <template v-if="!$slots.trigger" #trigger="scope">
      <span v-if="scope.selectedLabel" :class="mergedUi.value" class="akaza-select-value">
        <slot
          name="value"
          :option="scope.selectedOption"
          :options="scope.selectedOptions"
          :value="scope.selectedValue"
          :values="scope.selectedValues"
          :label="scope.selectedLabel"
          >{{ scope.selectedLabel }}</slot
        >
      </span>
      <span v-else :class="mergedUi.placeholder" class="akaza-select-placeholder">{{
        scope.placeholder
      }}</span>
      <svg
        :class="mergedUi.icon"
        class="akaza-select-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </template>
    <template v-for="(_, name) in $slots" #[name]="scope"
      ><slot :name="name as keyof SelectSlots" v-bind="scope ?? {}"
    /></template>
  </component>
</template>
