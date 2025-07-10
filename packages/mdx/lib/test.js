import {NodeCompiler} from '@overflowcat/typst-ts-node-compiler'
import {createProcessor} from './core.js'
import {VFile} from 'vfile'
const _typst = NodeCompiler.create({})
const $typst = () => _typst
const pipeline = createProcessor({jsxImportSource: 'astro'}, $typst)
export async function test(
  text = `
  == Hello

  #html.elem("script", attrs: ("data-jsx": "import Button from 'Button.jsx;'"))
`
) {
  const compiledDoc = $typst().tryHtml({
    mainFileContent: text
  })
  const hast = compiledDoc.result?.hast()
  pipeline.__setHast(hast)
  const vfile = new VFile({value: text})
  const result = await pipeline.process(vfile)
  console.log(result.value)
}

test()
