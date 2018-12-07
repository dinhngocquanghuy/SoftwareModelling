'use strict';

const util = require('util');
const mysql = require('mysql');
const db = require('../db');

module.exports = {
    store: (req, res) => {
        /* Data Format Example
            {
                "order": // Insert object "order" to table 'order'
                [
                    [
                        1, // id (order)
                        1  // buyer_id
                    ]
                ],
                "orderitem": // Insert object "orderitem" to table 'orderitem'
                [
                    // order_id, product_id, Quantity
                    [1, 1, 1],
                    [1, 2, 1]
                ]
            }
        */
        let data = req.body; // data: JSON
        console.log(data.order);
        console.log(data.orderitem);

        // First, insert new order
        let sql = 'INSERT INTO `order` (id, buyer_id) VALUES ?';
        db.query(sql, [data.order], (err, response) => {
            if (err) throw err;
            // Insert list of product
            let sql_second = 'INSERT INTO `orderitem` (order_id, product_id, Quantity) VALUES ?';
            db.query(sql_second, [data.orderitem], (err, response) =>
            {
                if (err) throw err;
                res.json({message: 'Cập nhật đơn hàng thành công!'})
            });
        });

    },
};