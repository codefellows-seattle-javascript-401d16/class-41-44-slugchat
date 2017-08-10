OAUTH CHATBOX
===

#### Features
#### backend
* App on the google dev console
* Oauth credentials to support a client app on `http://localhost:8080`
* Oauth credentials to support a server redirect uri  to `http://localhost:3000/oauth/google/code`
* Backend route `GET /oauth/google/code` for handling google oauth

#### frontend
* index.html with an anchor tag pointing to the google authoraztion page a query string will correct key value pairs

####  Documentation  

OAUTH2.0

OAuth is an open standard for access delegation. It servers as a way to give users the ability to grant apps access to services, without giving the apps their password.

With this app I set up a Google Cloud Application that serves as a chatbox. I implemented OATH on the servers side.

First the client needs to grant the application permission. To do this I gave an anchor tag that will take them to the services authorization page. The anchor tag passes the following information through a query string to the authorization server:
* grant_type=authorization_code
* code=<the code your recieved
* redirect_uri=REDIRECT_URI must be same as the redirect uri your client provied
* client_id=<your client id> tells the auth server which app is making the requests
* client_secret=<your client secret> authenticates that the app making the request is the app registered  with the client_id

Once I got an Access Toke I used it to make API calls to the service on behalf of that user.
