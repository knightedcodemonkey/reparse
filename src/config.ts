import type { JscTarget, TsParserConfig, EsParserConfig } from '@swc/core'

export const baseConfig = {
  comments: false,
  target: 'esnext' as JscTarget,
  isModule: 'unknown',
}
export const tsConfig = {
  syntax: 'typescript',
  tsx: true,
  decorators: true,
} satisfies TsParserConfig
export const esConfig = {
  syntax: 'ecmascript',
  jsx: true,
  importAttributes: true,
  decorators: true,
} satisfies EsParserConfig
