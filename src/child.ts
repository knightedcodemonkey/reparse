import { argv } from 'node:process'

import { parseSync, parseFileSync } from '@swc/core'

import { baseConfig, esConfig, tsConfig } from './config.js'
import type { LangOrOpts } from './types.js'

const parse = () => {
  const langOrOpts = JSON.parse(argv[3]) as LangOrOpts
  const opts =
    typeof langOrOpts === 'object'
      ? langOrOpts
      : langOrOpts === 'es'
        ? Object.assign(baseConfig, esConfig)
        : Object.assign(baseConfig, tsConfig)
  const ast = argv[4] === 'file' ? parseFileSync(argv[2], opts) : parseSync(argv[2], opts)

  if (typeof process.send === 'function') {
    process.send(ast)
  }
}

parse()
