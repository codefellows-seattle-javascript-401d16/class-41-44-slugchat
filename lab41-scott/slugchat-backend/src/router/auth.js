'use strict'

import {Router} from 'express'
import User from '../model/user.js'
import bodyParser from 'body-parser'
import basicAuth from '../middleware/basic-auth.js'
import superagent from 'superagent';

export default new Router()
.get('/oauth/google/code', (req, res, next) => {
 console.log('received query', req.query);
//if no code is in the query, the user denied, redirect to home page for local sign up
  if(!req.query.code) res.redirect(process.env.CLIENT_URL);
//if there is a code then send that code back to google auth to get a tokenSeed
  return superagent.post('https://www.googleapis.com/oauth2/v4/token')
  .type('form')
  .send({
    code: req.query.code,
    grant_type: 'authorization_code',
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: `${process.env.API_URL}/oauth/google/code`,
  })
  .then(gAuthResponse => {
    console.log('token: ', gAuthResponse.body);
    //take the token and GET the user profile from open id connect
    return superagent.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect')
    .set('Authorization', `Bearer ${gAuthResponse.body.access_token}`)
  })
  .then(OIdCResponse => {
    //take the profile from the res body, send to handl O auth
    //checks if user exists, if not, it creates one with the model
    console.log('profile: ', OIdCResponse.body);
    return User.handleOAuth(OIdCResponse.body)
  })
  .then(user => {
    //create a new token from users signup/login success
    user.tokenCreate();
  })
  .then(token => {
    //set the token in the cookie
    res.cookie('X-Slugchat-Token', token);
    //redirect the user back to the our home page
    res.redirect(process.env.CLIENT_URL);
  })
  .catch((error) => {
    console.error(error);
    res.redirect(process.env.CLIENT_URL);
  })
})
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
.get('/login', basicAuth, (req, res, next) => {
  req.user.tokenCreate()
  .then((token) => {
    res.cookie('X-Slugchat-Token', token)
    res.send(token)
  })
  .catch(next)
})
