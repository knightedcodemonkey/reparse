import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { resolve, join } from 'node:path'

import { reparse, reparseFile, reparseSync, reparseFileSync } from '@knighted/reparse'

const fixtures = resolve(import.meta.dirname, 'fixtures')

describe('@knighted/reparse', () => {
  it('returns correct spans with multiple swc parsings', async () => {
    const ast1 = await reparse('const foo = "bar"')
    const ast2 = await reparse('const foo = "bar"')
    const ast3 = await reparseFile(join(fixtures, 'file.ts'))
    const ast4 = await reparseFile(join(fixtures, 'file.ts'))

    assert.equal(ast1.span.start, ast2.span.start)
    assert.equal(ast1.span.end, ast2.span.end)
    assert.equal(ast3.span.start, ast4.span.start)
    assert.equal(ast3.span.end, ast4.span.end)
  })

  it('returns correct spans with multiple swc parsings synchronously', () => {
    const ast1 = reparseSync('const foo = "bar"')
    const ast2 = reparseSync('const foo = "bar"')
    const ast3 = reparseFileSync(join(fixtures, 'file.ts'))
    const ast4 = reparseFileSync(join(fixtures, 'file.ts'))

    assert.equal(ast1.span.start, ast2.span.start)
    assert.equal(ast1.span.end, ast2.span.end)
    assert.equal(ast3.span.start, ast4.span.start)
    assert.equal(ast3.span.end, ast4.span.end)
  })

  it('works with ParseOptions', async () => {
    const ast1 = await reparse('import "foo" assert { type: "json" }', {
      syntax: 'ecmascript',
      importAttributes: true,
    })
    const ast2 = await reparse('import "foo" assert { type: "json" }', {
      syntax: 'ecmascript',
      importAttributes: true,
    })
    const ast3 = await reparse('<a>{b}</a>', {
      syntax: 'typescript',
      tsx: true,
    })
    const ast4 = await reparse('<a>{b}</a>', {
      syntax: 'typescript',
      tsx: true,
    })
    const ast5 = reparseSync('import "foo" assert { type: "json" }', {
      syntax: 'ecmascript',
      importAttributes: true,
    })
    const ast6 = await reparseSync('import "foo" assert { type: "json" }', {
      syntax: 'ecmascript',
      importAttributes: true,
    })
    const ast7 = await reparseSync('<a>{b}</a>', {
      syntax: 'typescript',
      tsx: true,
    })
    const ast8 = await reparseSync('<a>{b}</a>', {
      syntax: 'typescript',
      tsx: true,
    })

    assert.equal(ast1.span.start, ast2.span.start)
    assert.equal(ast1.span.end, ast2.span.end)
    assert.equal(ast3.span.start, ast4.span.start)
    assert.equal(ast3.span.end, ast4.span.end)
    assert.equal(ast5.span.start, ast6.span.start)
    assert.equal(ast5.span.end, ast6.span.end)
    assert.equal(ast7.span.start, ast8.span.start)
    assert.equal(ast7.span.end, ast8.span.end)
  })

  it('works with comments', async () => {
    const ast1 = await reparseFile(join(fixtures, 'commented.js'))
    const ast2 = await reparseFile(join(fixtures, 'commented.js'))

    assert.equal(ast1.span.start, ast2.span.start)
    assert.equal(ast1.span.end, ast2.span.end)
  })

  it.skip('works with large files', async () => {
    const ast1 = await reparseFile(join(fixtures, 'large.js'))
    const ast2 = await reparseFile(join(fixtures, 'large.js'))

    assert.equal(ast1.span.start, ast2.span.start)
    assert.equal(ast1.span.end, ast2.span.end)
  })
})
