const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt'); 
const mongoosePaginate = require('mongoose-paginate');

const userSchema = new Schema({
  nom:  { type: String, default: "" },
  prenom:  { type: String, default: "" },
  telephone:  { type: String, default: "" },
  date_de_naissance:  { type: Date, default: null },
  new_date:  { type: String, default: null },
  adresse:  { type: String, default: "" },
  email:  { type: String, default: "",lowercase: true },
  password:  { type: String, default: "" },
  image:  { type: String, default: "" },
  role:  { type: String, default: "" },
},{timestamps: true});


userSchema.plugin(mongoosePaginate);

// Method to set salt and hash the password for a user 
userSchema.methods.setPassword = async function(password) { 
  // hashing password user
    const salt = await bcrypt.genSalt();   
    this.password = await bcrypt.hash(password,salt);
    console.log('this.password ==> ',this.password);
}; 
   
 // Method to check the entered password is correct or not 
 userSchema.methods.validPassword = function(password) {
    return (bcrypt.compare(password,this.password)); 
 }; 

 userSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
 }

let User = mongoose.model('User',userSchema);

module.exports = User;
