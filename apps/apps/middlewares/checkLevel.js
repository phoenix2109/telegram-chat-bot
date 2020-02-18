module.exports = (req, res, next) => {
  if (req.user.level > 3) {
    return res.redirect('/')
  }

  return next()
}
