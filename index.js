const express = require('express');
require('./services/passport');

const app = express();

require('./routes/authRoutes')(app); // Routes from authRoutes, Directly required instead of named

const PORT = process.env.PORT || 5000
app.listen(PORT)
