'use strict'
const fs = require('fs')
const { Writable } = require('stream')
const { join, resolve } = require('path')

const transformOutputFilename = v => v.replace(/\.dat$/, '.json')

function parseJson (filename, options) {
  const {
    minimize,
    output
  } = options

  let count = 0
  let errorCount = 0

  const stringify = minimize
    ? data => JSON.stringify(data)
    : data => require('json-stringify-pretty-compact')(data, { maxLength: 120 })

  const jsonWriteStream = new Writable({
    objectMode: true,
    write (row, encoding, callback) {
      const filename = row.value.filename

      if (!filename || typeof filename !== 'string') {
        console.error(`Invalid row(index=${row.key}): Property 'value.filename' must be a valid string.`)
        errorCount += 1
        return callback()
      }

      const outputFilename = transformOutputFilename(filename)

      fs.writeFileSync(
        join(output, outputFilename),
        stringify(row.value),
        { encoding }
      )

      console.log(`Saved ${outputFilename}`)
      count += 1
      callback()
    }
  })

  jsonWriteStream.on('finish', () => {
    console.log(`Done. Parsed ${count} ${count < 2 ? 'file' : 'files'} with ${errorCount} ${errorCount < 2 ? 'error' : 'errors'}.`)
  })

  fs.mkdirSync(output, { recursive: true })
  fs.createReadStream(filename)
    .pipe(require('stream-json/streamers/StreamArray').withParser())
    .pipe(jsonWriteStream)
}

module.exports = parseJson
