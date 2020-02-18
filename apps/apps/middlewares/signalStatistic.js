// const signalModel = require('../models/admin/signalModel')

global.resultPips = (name, entry, target) => {
  if (name.toUpperCase().includes('XAU')) {
    return Math.abs(Math.round((target - entry) * 10)).toFixed(2)
  } else if (name.toUpperCase().includes('JPY')) {
    return Math.abs(Math.round((target - entry) * 100)).toFixed(2)
  } else {
    return Math.abs(Math.round((target - entry) * 10000)).toFixed(2)
  }
}

global.resultProfits = (pips, lot) => (pips * lot * 10).toFixed(2)
