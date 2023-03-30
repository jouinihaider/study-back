const req = require('express/lib/request');
// const nodemailer = require ("nodemailer");
const formationinscriptionModel = require('../../models/formations/formation-inscription.model')
const {email} = require('../../config/email')
// ***************** function add inscription *****************
module.exports.add = (req) => {  
    return new Promise((resolve, reject) => {
        
        let body = req.body ;
        // resolve(body)
        if(body){
            formationDB = new formationinscriptionModel(body);
            formationDB.save((err,data)=>{
                if(!err){
                    let  objEmail = {
                        from: 'velo@contact.tn',
                        to: body.Mail,
                        subject: "Confirmation Inscription",
                        html: " Inscription confirmée !!!"
                    }

                    email.sendMail(objEmail, (err, info)=> {
                        if (err) {
                        console.log(err)
                        } else {
                        console.log(info);
                        }
                    });


                    resolve({
                        response: true,
                        token: null,
                        message: 'Inscription added successfully',
                        data: data,
                       
                    });
                }else{
                    resolve({
                        response: false,
                        token: null,
                        message: 'You have missed data',
                        data: err
                    });
                }
            })
        }else{
            reject();
        }
    });
} 

// ***************** function update inscription *****************
module.exports.update = (req) => {
    return new Promise((resolve, reject) => {
        let body = req.body;
        if(body){
            formationinscriptionModel.findOneAndUpdate({_id:req.params.id}, body)
            .then((res) =>{
                resolve({
                    response: true,
                    message: 'Inscription modified successfully',
                    data: res
                });
            }).catch(err =>{
                reject(err)
            });
        }else{
            reject();
        }
    });
} 

// ***************** function delete inscriptionn *****************
module.exports.delete = (req) => {
    return new Promise((resolve,reject) => {

        formationinscriptionModel.findOneAndDelete({_id:req.params.id}, function (err, data) {
            if (err){
                reject({
                    response: false,
                    message: 'error',
                    data: err
                });
            }
            else{
                resolve({
                    response: data != null ,
                    message: data != null ? 'Deleted inscription' : 'inscription doesnt exist',
                    data: data
                });
            }
        });
    })
} 

// ***************** Function get   by id  *****************
module.exports.get = (id) => {
    return new Promise((resolve,reject) => {
        formationinscriptionModel.findOne({_id:id}).then((produit)=>{
            condition = false;
            if(produit)
                condition = true;
            resolve({
                response: condition,
                message: condition ? 'Get data successfully' : 'No data',
                data: produit
            });
        }).catch((err)=>{
            reject({
                response: false,
                message: 'No ID provided',
                data: err
            })
        })
    })
} 

// ***************** function list  *****************
module.exports.getList = (req) => {  
    return new Promise(async (resolve, reject) => {
        let produits = await formationinscriptionModel.find({});
        let condition = produits.length > 0;
        resolve({
            response: condition,
            message: condition ? 'Get data successfully' : 'No data',
            data: produits

        })
    });
}
// ***************** function mail  *****************

// let mailTransporter = nodemailer.createTransport({
//     Mail: req.body.mail,
//     Formation : new_inscription,
//     service: "gmail",
//     auth: {
//         user : "imen.zgolli@esprit.tn",
//         pass : "201SFT0734"
        
//     }
  
//   })
  
//   let details = {
//     from: "imen.zgolli@esprit.tn",
//     to: req.body.Mail,
//     subject: "confirmation inscription formation",
//     text: "votre inscription" +new_inscription.TitreDeFormation+ "est confirmé pour le : " +new_inscription.DateDebut+"\n"
  
//   }
  
//   mailTransporter.sendMail(details,(err)=>{
//     if (err){
//       console.log("it has an error",err)
//     }
//     else {
//       console.log("email was sent !")
//     }
//   })
   


