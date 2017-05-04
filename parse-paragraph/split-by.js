const parens = /(\(.[^)]+?\))/
const sentence = /([.?!][\s\n])/
const quote = /(["“][^.;, ][^"”()\n]+?[.?!]\s[^"”()\n]+?["”]\.?)/

module.exports = {parens, sentence, quote}
