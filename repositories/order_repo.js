const database = require("../database/mysql_db");

exports.loadOrdersList = () => {
	console.log("Load danh sach mua hang tu csdl");
	var sql = `select * from orders`;
	return database.query_db(sql);
}