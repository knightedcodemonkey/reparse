# [`@knighted/reparse`](https://www.npmjs.com/package/@knighted/reparse)

![CI](https://github.com/knightedcodemonkey/reparse/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/gh/knightedcodemonkey/reparse/graph/badge.svg?token=YCGi65lsmO)](https://codecov.io/gh/knightedcodemonkey/reparse)
[![NPM version](https://img.shields.io/npm/v/@knighted/reparse.svg)](https://www.npmjs.com/package/@knighted/reparse)

Multiple SWC parsings of the same file with correct spans.

Provides a workaround for [swc/1366](https://github.com/swc-project/swc/issues/1366).

## Requirements

- Node >= 20.11.0
- `@swc/core` >= 1.5.24 as peer dependency

## Example

There are four exports `reparse`, `reparseFile`, `reparseSync` and `reparseFileSync`.

```js
import { reparse } from '@knighted/reparse'
import assert from 'node:assert/strict'

const ast1 = await reparse('const foo = "bar"')
const ast2 = await reparse('const foo = "bar"')

assert.equal(ast1.span.start, ast2.span.start)
assert.equal(ast1.span.end, ast2.span.end)
```

Sync file example:

```js
import { reparseFileSync } from '@knighted/reparse'

const ast0 = reparseFileSync('./file.ts')
const ast1 = reparseFileSync('./file.ts')

console.log(ast0.span.start === ast1.span.start) // true
```
