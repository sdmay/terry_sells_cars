"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cat_1 = require("./controllers/cat");
var user_1 = require("./controllers/user");
var newsletter_1 = require("./controllers/newsletter");
var nodemailer = require('nodemailer');
function setRoutes(app) {
    var router = express.Router();
    var catCtrl = new cat_1.default();
    var userCtrl = new user_1.default();
    var newsletterCtrl = new newsletter_1.default();
    // router.post('/nl', (req, res) => {
    //   console.log(req.body.email);
    //   const obj = new this.model(req.body);
    //   obj.save((err, item) => {
    //     // 11000 is the code for duplicate key error
    //     if (err && err.code === 11000) {
    //       res.sendStatus(400);
    //     }
    //     if (err) {
    //       return console.error(err);
    //     }
    //     res.status(200).json(item);
    //   });
    // });
    router.route('/nl').post(newsletterCtrl.insert);
    // Cats
    router.route('/cats').get(catCtrl.getAll);
    router.route('/cats/count').get(catCtrl.count);
    router.route('/cat').post(catCtrl.insert);
    router.route('/cat/:id').get(catCtrl.get);
    router.route('/cat/:id').put(catCtrl.update);
    router.route('/cat/:id').delete(catCtrl.delete);
    // Users
    router.route('/login').post(userCtrl.login);
    router.route('/users').get(userCtrl.getAll);
    router.route('/users/count').get(userCtrl.count);
    router.route('/user').post(userCtrl.insert);
    router.route('/user/:id').get(userCtrl.get);
    router.route('/user/:id').put(userCtrl.update);
    router.route('/user/:id').delete(userCtrl.delete);
    router.post('/form', function (req, res) {
        console.log(req.body);
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        var mailOptions = {
            from: req.body.email,
            to: 'sdmay10@gmail.com',
            subject: 'Inquiry from ' + req.body.name,
            html: "Hello Terry, <br>\n      You have a new message for more info!<br>\n      <b>Name:</b> " + req.body.name + "<br>\n      <b>Email:</b> " + req.body.email + "<br>\n      <b>Trade:</b> " + req.body.q1 + "<br>\n      <b>Owe Money:</b> " + req.body.q2 + "<br>\n      <b>How Much Owed:</b> $" + req.body.q3 + "<br>\n      <b>Put Down:</b> $" + req.body.q4 // plain text body
        };
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(info);
                res.json({ 'success': 'okey dokey' });
            }
        });
    });
    // Apply the routes to our application with the prefix /api
    app.use('/api', router);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map