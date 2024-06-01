import { readFile, writeFile } from 'node:fs/promises'
import { resolve, join } from 'node:path'

const dist = resolve(import.meta.dirname, 'dist')
const reparseCjs = join(dist, 'cjs', 'reparse.cjs')
const cjs = (await readFile(reparseCjs)).toString()

await writeFile(reparseCjs, cjs.replace(/child\.js/, 'child.cjs').replace(/childSync\.js/, 'childSync.cjs'))
