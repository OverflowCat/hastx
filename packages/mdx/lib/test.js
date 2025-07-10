import { NodeCompiler } from "@overflowcat/typst-ts-node-compiler"
import { createProcessor } from "./core.js"
import { VFile } from "vfile"
const _typst = NodeCompiler.create({})
const $typst = () => _typst

export async function test(text = `
  == Hello

  #html.elem("script", attrs: ("data-jsx": "import Button from 'Button.jsx;'"))
`) {
  const pipeline = createProcessor({
    jsxImportSource: 'astro',
  }, $typst)
  const vfile = new VFile({ value: text })
  const result = await pipeline.process(vfile)
  console.log(result.value)
}

test()
