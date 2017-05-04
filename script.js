const fs = require('fs')

const en = fs.readFileSync('data.test/sample.en.txt', 'utf8').split('\n')
const es = fs.readFileSync('data.test/sample.es.txt', 'utf8')

const proSplit = require('pro-split.js')

let sentences = proSplit(es)