const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const path = require('path')
const flash = require('connect-flash')
const moment = require('moment')
const timeAgo = require('javascript-time-ago')
const en = require('javascript-time-ago/locale/en')
timeAgo.locale(en)

require('./passport')

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'phoenix',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
app.use('/static', express.static(__dirname + '/../public'))

app.locals.moment = moment
app.locals.timeAgo = new timeAgo('vi')

app.locals.convertTime = convertTime

app.locals.diffTime = diffTime

app.locals.resultPips = resultPips

app.locals.resultProfits = resultProfits

app.use((req, res, next) => {
  global.req = req
  next()
})

// Middleware handler raw body
// app.use((req, res, next) => {
//   var data = ''
//   req.setEncoding('utf8')
//   req.on('data', chunk => {
//     data += chunk
//   })

//   req.on('end', () => {
//     req.body = data
//     next()
//   })
// })

app.use('/', require(path.join(__basepath, 'routes', 'web')))

app.use(function (req, res, next) {
  res.status(404).render('admin/error')
})
