'use strict';
module.exports = function(app) {
    let purchaseCtrl = require('../controllers/PurchaseController');

    // Routes
    app.route('/purchase')
        .post(purchaseCtrl.store);

};