const order_db = require("../repositories/order_repo");

const express = require('express');
const pro = express.Router();
const bodyParser = require('body-parser');
pro.use(bodyParser.json());

pro.loadOrdersList = () => {
	return product_db.loadOrdersList();
}

module.exports = pro;