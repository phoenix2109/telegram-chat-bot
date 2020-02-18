
module.exports = async function category(req, res, next){
	global.cates = await _model('site.index.category')();
	next()
}

