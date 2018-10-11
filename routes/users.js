var express = require('express');
var router = express.Router();
var user_services = require("../services/user_services");
const verifyAccessToken = require('../services/ticket_services').verifyAccessToken;

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post("/login/", (req, res) => {
    user_services.login(req, res);
});

router.post("/register/", (req, res) => {
    user_services.register(req, res);
});

router.post('/edit', verifyAccessToken, (req, res) => {
    user_services.edit(req, res);
});



module.exports = router;