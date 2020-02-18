
require('./lib/helpers')

app.loadConfigs()
app.loadControllers()
app.loadModels()
app.loadMiddlewares()

// Views
app.set('views', _config('app.views'))
app.set('view engine', _config('app.view_engine'))

global.db = require('./lib/connect')
global._ObjectId = require('mongodb').ObjectId
