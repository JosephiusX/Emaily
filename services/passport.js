const passport = require('passport'); // importing passport
const GoogleStrategy = require('passport-google-oauth20').Strategy; // importing passport strategy
const keys = require('../config/keys') // importing from keys.js

passport.use(// passport strategy  for google OAuth
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'// redirects user once authenticated
    },
    (accessToken, refreshToken, profile, done) => {// second argument to strategy
      console.log('access token', accessToken);// Passing in keys to passport instance
      console.log('refresh token', refreshToken);
      console.log('profile:', profile);
    }
  )
);