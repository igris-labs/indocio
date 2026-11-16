import { defaultLoader, highlightHTML, setLoader } from '@speed-highlight/core'
import type { ShjLanguageData, ShjRule } from '@speed-highlight/core'
import markdownRules from '@speed-highlight/core/languages/md.js'

const aliases: Record<string, string> = {
  typescript: 'ts',
  javascript: 'js',
  shellscript: 'bash',
  shell: 'bash',
  sh: 'bash',
  zsh: 'bash',
  console: 'bash',
  shellsession: 'bash',
  yml: 'yaml',
  markdown: 'md',
  mdc: 'md',
  text: 'plain',
  txt: 'plain',
}
const tag: ShjRule = {
  match: /<\/?[A-Za-z][\w.:-]*(?:[^>"']|"[^"]*"|'[^']*')*>/g,
  sub: [
    { match: /^<\/?[\w.:-]+/g, type: 'var' },
    { match: /(?:v-[\w:-]+|[@:#][\w.:-]+)(?:\.[\w-]+)*/g, type: 'class' },
    { match: /[\w:@#][\w.:-]*(?=\s*=)/g, type: 'class' },
    { match: /"[^"]*"|'[^']*'/g, type: 'str' },
    { match: /[=<>/]/g, type: 'oper' },
  ],
}
const vue: ShjLanguageData = [
  { match: /<!--[\s\S]*?-->/g, type: 'cmnt' },
  {
    match: /<script\b[^>]*>[\s\S]*?<\/script\s*>/g,
    sub: [tag, { match: /(?<=>)[\s\S]+(?=<\/script\s*>$)/g, sub: 'ts' }],
  },
  {
    match: /<style\b[^>]*>[\s\S]*?<\/style\s*>/g,
    sub: [tag, { match: /(?<=>)[\s\S]+(?=<\/style\s*>$)/g, sub: 'css' }],
  },
  { match: /\{\{[\s\S]*?\}\}/g, sub: 'ts' },
  tag,
]
const mdcAttributes: ShjRule[] = [
  { match: /^:+[\w-]+/g, type: 'kwd' },
  { match: /[\w:@#][\w.:-]*(?=\s*=)/g, type: 'var' },
  { match: /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, type: 'str' },
  { match: /[{}=]/g, type: 'oper' },
]
const markdown: ShjRule[] = [
  {
    match: /^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1[ \t\r]*$/gm,
    sub: (source) => {
      const language = source.match(/^[`~]+([\w+-]+)/)?.[1] ?? 'plain'
      return {
        type: 'oper',
        sub: [
          {
            match: /(?<=\n)[\s\S]*(?=\n[`~]{3,}[ \t\r]*$)/g,
            sub: aliases[language] ?? language,
          },
        ],
      }
    },
  },
  { match: /^---[ \t]*\r?\n[\s\S]*?^---[ \t\r]*$/gm, sub: 'yaml' },
  { match: /^:{2,}[\w-]*(?:\{[^\n]*\})?[ \t\r]*$/gm, sub: mdcAttributes },
  { match: /(?<!:):[A-Za-z][\w-]*(?:\{[^\n]*?\})?(?:\[[^\n]*?\])?/g, sub: mdcAttributes },
  { match: /^#[A-Za-z][\w-]*[ \t\r]*$/gm, type: 'func' },
  { match: /^#{1,6}[ \t]+.*$/gm, type: 'kwd' },
  ...markdownRules,
]
setLoader((name) => (name === 'vue' ? vue : name === 'md' ? markdown : defaultLoader(name)))

export async function highlightCode(code: string, language: string) {
  let html = await highlightHTML(code, aliases[language] ?? language, { block: false })
  if (language === 'vue' || language === 'html') {
    html = html
      .replace(/class="shj-syn-var">(&lt;\/?[\w.:-]+)/g, 'class="shj-syn-tag">$1')
      .replace(/class="shj-syn-class"/g, 'class="shj-syn-attr"')
  }
  return html.replace(
    /<span class="shj-syn-kwd">(import|export|from|return|if|else|for|while|switch|case|break|continue|throw|try|catch|finally|await|yield)<\/span>/g,
    '<span class="shj-syn-control">$1</span>',
  )
}
