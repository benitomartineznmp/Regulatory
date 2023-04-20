const fs = require('fs')
const readline = require('readline')

const pattern = new RegExp(/\$+\{[a-zA-Z_0-9]+\}/gm)
const newFile = 'manifest.yml'
fs.open(newFile, 'w', () => {})
;(async () => {
  let text = ''
  const rl = readline.createInterface({
    input: fs.createReadStream('manifest.txt'),
    crlfDelay: Infinity
  })
  // eslint-disable-next-line no-restricted-syntax
  for await (const line of rl) {
    let newLine = ''
    if (line.length) {
      if (!pattern.test(line)) newLine = line
      else {
        const st = line.match(pattern)
        let word = st[0].replace('$', '')
        word = word.replace('{', '')
        word = word.replace('}', '')
        // eslint-disable-next-line prefer-destructuring
        const env = process.env[`${word}`]
        newLine = line.replace(st[0], env)
      }
    } else newLine = line
    text = text.concat(`${newLine} \n`)
  }
  fs.writeFileSync(newFile, text)
})()
