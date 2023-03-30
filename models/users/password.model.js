const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt'); 

const passwordSchema = new Schema({
  email:  { type: String, default: "" },
  code:  { type: String, default: "" },
},{timestamps: true});




let Password = mongoose.model('Password',passwordSchema);

module.exports = Password;
