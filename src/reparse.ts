import { fork, spawnSync } from 'node:child_process'
import { join } from 'node:path'

import type { Module, Script } from '@swc/core'

import type { LangOrOpts } from './types.js'

const isModuleOrScript = (msg: unknown): msg is Module | Script => {
  if (msg && typeof msg === 'object' && 'type' in msg && (msg.type === 'Module' || msg.type === 'Script')) {
    return true
  }

  return false
}
const forkChild = (...args: string[]) => {
  const child = fork(join(import.meta.dirname, 'child.js'), [...args], {
    serialization: 'advanced',
  })

  return new Promise<Module | Script>((resolve, reject) => {
    child.on('message', msg => {
      if (isModuleOrScript(msg)) {
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
export const reparse = (source: string, langOrOpts: LangOrOpts = 'ts') => {
  return forkChild(source, JSON.stringify(langOrOpts))
}
export const reparseFile = (file: string, langOrOpts: LangOrOpts = 'ts') => {
  return forkChild(file, JSON.stringify(langOrOpts), 'file')
}
export const reparseSync = (source: string, langOrOpts: LangOrOpts = 'ts') => {
  return spawnChild(source, JSON.stringify(langOrOpts))
}
export const reparseFileSync = (file: string, langOrOpts: LangOrOpts = 'ts') => {
  return spawnChild(file, JSON.stringify(langOrOpts), 'file')
}
