const { formatResults } = require('./formatResults')

function filterBooks (results, expectedAuthor, expectedTitle) {
  const filteredResults = results.results.filter(result => {
    return (result.trackCensoredName.toLowerCase() === expectedTitle.toLowerCase())
  })
  if (filteredResults.length > 0) {
    const formatedBook = formatResults(filteredResults[0])
    return formatedBook
  } else {
    return 'No results'
  }
}

module.exports = {
  filterBooks
}
