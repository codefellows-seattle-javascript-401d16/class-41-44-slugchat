# lab #41-44

We turn on OAuth in this assignment.

The user clicks the login with google link on localhost:8080. The user gets redirected to googles login oauth page to give consent or login with google. If consent is not given, we redirect back to our localhost:3000/oauth/google/code with an error. If consent is given we redirect back to localhost:3000/oauth/google/code and create a cookie. We are currently logging the info from google plus as well as the token etc.
