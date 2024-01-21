const http = require('http')

function formatSearch (text) {
  return text.replace(/ /g, '+').toLowerCase()
}

function fetchBookInfo (author, title, chosenCountry) {
  return new Promise((resolve, reject) => {
    const formatedName = formatSearch(author)
    const formatedTitle = formatSearch(title)
    const entity = 'ebook'
    const country = chosenCountry

    const apiUrl = `http://itunes.apple.com/search?term=${formatedName}&term=${formatedTitle}&entity=${entity}&country=${country}`
    http.get(apiUrl, (response) => {
      let data = ''
      response.on('data', (chunk) => {
        data += chunk
      })
      response.on('end', () => {
        try {
          const jsonData = JSON.parse(data)
          resolve(jsonData)
        } catch (error) {
          reject(error)
        }
      })
    }).on('error', (error) => {
      reject(error)
    })
  })
}

module.exports = {
  fetchBookInfo
}
