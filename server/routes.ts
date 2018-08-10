import * as express from 'express';

import CatCtrl from './controllers/cat';
import UserCtrl from './controllers/user';
import Cat from './models/cat';
import User from './models/user';
const nodemailer = require('nodemailer');

export default function setRoutes(app) {

  const router = express.Router();

  const catCtrl = new CatCtrl();
  const userCtrl = new UserCtrl();

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

  router.post('/form', (req, res) => {
    console.log(req.body);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
             user: 'sdmay10@gmail.com',
             pass: 'dali0328'
         }
     });
     const mailOptions = {
      from: req.body.email, // sender address
      to: 'sdmay10@gmail.com', // list of receivers
      subject: 'Inquiry from ' + req.body.name, // Subject line
      html: `Hello Terry, <br>
      You have a new message for more info!<br>
      <b>Name:</b> ${req.body.name}<br>
      <b>Email:</b> ${req.body.email}<br>
      <b>Trade:</b> ${req.body.q1}<br>
      <b>Owe Money:</b> ${req.body.q2}<br>
      <b>How Much Owed:</b> $${req.body.q3}<br>
      <b>Put Down:</b> $${req.body.q4}`// plain text body
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      }
      else {
        console.log(info);
        res.json({'success': 'ok'});
      }

   });
    });

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
