import { argv } from 'node:process'

import { parseSync, parseFileSync } from '@swc/core'

const baseConfig = {
  comments: false,
  target: 'esnext',
  isModule: true,
}
const tsConfig = {
  syntax: 'typescript',
  tsx: true,
}
const esConfig = {
  syntax: 'ecmascript',
  jsx: true,
  importAttributes: true,
}
const parse = () => {
  const parseOptions = Object.assign(baseConfig, argv[3] === 'es' ? esConfig : tsConfig)
  const ast = argv[4] === 'file' ? parseFileSync(argv[2], parseOptions) : parseSync(argv[2], parseOptions)

  if (typeof process.send === 'function') {
    process.send(ast)
  }
}

parse()
