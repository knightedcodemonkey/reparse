# [`@knighted/reparse`](https://www.npmjs.com/package/@knighted/reparse)

![CI](https://github.com/knightedcodemonkey/reparse/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/gh/knightedcodemonkey/reparse/graph/badge.svg?token=YCGi65lsmO)](https://codecov.io/gh/knightedcodemonkey/reparse)
[![NPM version](https://img.shields.io/npm/v/@knighted/reparse.svg)](https://www.npmjs.com/package/@knighted/reparse)

Multiple SWC parsings of the same file with correct spans.

Provides a workaround for [swc/1366](https://github.com/swc-project/swc/issues/1366).

## Requirements

- Node >= 20.11.0

## Example

```js
import assert from 'node:assert/strict'
import { reparse } from '@knighted/reparse'

const ast1 = await reparse('const foo = "bar"')
const ast2 = await reparse('const foo = "bar"')

assert.equal(ast1.span.start, ast2.span.start)
assert.equal(ast1.span.end, ast2.span.end)
```

You can also pass a file to `reparseFile`.

## Notes

This package makes use of [`child_process.fork()`](https://nodejs.org/api/child_process.html#child_processforkmodulepath-args-options) for each invokation of `reparse()`. Thus it makes use of a promise to resolve the response from the forked child process which does the parsing, so the functions provided from `@knighted/reparse` are both async.

If you are consuming this package from CommonJS you need to wrap calls to `reparse` and `reparseFile` in an `async` function since top level await is not available.

```js
const { reparse } = require('@knighted/reparse')
const doReparse = async () => {
  const ast = await reparse('const foo = "bar"')
}

doReparse()
```
