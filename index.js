const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User') // must require before ./services/passport
require('./services/passport');

mongoose.connect(keys.mongoURI)

const app = express();

require('./routes/authRoutes')(app); // Routes from authRoutes, Directly required instead of named

const PORT = process.env.PORT || 5000
app.listen(PORT)
