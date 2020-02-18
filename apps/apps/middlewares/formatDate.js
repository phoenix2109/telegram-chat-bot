
global.formatDate = d => {
  let res = ''
  res += d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()
  return res
}
