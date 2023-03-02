const mongoose = require('mongoose');
const { Schema } = mongoose; //const Schema = mongoose.Schema; // pull property from mongoose obj

const userSchema = new Schema({ // init. schema
  googleId: String
});

mongoose.model('users', userSchema) // create model class