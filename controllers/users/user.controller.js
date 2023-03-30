const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt'); 
const querystring = require('querystring');

const userModel = require('../../models/users/user.model');
const passwordModel = require('../../models/users/password.model');
const req = require('express/lib/request');
const moment = require("moment");
const { email } = require('../../config/email');
const { randomInt } = require('crypto');


// ***************** function add user *****************
module.exports.add = (req) => {  
    return new Promise((resolve, reject) => {
        let user = req.body ;
        if(user){
            userModel.findOne({email:user.email}).then(async (data)=>{
                if(data){
                    resolve({
                        response: false,
                        token: null,
                        message: 'User exist',
                        data: data
                    });
                }else{
                    userDB = new userModel({
                        nom: user.nom,
                        prenom: user.prenom,
                        telephone:  user.telephone,
                        email:  user.email,
                        date_de_naissance:  user.date_de_naissance,
                        image:  req.file ? req.file.path : '',
                        role:  user.role,
                    });
                    if(user.password)
                        await userDB.setPassword(user.password);
                    userDB.save((err,data)=>{
                        if(!err){
                            resolve({
                                response: true,
                                token: null,
                                message: 'User added successfully',
                                data: data
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
                }
            });
        }else{
            reject();
        }
    });
} 

// ***************** function update user *****************
module.exports.update = (req) => {
    return new Promise(async (resolve, reject) => {
        let obj = req.body;
        if(obj){
            obj.image = req.file && req.file.path;
            if(obj.password){
                let userDB = new userModel();
                await userDB.setPassword(obj.password);
                obj.password = userDB.password;
            }

            userModel.findOneAndUpdate({_id:req.params.id}, obj)
            .then((res) =>{
                resolve({
                    response: true,
                    message: 'User modify successfully',
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

// ***************** function delete user *****************
module.exports.delete = (req) => {
    return new Promise((resolve,reject) => {
        console.log('delete ==> ',req.user)

        userModel.findOneAndDelete({_id:req.params.id}, function (err, data) {
            if (err){
                reject({
                    response: false,
                    message: 'error',
                    data: err
                });
            }else{
                resolve({
                    response: data != null ,
                    message: data != null ? 'Deleted User' : 'User doesnt exist',
                    data: data
                });
            }
        });
    })
} 

// ***************** Function get user by id  *****************
module.exports.getUser = (id) => {
    return new Promise((resolve,reject) => {
        userModel.findOne({_id:id}).then(async (user)=>{
            console.log('=======>  ',user)
            condition = false;
            if(user)
                condition = true;
                user.new_date = await moment(user.date_de_naissance).format('YYYY-MM-DD');
                console.log('user ==> ', user)
            resolve({
                response: condition,
                message: condition ? 'Get data successfully' : 'No data',
                data: user
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

// ***************** function get list users *****************
module.exports.getListUsers = (req) => {  
    return new Promise(async (resolve, reject) => {

        obj = req.body ;
        var fullUrl = req.protocol + '://' + req.get('host') ;

        // let query = req.params.marque != 'null' ? { id_marque:  req.params.marque } : null;
        userModel.paginate({}, {page: parseInt(req.params.page), limit: parseInt(req.params.limit) }, function(err, users) {
            
            condition = users.total > 0 ;
            
            if(condition){
                users.docs.forEach((item,index)=>{
                    // item.photo_de_profile.path = fullUrl+'/'+item.photo_de_profile.path
                    if(index+1 == users.docs.length){
                        resolve({
                            response: condition,
                            message: condition ? "get data successfully" : "No data",
                            data: condition ? users : []
                        });
                    }
                })
            }
            else
            {
                resolve({
                    response: condition,
                    message: "No data ",
                    data: []
                });
            }
            // resolve({
            //     response: condition,
            //     message: condition ? "get data successfully" : "No data",
            //     data: condition ? partenaires : []
            // });
        })


        
        // userModel.paginate({}, {page: parseInt(req.params.page), limit: parseInt(req.params.limit) }, function(err, data) {

        //     condition = data.total > 0
        //     resolve({
        //         response: condition,
        //         message: condition ? 'Get data successfully' : 'No data',
        //         data: data
        //     });
        // })



    });
} 

// ***************** function auth user *****************
module.exports.auth = (user) => {
    return new Promise((resolve, reject) => {
        if(user){
            userModel.findOne({email:user.email}).then(async (userData)=>{
                if(userData){
                    valid = await userData.validPassword(user.password);
                    token = valid == true ? await generateAccessToken(userData) : '' ;
                    resolve({
                        response: valid,
                        token: token,
                        message: valid ? 'User connected' : 'Verify your password',
                        data: valid ? userData : {}
                    });
                }else{
                    resolve({
                        response: false,
                        token: '',
                        message: "User dosen't exist",
                        data: {}
                    });
                }
            });
        }else{
            reject();
        }
    });
} 

// ***************** function fortgetPasword *****************
module.exports.fortgetPasword = (req) => {  
    return new Promise((resolve, reject) => {
        let user = req.body ;
        if(user){
            userModel.findOne({email:user.email}).then(async (data)=>{
                if(!data){
                    resolve({
                        response: false,
                        token: null,
                        message: 'User dosent exist',
                        data: data
                    });
                }else{
                    
         
                    async  function checkCode() {
                        let code = codeValidation();
                        let findCode = await passwordModel.findOne({code: code});
                        if(findCode){
                            checkCode();
                        }else{
                            passDB = new passwordModel({
                                email:user.email,
                                code:code,
                            });
                            passDB.save((err,data)=>{
                                if(err){
                                    reject(err);
                                }
                            })
                            return code;
                        }
                    }

                    let codeV = await checkCode();

                    let  objEmail = {
                        from: 'velo@contact.tn',
                        to: user.email,
                        subject: "Subject",
                        html: "<h1>Hello Test send Email for password:"+codeV+"</h1>"
                    }

                    email.sendMail(objEmail, function(err, info) {
                        if (err) {
                        console.log(err)
                        } else {
                        console.log(info);
                        }
                    });


                    resolve({
                        response: true,
                        token: null,
                        message: 'Send email to user',
                        data: codeV
                    });
                }
            });
        }else{
            reject();
        }
    });
} 

// ***************** function sendNewPasword *****************
module.exports.sendNewPasword = (req) => {  
    return new Promise((resolve, reject) => {
        let user = req.body ;
        if(user){
            userModel.findOne({email:user.email}).then(async (data)=>{
                if(!data){
                    resolve({
                        response: false,
                        token: null,
                        message: 'User dosent exist',
                        data: data
                    });
                }else{
                    
                    if(user.password){
                        let userDB = new userModel();
                        await userDB.setPassword(user.password);
                        user.password = userDB.password;
                    }
                    console.log('user.password ==> ',user.password)
                    userModel.findOneAndUpdate({email:user.email}, user)
                    .then((res) =>{
                        resolve({
                            response: true,
                            message: 'Password modify successfully',
                            data: res
                        });
                    }).catch(err =>{
                        reject(err)
                    });

                }
            });
        }else{
            reject();
        }
    });
} 

// ***************** function fortgetPasword *****************
module.exports.verifierCode = (req) => {  
    return new Promise((resolve, reject) => {
        let user = req.body ;
        if(user){
            passwordModel.findOne(
                // {email:user.email}
                 {$and: [{email:user.email},{code: user.code}]}
                ).then(async (data)=>{
                if(!data){
                    resolve({
                        response: false,
                        token: null,
                        message: 'Code dosent exist',
                        data: data
                    });
                }else{
                    
                    resolve({
                        response: true,
                        token: null,
                        message: 'Code valid',
                        data: data
                    });
                }
            });
        }else{
            reject();
        }
    });
} 

// ***************** function auth user *****************
module.exports.getUrl = () => {
    return getGoogleAuthUrl();
} 

// ***************** function getGoogleAuthUrl *****************
function getGoogleAuthUrl(){
const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
const options= {
    // redirect_uri: `${SERVER_ROOT_URI}/${redirectURI}`,
    redirect_uri: "http://localhost:4000/http://localhost:3000",
    client_id: process.env.GOOGLE_CLIENT_ID ,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    // client_id: "offline" ,
    // response_type: "code" ,
    // prompt: "consent" ,
    // scope:[
    //     'https://www.googleapis.com/auth/userinfo.profile',
    //     'https://www.googleapis.com/auth/userinfo.email'
    //   ]
};
return `${rootUrl}?${querystring.stringify(options)}`;
}

// ***************** function generate token user *****************
function generateAccessToken(user){
    return(
            jwt.sign({
            id: user.id,
            role:user.role,
        }, process.env.TOKEN_SECRET, { expiresIn: '30d' })
    ) 
}




function codeValidation() {
    return randomInt(999,9999);
}

