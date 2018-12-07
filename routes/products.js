var express = require('express');
var router = express.Router();
var product_services = require("../services/products_services");

router.get('/', function(req, res, next) {
	res.render('products', { title: 'Express' });
});

router.get('/new_product', function(req, res, next) {
	res.render('product_add', { title: 'Express' });
});

router.post("/api/new_product", (req, res) => {
	products_services.add(req, res);
});

router.post("/api/edit_product", (req, res) => {
	products_services.edit(req, res);
});

module.exports = router;