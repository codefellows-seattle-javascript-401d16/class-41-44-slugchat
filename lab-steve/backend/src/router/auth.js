'use strict';

import {Router} from 'express';
import User from '../model/user.js';
import bodyParser from 'body-parser';
import basicAuth from '../middleware/basic-auth.js';
import superagent from 'superagent';

export default new Router()

  .get('/oauth/google/code', (req, res, next) => {
    // console.log('req.query: ', req.query);
    if(!req.query.code) {
      res.redirect(process.env.CLIENT_URL);
    } else {
      superagent.post(process.env.OAUTH_API)
        .type('form')
        .send({
          code: req.query.code,
          grant_type: 'authorization_code',
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: `${process.env.API_URL}/oauth/google/code`,
        })
        .then(res => {
          console.log('Google token data: ', res.body);
          return superagent.get(process.env.GPLUS_API)
            .set('Authorization', `Bearer ${res.body.access_token}`);
        })
        .then(res => {
          console.log('Google profile: ', res.body);
          return User.handleOAUTH(res.body);
        })
        .then(user => user.tokenCreate())
        .then(token => {
          console.log('tokenCreate returns: ', token);
          res.cookie('X-Slugchat-Token', token);
          res.redirect(process.env.CLIENT_URL);
        })
        .catch((next) => {
          console.log(next);
          res.redirect(process.env.CLIENT_URL);
        });
    }
  })



  .post('/signup', bodyParser.json() , (req, res, next) => {
    new User.createFromSignup(req.body)
      .then(user => user.tokenCreate())
      .then(token => {
        res.cookie('X-Slugchat-Token', token);
        res.send(token);
      })
      .catch(next);
  })
  .get('/usernames/:username', (req, res, next) => {
    User.findOne({username: req.params.username})
      .then(user => {
        if(!user)
          return res.sendStatus(200);
        return res.sendStatus(409);
      })
      .catch(next);
  })
  .get('/login', basicAuth, (req, res, next) => {
    req.user.tokenCreate()
      .then((token) => {
        res.cookie('X-Slugchat-Token', token);
        res.send(token);
      })
      .catch(next);
  });
