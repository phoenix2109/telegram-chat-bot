
module.exports = (req, res, next) => {
  let data = ''
  req.setEncoding('utf8')
  req.on('data', chunk => {
    data += chunk
  })

  req.on('end', () => {
    req.body = data
    next()
  })
}
