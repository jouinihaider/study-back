const req = require('express/lib/request');
const categorieFormationModel = require('../../models/formations/categorieFormation.model')

// ***************** function add Categorie *****************
module.exports.add = (req) => {  
    return new Promise((resolve, reject) => {
        
        let body = req.body ;
        if(body){
            categorieFormationDB = new categorieFormationModel(body);
            categorieFormationDB.save((err,data)=>{
                if(!err){
                    resolve({
                        response: true,
                        message: 'Categorie added successfully',
                        data: data
                    });
                }else{
                    resolve({
                        response: false,
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

// ***************** function update Categorie *****************
module.exports.update = (req) => {
    return new Promise((resolve, reject) => {
        let body = req.body;
        if(body){
            categorieFormationModel.findOneAndUpdate({_id:req.params.id}, body)
            .then((res) =>{
                resolve({
                    response: true,
                    message: 'Categorie modify successfully',
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

// ***************** function delete produit *****************
module.exports.delete = (req) => {
    return new Promise((resolve,reject) => {

        categorieFormationModel.findOneAndDelete({_id:req.params.id}, function (err, data) {
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
                    message: data != null ? 'Deleted Categorie' : 'Categorie doesnt exist',
                    data: data
                });
            }
        });
    })
} 

// ***************** Function get Categorie  by id  *****************
module.exports.get = (id) => {
    return new Promise((resolve,reject) => {
        categorieFormationModel.findOne({_id:id}).then((produit)=>{
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
module.exports.getList = () => {  
    return new Promise(async (resolve, reject) => {
        let produits = await categorieFormationModel.find({});
        let condition = produits.length > 0;
        resolve({
            response: condition,
            message: condition ? 'Get data successfully' : 'No data',
            data: produits
        })
    });
} 





