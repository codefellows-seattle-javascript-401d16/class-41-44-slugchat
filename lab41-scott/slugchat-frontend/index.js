'use strict';
//from the docs where the user get's sent to
let AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
//our id that we registered our project with on the api
let clientIDQuery='client_id=296524529091-5dh76mjsqebiqcgu2b85cqqhvf8j3ld0.apps.googleusercontent.com';
//we want the code back from the google auth.
let responseTypeQuery='response_type=code';
//necessary scope for OPEN ID connect, check the docs
let scopeQuery='scope=openid%20profile%20email';
//prompt the user with the consent screen
let promptQuery='prompt=consent';
//redirect the response from the google. If no code, we'll send the user to sign up local
//if code, we'll ask google auth for the token with our google secret & code.
let redirectURIQuery = 'redirect_uri=http://localhost:3000/oauth/google/code';
//set all variables to the href url
let fullAuthURL  = `${AUTH_URL}?${clientIDQuery}&${responseTypeQuery}&${scopeQuery}&${promptQuery}&${redirectURIQuery}`;
//create anchor tag for user to click on that holds our long href path of variables
let a = document.getElementById('google-auth-anchor');
a.setAttribute('href', fullAuthURL);
// let anchor = document.body.appendChild(a);
