const user_db = require("../repositories/user_repo");
const ticket = require("./ticket_services");

const express = require('express');
const users = express.Router();
const bodyParser = require('body-parser');
users.use(bodyParser.json());

users.login = (req, res) => {

    const body = req.body;
    console.log("Post login Entry: " + body);
    const username = body.username;
    const password = body.password;

    const accessToken = ticket.generateAccessToken(users);
    const refreshToken = ticket.generateRefreshToken();
    user_db.authenticate(username, password).then(user => {
        console.log("user_db.authenticate: " + user);
        ticket.generateRefreshToken();
        ticket.updateRefreshToken(username, refreshToken).then(() => {

            res.writeHead(200, { 'Content-Type': 'text/json' });
            const body = {
                "username": username,
                "email": user.email,
                "phone": user.phone,
                "address": user.address,
                "access_token": accessToken,
                "refresh_token": refreshToken
            };
            res.end(JSON.stringify(body));
        }).catch(err => {
            console.log(err);
            res.statusCode = 500;
            res.end('Server Error');
        });
    }).catch(() => {
        console.log("401 incorrect username/password ");
        res.writeHead(401, { 'Content-Type': 'text/json' });
        const body = { "username": username, "reason": "incorrect username/password" };
        res.end(JSON.stringify(body));
    });
}

users.register = (req, res) => {
    const body = req.body;
    console.log(body);
    var user = {
        username: body.username,
        password: body.password,
        fullname: body.fullname,
        email: body.email,
        address: body.address,
        phone: body.phone,
        role: body.role,
    }

    if (user.username.trim() != "" && user.password.trim()) {
        user_db.add_new(user).then(resolve => {

            res.writeHead(200, { 'Content-Type': 'text/json' });
            const body = { "username": user.username, "reason": resolve };
            res.end(JSON.stringify(body));
        }).catch(reject => {
            res.writeHead(400, { 'Content-Type': 'text/json' });
            const body = { "username": user.username, "reason": reject };
            res.end(JSON.stringify(body));
        })
    } else {
        res.writeHead(400, { 'Content-Type': 'text/json' });
        const body = { "username": user.username, "reason": "Invalid input" };
        res.end(JSON.stringify(body));
    }
}

users.edit = (req, res) => {
    const body = req.body;
    console.log("users.edit" + body);
    var user = {
        username: body.username,
        password: body.password,
        fullname: body.fullname,
        email: body.email,
        address: body.address,
        phone: body.phone,
        role: body.role,
    }
    user_db.edit(user).then(resolve => {

        res.writeHead(200, { 'Content-Type': 'text/json' });
        const body = { "username": user.username, "reason": resolve };
        res.end(JSON.stringify(body));
    }).catch(reject => {
        res.writeHead(400, { 'Content-Type': 'text/json' });
        const body = { "username": user.username, "reason": reject };
        res.end(JSON.stringify(body));
    })
}

module.exports = users;