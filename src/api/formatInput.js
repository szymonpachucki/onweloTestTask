function formatInput (input) {
  const result = []
  const lines = input.replace(/\n/g, '').split(',')

  for (let i = 0; i < lines.length; i += 2) {
    const author = lines[i].replace(/"/g, '').trim()
    const title = lines[i + 1].replace(/"/g, '').trim()

    if (author && title) {
      result.push({ author, title })
    }
  }

  return result
}

module.exports = {
  formatInput
}
