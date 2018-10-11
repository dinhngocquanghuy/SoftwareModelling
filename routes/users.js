var express = require('express');
var router = express.Router();
var user_services = require("../services/user_services");


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



module.exports = router;