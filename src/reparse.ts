import { fork, spawnSync } from 'node:child_process'
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
const spawnChild = (...args: string[]) => {
  const { stdout } = spawnSync('node', [join(import.meta.dirname, 'childSync.js'), ...args])
  const ast = JSON.parse(stdout.toString()) as Module

  return ast
}
export const reparse = (source: string, lang: Lang = 'ts') => {
  return forkChild(source, lang)
}
export const reparseFile = (file: string, lang: Lang = 'ts') => {
  return forkChild(file, lang, 'file')
}
export const reparseSync = (source: string, lang: Lang = 'ts') => {
  return spawnChild(source, lang)
}
export const reparseFileSync = (file: string, lang: Lang = 'ts') => {
  return spawnChild(file, lang, 'file')
}
