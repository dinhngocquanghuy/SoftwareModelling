var express = require('express');
var router = express.Router();
var product_services = require("../services/products_services");

router.get('/', function(res, req, next) => {
	res.render('products', { title: 'Express' });
});

router.get('/new_product', function(res, req, next) => {
	res.render('add_product', { title: 'Express' });
});

router.post("/api/new_product", (res, req) => {
	products_services.add(res, req);
});

router.post("/api/edit_product", (res, req) => {
	products_services.edit(res, req);
});

module.exports = router;