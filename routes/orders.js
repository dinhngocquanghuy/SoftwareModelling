var express = require('express');
var router = express.Router();
var order_services = require("../services/orders_service");

router.get('/', (req, res, next) => {
	res.render('orders', { title: 'Express' });
});

router.get("/show",(req,res)=>{
	console.log(req.body);
	var results = [];
	order_services.loadProductsList()
					.then(row => {
						console.log('lich su mua hang');
						for (var i = 0; i < row.length; i++) {
							var order = {
							'buyer_id':row[i].buyer_id,
							'seller_id':row[i].seller_id,
							'product_id':row[i].product_id,
							'status':row[i].status,
							'shipping_method':row[i].shipping_method
							}
							results.push(order);
						}
						res.render("products", {orders_list: results});
					});
});

module.exports = router;