const mongoose = require('mongoose');
const { Schema } = mongoose;

const FormationInscriptionSchema = new Schema({
    Nom:  { type: String, default: "" },
    Prenom:  { type: String, default: "" },
    Mail:  { type: String, default: "" },
    id_formation:  Schema.Types.ObjectId,
    inscriptions:  [],
    
},{timestamps: true});


let FormationInscription = mongoose.model('FormationInscription',FormationInscriptionSchema);

module.exports = FormationInscription;