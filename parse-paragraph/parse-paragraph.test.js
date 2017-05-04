/* eslint-env mocha */

const fs = require('fs')

const expect = require('expect')
const loadArray = (path) => {
  return fs.readFileSync(path, 'utf8')
           .split('\n')
           .filter(text => text.length > 0)
}

const en = {
  sample: fs.readFileSync('parse-paragraph/test-data.en/sample.en.txt', 'utf8'),
  sentences: loadArray('parse-paragraph/test-data.en/sentences.en.txt'),
  parentheses: loadArray('parse-paragraph/test-data.en/parentheses.en.txt'),
  quotes: loadArray('parse-paragraph/test-data.en/quotes.en.txt')
}
const es = {
  sample: fs.readFileSync('parse-paragraph/test-data.es/sample.es.txt', 'utf8'),
  sentences: loadArray('parse-paragraph/test-data.es/sentences.es.txt'),
  parentheses: loadArray('parse-paragraph/test-data.es/parentheses.es.txt'),
  quotes: loadArray('parse-paragraph/test-data.es/quotes.es.txt')
}

const {parse} = require('./parse-paragraph.js')
const splitBy = require('./split-by.js')

describe('splitBy for en', function () {
  const paragraph = en.sample.split('\n')[5]

  it('should match parenthetical statements', function () {
    expect(en.parentheses[0]).toMatch(splitBy.parens)
    expect(en.sentences[6]).toNotMatch(splitBy.parens)

    let split = paragraph.split(splitBy.parens).map(s => s.trim())
    expect(split.length).toBe(7)
    expect(split).toInclude(en.parentheses[0])
  })

  it('should match sentences', function () {
    expect(en.sample).toMatch(splitBy.sentence)
    expect('No periods here').toNotMatch(splitBy.sentence)

    let split = paragraph.split(splitBy.sentence).map(s => s.trim())
    expect(split.length).toBe(5)
  })

  it('should match multi-sentence quotations', function () {
    expect(en.quotes[0]).toMatch(splitBy.quote)
    expect(en.parentheses[0]).toNotMatch(splitBy.quote)

    let split = en.sample.split(splitBy.quote).map(s => s.trim())
    expect(split.length).toBe(3)
    expect(split).toInclude(en.quotes[0])
  })
})

describe('splitBy for es', function () {
  const paragraph = es.sample.split('\n')[5]

  it('should match paresthetical statements', function () {
    expect(es.parentheses[0]).toMatch(splitBy.parens)
    expect(es.sentences[6]).toNotMatch(splitBy.parens)

    let split = paragraph.split(splitBy.parens).map(s => s.trim())
    expect(split.length).toBe(7)
    expect(split).toInclude(es.parentheses[0])
  })

  it('should match sentences', function () {
    expect(es.sample).toMatch(splitBy.sentence)
    expect('No periods here').toNotMatch(splitBy.sentence)

    let split = paragraph.split(splitBy.sentence).map(s => s.trim())
    expect(split.length).toBe(5)
  })

  it('should match multi-sentence quotations', function () {
    let split = es.sample.split(splitBy.quote).map(s => s.trim())
    expect(split.length).toBe(3)
    expect(split).toInclude(es.quotes[0])

    expect(es.quotes[0]).toMatch(splitBy.quote)
    expect(es.parentheses[0]).toNotMatch(splitBy.quote)
  })
})

describe('parse(en)', function () {
  let result = parse(en.sample)

  it('should return an object', function () {
    expect(result).toContainKeys(['sentences', 'parentheses', 'quotes'])
  })

  it('should split sentences', function () {
    expect(result.sentences).toBeAn('array')
                            .toEqual(en.sentences)
  })

  it('should extract parenthetical statements', function () {
    expect(result.parentheses).toBeAn('array')
                              .toEqual(en.parentheses)
  })

  it('should extract quotes', function () {
    expect(result.quotes).toBeAn('array')
                         .toEqual(en.quotes)
  })
})

describe('parse(es)', function () {
  let result = parse(es.sample)

  it('should return an object', function () {
    expect(result).toContainKeys(['sentences', 'parentheses', 'quotes'])
  })

  it('should split sentences', function () {
    expect(result.sentences).toBeAn('array')
                            .toEqual(es.sentences)
  })

  it('should extract parenthetical statements', function () {
    expect(result.parentheses).toBeAn('array')
                              .toEqual(es.parentheses)
  })

  it('should extract quotes', function () {
    expect(result.quotes).toBeAn('array')
                         .toEqual(es.quotes)
  })
})
