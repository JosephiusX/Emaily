const passport = require('passport'); // importing passport
const GoogleStrategy = require('passport-google-oauth20').Strategy; // importing passport strategy
const mongoose = require('mongoose');
const keys = require('../config/keys'); // importing from keys.js

const User = mongoose.model('users'); // pull users from mongoose

passport.serializeUser((user, done) => { // user mongoose model turned into an id
  done(null, user.id);
});

passport.deserializeUser((id, done) => { // id turned into a mongoose model instance
  User.findById(id)
    .then(user => {
      done(null, user);
    })
});

passport.use(// passport strategy  for google OAuth
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',// redirects user once authenticated
      proxy : true
    },
    (accessToken, refreshToken, profile, done) => {// second argument to strategy
      User.findOne({ googleId: profile.id}).then(existingUser => { // model instance representing found user
        if (existingUser) {
          // already have record with profile id
          done(null, existingUser);
        } else {
          // no user record with ID, make a new record
          new User({ googleId: profile.id }).save()// new instance of a user with save method added
            .then(user => done(null,user));
        }
      });
    }
  )
);