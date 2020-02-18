// const userModel = require('../../models/admin/user');

module.exports = {
  index: (req, res) => {
    console.log(req.user)
    res.render('admin/')
  },
  logOut: (req, res) => {
    req.logOut()
    req.session.destroy(() => {
      return res.redirect('/login')
    })
  }
}
