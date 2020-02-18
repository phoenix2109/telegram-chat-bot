const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')
// const connection = require('../lib/connect');
passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  app.locals.user = user
  done(null, user)
})

passport.use('local-login', new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'pass'
  },
  function (username, pass, done) {
    db.getDB().collection(_config('database.collection.users')).findOne({ username: username }, (err, result) => {
      if (err) { return done(null, err) }

      if (!result) {
        return done(null, false, { message: 'Incorrect username or password. Please try again.' })
      }

      const memberPass = result.pass
      const match = bcrypt.compareSync(pass, memberPass)

      if (!match) {
        return done(null, false, { message: 'Incorrect password.' })
      }
      delete result.pass
      // delete result._id
      return done(null, result)
    })
  }
))
