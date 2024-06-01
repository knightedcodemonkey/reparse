import { fork } from 'node:child_process'
import { join } from 'node:path'

import type { Module } from '@swc/core'

type Lang = 'ts' | 'es'

const isModule = (msg: unknown): msg is Module => {
  if (msg && typeof msg === 'object' && 'type' in msg && msg.type === 'Module') {
    return true
  }

  return false
}

const forkChild = (...args: string[]) => {
  /**
   * Circumvent SWC double parse span bug where start/end line numbers
   * are wrong on subsequent parsings.
   *
   * @see https://github.com/swc-project/swc/issues/1366
   */
  const child = fork(join(import.meta.dirname, 'child.js'), [...args], {
    serialization: 'advanced',
  })

  return new Promise<Module>((resolve, reject) => {
    child.on('message', msg => {
      if (isModule(msg)) {
        resolve(msg)
      }

      reject('unexpected parse response format')
    })
    child.on('error', err => {
      reject(err.message)
    })
  })
}
export const reparse = (source: string, lang: Lang = 'ts') => {
  return forkChild(source, lang)
}
export const reparseFile = (file: string, lang: Lang = 'ts') => {
  return forkChild(file, lang, 'file')
}
