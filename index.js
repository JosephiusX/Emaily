const express = require('express');
const passport = require('passport'); // importing passport
const GoogleStrategy = require('passport-google-oauth20').Strategy; // importing passport strategy

const app = express();

passport.use(new GoogleStrategy())// new instance of stratagey, input how it's used


const PORT = process.env.PORT || 5000
app.listen(PORT)