const express = require('express');
const passport = require('passport'); // importing passport
const GoogleStrategy = require('passport-google-oauth20').Strategy; // importing passport strategy
const keys = require('./config/keys') // importing from keys.js

const app = express();

// passport strategy for google OAuth
// redirects user once authenticated
// second argument to strategy(placeholder)
// Passing in keys to passport instance
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('access token', accessToken);
      console.log('refresh token', refreshToken);
      console.log('profile:', profile);
    }
  )
);

// when user visits this route
// Kick to OAuth flow. "google": internal identifyer of the strategy 
// User information from account granted access to when authorized
app.get(
  '/auth/google', 
  passport.authenticate('google', {
    scope: ['profile', 'email'] 
  })
);

app.get('/auth/google/callback', passport.authenticate('google')); // tates user to the user profile

const PORT = process.env.PORT || 5000
app.listen(PORT)