// prelude content modified from original browser-pack prelude for readability + SES support
const fs = require('fs')
const preludeTemplate = fs.readFileSync(__dirname + '/preludeTemplate.js', 'utf8')
const sessDist = fs.readFileSync(__dirname + '/ses.js', 'utf8')

module.exports = generatePrelude

function generatePrelude(opts = {}) {
  const defaultEndowments = opts.defaultEndowments || `{
    window: {},
    console: {
      assert: console.assert.bind(console),
      debug: console.debug.bind(console),
      error: console.error.bind(console),
      info: console.info.bind(console),
      log: console.log.bind(console),
      warn: console.warn.bind(console),
    },
    setTimeout: window.setTimeout.bind(window),
    clearTimeout: window.clearTimeout.bind(window),
    atob: window.atob.bind(window),
  }`

  const endowmentsConfig = opts.endowmentsConfig || 'return {}'

  let output = preludeTemplate
  output = output.replace('__sessDist__', sessDist)
  output = output.replace('__defaultEndowments__', defaultEndowments)
  output = output.replace('__endowmentsConfig__', endowmentsConfig)

  return output
}
