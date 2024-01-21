const http = require('https')

function fetchDataForDate (date) {
  return new Promise((resolve, reject) => {
    const apiUrl = `https://api.nbp.pl/api/exchangerates/rates/c/usd/${date}/?format=json`
    const options = {
      headers: {
        Accept: 'application/json'
      }
    }

    http.get(apiUrl, options, (response) => {
      let data = ''
      response.on('data', (chunk) => {
        data += chunk
      })
      response.on('end', () => {
        try {
          const jsonData = JSON.parse(data)
          resolve(jsonData)
        } catch (error) {
          resolve(null)
        }
      })
    }).on('error', () => {
      resolve(null)
    })
  })
}

module.exports = {
  fetchDataForDate
}
