//模拟数据
const express = require('express') ;
const app = express() ;

var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;
var apiRoutes = express.Router();
app.use('/api',apiRoutes) 
module.exports={
devServer:{
	//开始模拟数据
    before(app){
app.get('/api/seller', function (req, res) {
	res.json({
		code: 200,
		data: seller
	});
});
app.get('/api/goods', function (req, res) {
	res.json({
		code: 200,
		data: goods
	});
});
app.get('/api/ratings', function (req, res) {
	res.json({
		code: 200,
		data: ratings
	});
});
}
}
}
