const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorieFormationSchema = new Schema({
  titre:  { type: String, default: "" },
  id_parent:  Schema.Types.ObjectId ,
},{timestamps: true});

let CategorieFormation = mongoose.model('CategorieFormation',CategorieFormationSchema);

module.exports = CategorieFormation;
