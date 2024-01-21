function formatFullResults (bookInfo, currencyInfo) {
  if (!currencyInfo) {
    return {
      ...bookInfo,
      fromNBP: {
        rate: 'no data',
        pricePLN: 'no data',
        tableNo: 'no data'
      }
    }
  }
  return {
    ...bookInfo,
    fromNBP: {
      rate: currencyInfo.rates[0].ask,
      pricePLN: currencyInfo.rates[0].ask * bookInfo.price,
      tableNo: currencyInfo.rates[0].no
    }
  }
}

module.exports = {
  formatFullResults
}
