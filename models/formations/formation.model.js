const mongoose = require('mongoose');
const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate');

const FormationSchema = new Schema({
  TitreDeFormation:  { type: String, default: "" },
  NomFormateur:  { type: String, default: "" },
  Description:  { type: String, default: "" },
  NombreDeParticiants:  { type: Number, default: "" },
  DateDebut:  { type: Date, default: Date.now },
  DateFin:  { type: Date, default: Date.now },
  image:  { type: String, default: "" },
  
},{timestamps: true});


let Formation = mongoose.model('Formation',FormationSchema);

module.exports = Formation;
