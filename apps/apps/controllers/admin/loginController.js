const passport = require('passport')

module.exports = {
  index: (req, res) => {
    res.render('admin/login', { message: '' })
  },
  login: (req, res, next) => {
    passport.authenticate('local-login', async function (err, user, info) {
      // console.log(user)
      // console.log(info)
      // console.log(await db.getDB().collection(_config('database.collection.alert')).findOne({ 'users.username': user }))
      // console.log(await db.getDB().collection(_config('database.collection.alert')).findOne({ 'users.username': 'phoenix3010' }))
      const { redirect } = req.query

      if (err) {
        return next(err)
      }
      if (!user) {
        console.log(info)
        // return res.redirect(`/admin/login?redirect=${redirect ? redirect : ""}`,{ message: info.message });
        return res.render('admin/login', { message: info.message })
      }
      req.logIn(user, function (err) {
        if (err) { return next(err) }
        return redirect ? res.redirect(redirect) : res.redirect('/admin')
      })
    })(req, res, next)
  }
}
