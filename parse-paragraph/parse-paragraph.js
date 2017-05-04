const flatten = require('array-flatten')
const {parens, sentence, quote} = require('./split-by')

let parse = (string) => {
  let splitByParens = string.split(parens)

  let parentheses = splitByParens.filter(s => parens.test(s))

  let noParens = splitByParens.filter(s => !/^\(/.test(s))
                              .join('')
                              .replace(/\s+?([,.;!?])/g, '$1')
                              .replace(/ +/g, ' ')


  let noQuotes = noParens.split(quote)
                         .filter(s => !quote.test(s))
                         .join('')

  let sentences = flatten(noQuotes.split(/\n+/)
                                  .map(p => {
                                    return p.split(sentence)
                                            .reduce((array, string) => {
                                              if (sentence.test(string)) {
                                                let pop = array.pop()
                                                string = pop + string
                                              }
                                              array.push(string.trim())
                                              return array
                                            }, [])
                                  })).filter(s => s.length > 0)

  let quotes = string.split(quote)
                     .filter(s => quote.test(s))

  return {sentences, parentheses, quotes}
}

module.exports = {parse}
