
const path = require('path')
const walkSync = require('./walkSync')
const loadModule = require('./loadModule')
const loadGlobal = require('./loadGlobal')

app.loadConfigs = () => {
  const dir = path.join(__basepath, 'config')
  const data = walkSync(dir)
  global.__config = loadModule(dir, data)
}

app.loadControllers = () => {
  const dir = path.join(__basepath, 'apps', 'controllers')
  const data = walkSync(dir)
  global.__controller = loadModule(dir, data)
}

app.loadMiddlewares = () => {
  const dir = path.join(__basepath, 'apps', 'middlewares')
  const data = walkSync(dir)
  global.__middleware = loadModule(dir, data)
}

app.loadModels = () => {
  const dir = path.join(__basepath, 'apps', 'models')
  const data = walkSync(dir)
  global.__model = loadModule(dir, data)
}

global._config = (name) => {
  return loadGlobal(name, '__config')
}

global._controller = (name) => {
  return loadGlobal(name, '__controller')
}

global._middleware = (data) => {
  if (Array.isArray(data))
    return data.map(item => loadGlobal(item, '__middleware'))

  return loadGlobal(data, '__middleware')
}

global._model = (name) => {
  return loadGlobal(name, '__model')
}

global._url = (path) => {
  const base_url = req.protocol + '://' + req.get('host')
  if (path.startsWith('/'))
    return path ? base_url + path : base_url

  return path ? base_url + '/' + path : base_url
}
