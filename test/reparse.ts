import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { resolve, join } from 'node:path'

import { reparse, reparseFile } from '../src/reparse.js'

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
})
