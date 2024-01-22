/* eslint-disable no-async-promise-executor */
/* eslint-disable no-unused-vars */
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

const { fetchBookInfo } = require('./bookInfo')
const { fetchDataForDate } = require('./currencyInfo')
const { filterBooks } = require('./filterResults')
const { formatFullResults } = require('./formatFullResults')
const { formatInput } = require('./formatInput')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, '../../', 'index.html')
  res.sendFile(indexPath)
})

app.post('/fetchBookInfo', async (req, res) => {
  try {
    const { input } = req.body
    console.log('\n \n \n  INPUT:', input)
    const formatedInput = formatInput(input)
    console.log('\n \n \n formated', formatedInput)

    const fullResultsArray = []

    for (const book of formatedInput) {
      const { author, title } = book
      console.log('\n \n \n book :', book)
      const country = 'US'
      const bookResult = await fetchBookInfo(author, title, country)
      if (!bookResult) {
        throw new Error('Book info not available.')
      }

      const filteredBooks = filterBooks(bookResult, author, title)
      console.log('\n \n \n book results:', filteredBooks)
      const dateToFetch = filteredBooks.date

      const currencyResult = await fetchDataForDate(dateToFetch)
      const fullResults = formatFullResults(filteredBooks, currencyResult)

      fullResultsArray.push(fullResults)
    }

    res.json(fullResultsArray)
  } catch (error) {
    console.error('Error fetching book info:', error.message)
    res.status(500).json({ success: false, error: error.message })
  }
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
