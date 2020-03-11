require('isomorphic-fetch')
const path = require('path')

exports.createPages = ({ actions }) => {
  return fetch('https://quote-garden.herokuapp.com/quotes/all').then(r => r.json()).then((response) => {
    const ITEMS_PER_PAGE = 24
    const QuotesTemplate = path.resolve('./src/templates/Quotes.js')
    const chunkedArr = []
    let quoteNumber = 0
    for (let i = 0, arrayLength = response.results.length; i < arrayLength; i += ITEMS_PER_PAGE) {
      chunkedArr.push(response.results.slice(i, i + ITEMS_PER_PAGE))
    }
    chunkedArr.forEach((quotes, index) => {
      actions.createPage({
        path: index === 0 ? '/' : `/quotes/${index + 1}`,
        component: QuotesTemplate,
        context: {
          currentPage: index + 1,
          data: quotes.map(quote => {
            quoteNumber++
            return {
              ...quote,
              quoteNumber
            }
          }),
          numberOfPages: Math.ceil(response.results.length / ITEMS_PER_PAGE)
        }
      })
    })

    response.results.forEach((quote, i) => {
      const QuoteTemplate = path.resolve('./src/templates/Quote.js')
      actions.createPage({
        path: `/quote/${i}`,
        component: QuoteTemplate,
        context: {
          data: quote
        }
      })
    })
  })
}
