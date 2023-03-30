const req = require('express/lib/request');
const formationModel = require('../../models/formations/formation.model')

// ***************** function add formation *****************
module.exports.add = (req) => {  
    return new Promise((resolve, reject) => {
        console.log('add formation ==> ')
        let body = req.body ;
        if(body){
            formationDB = new formationModel(body);
            formationDB.image = req.file ? req.file.path : '';
            // formationDB.save((err,data)=>{
            //     if(!err){
            //         resolve({
            //             response: true,
            //             token: null,
            //             message: 'Formation added successfully',
            //             data: data
            //         });
            //     }else{
            //         resolve({
            //             response: false,
            //             token: null,
            //             message: 'You have missed data',
            //             data: err
            //         });
            //     }
            // })
        }else{
            reject();
        }
    });
} 

// ***************** function update formation *****************
module.exports.update = (req) => {
    return new Promise((resolve, reject) => {
        let body = req.body;
        if(body){
            formationModel.findOneAndUpdate({_id:req.params.id}, body)
            .then((res) =>{
                resolve({
                    response: true,
                    message: 'Formation modified successfully',
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

// ***************** function delete formation *****************
module.exports.delete = (req) => {
    return new Promise((resolve,reject) => {

        formationModel.findOneAndDelete({_id:req.params.id}, function (err, data) {
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
                    message: data != null ? 'Deleted formation' : 'formation doesnt exist',
                    data: data
                });
            }
        });
    })
} 

// ***************** Function get   by id  *****************
module.exports.get = (id) => {
    return new Promise((resolve,reject) => {
        formationModel.findOne({_id:id}).then((formation)=>{
            condition = false;
            if(formation)
                condition = true;
            resolve({
                response: condition,
                message: condition ? 'Get data successfully' : 'No data',
                data: formation
            });
            if(condition)  {
                formation.forEach((e,index) => {
                        e.image ="http://localhost:3000/"+e.image;
                        
                        if(formation.length == index+1){
                            resolve({
                                response: condition,
                                message: condition ? 'Get data successfully' : 'No data',
                                data: formation
                            })
    
                        }
                  });
    
            }
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
        let formations = await formationModel.find({});
        let condition = formations.length > 0;
        if(condition)  {
            formations.forEach((e,index) => {
                    e.image ="http://localhost:3000/"+e.image;
                    
                    if(formations.length == index+1){
                        resolve({
                            response: condition,
                            message: condition ? 'Get data successfully' : 'No data',
                            data: formations 
                        })

                    }
              });

        }
        resolve({
            response: condition,
            message: condition ? 'Get data successfully' : 'No data',
            data: formations

        })
    });
}



