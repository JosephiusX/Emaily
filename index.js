const express = require('express');
const passport = require('passport'); // importing passport
const GoogleStrategy = require('passport-google-oauth20').Strategy; // importing passport strategy
const keys = require('./config/keys') // importing from keys.js

const app = express();

passport.use(
  new GoogleStrategy({ // passport strategy for google OAuth
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSeceret,
    callbackURL: '/auth/google/callback', // redirects user once authenticated
}, 
accessToken => { // second argument to strategy(placeholder)
  console.log(accessToken)
}))// Passing in keys to passport instance 

app.get(
  '/auth/google', // when user visits this route
  passport.authenticate('google', { // Kick to OAuth flow. "google": internal identifyer of the strategy 
    scope: ['profile', 'email'] // User information from account granted access to when authorized
  })
);

app.get('/auth/google/callbackk', passport.authenticate('google')) // tates user to the user profile

const PORT = process.env.PORT || 5000
app.listen(PORT)