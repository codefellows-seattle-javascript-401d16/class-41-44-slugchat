'use strict'

import {Router} from 'express'
import User from '../model/user.js'
import bodyParser from 'body-parser'
import basicAuth from '../middleware/basic-auth.js'
import superagent from 'superagent'

export default new Router()
.post('/signup', bodyParser.json() , (req, res, next) => {
  new User.createFromSignup(req.body)
  .then(user => user.tokenCreate())
  .then(token => {
    res.cookie('X-Slugchat-Token', token)
    res.send(token)
  })
  .catch(next)
})
.get('/usernames/:username', (req, res, next) => {
  User.findOne({username: username})
  .then(user => {
    if(!user)
      return res.sendStatus(409)
    return res.sendStatus(200)
  })
  .catch(next)
})
.get('/usernames/:username', (req, res, next) => {
  User.findOne({username: req.params.username})
  .then(user => {
    if(!user)
      return res.sendStatus(200)
    return res.sendStatus(409)
  })
  .catch(next)
})

.get('/oauth/google/code', (req, res, next) => {
  if(req.query.error) {
    res.sendStatus(401);
  }
  console.log('Received callback from Google OAuth server');
  console.log('Req: ')
  console.log(req);
  superagent.post('https://www.googleapis.com/oauth2/v4/token')
    .type('form')
    .send({
      code: req.query.code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: 'http://localhost:3000/oauth/google/code',
    })
    .then(resp => {
      console.log(resp.body);
      res.redirect(process.env.CLIENT_URL);
    })
    .catch(next);
})
