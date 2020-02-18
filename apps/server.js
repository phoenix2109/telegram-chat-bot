global.__basepath = process.cwd()

global.app = require('express')()

global._ = require('lodash')

require('./app')

// require('./bot')

require('./apps/kernel')

db.connect(err => {
  if (err) {
    console.log('Unable to connect to database')
    process.exit(1)
  } else {
    app.listen(process.env.PORT || _config('app.port'), () => {
      console.log(`Server listening to port ${_config('app.port')}`)
    })
  }
})
