function formatResults (book) {
  return {
    name: book.artistName,
    title: book.trackName,
    curr: book.currency,
    price: book.price,
    date: book.releaseDate.slice(0, 10),
    img: book.artworkUrl100
  }
}

module.exports = {
  formatResults
}
