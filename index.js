const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session'); // Import express-session here
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User'); // must require before ./services/passport
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({ // Use session here
    secret: keys.cookieKey, // Use your secret key here
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 1000, // Set cookie maxAge
    },
  })
);

app.use(passport.initialize()); // these middleware run for every request
app.use(passport.session());

require('./routes/authRoutes')(app); // Routes from authRoutes, Directly required instead of named

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);