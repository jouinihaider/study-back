
const multer = require('multer');
const path  = require('path');
const moment = require("moment");
const fs = require('fs');
const userModel = require('../models/users/user.model');



//  ****************************************************************
//  ***************** User Verif and Upload image  *****************
//  ****************************************************************
verifUserExiste = (req) =>{
  return new Promise((resolve, reject) => {
    userModel.findOne({email:req.body.email}).then(async (data)=>{
      if(!data){
        resolve(true)
      }else{
        resolve(false)
      }
    });
  })
}

// Check image extension
fileFilter = async (req,file,cb)=>{
    let ext = path.extname(file.originalname);
    if(ext !== ".jpg" && ext !== ".jpeg"  && ext !=='.png'){
        cb(new Error("File type is not supported"),false);
        return ;
    }

    cb(null,await verifUserExiste(req))
};

// Set image storage path
storage = multer.diskStorage({
    destination: (req,file,cb)=>{
    let nameFolder = "/"+moment().format('MMMM')+moment().format('YYYY') ;
    let path = "public/images/users" ;

    if (!fs.existsSync(path)){
      fs.mkdirSync(path);
      if  (!fs.existsSync(path+nameFolder)){
        fs.mkdirSync(path+nameFolder);
      }
    }
    path = path+nameFolder ;

    cb(null,path);
    },
    filename: (req,file,cb)=>{
       cb(null,Date.now()+ path.extname(file.originalname));
    }
});

module.exports.uploadUser = multer({ storage: storage , fileFilter : fileFilter});


// ****************************************************************
//  ***************** formation  Verif and Upload image  *****************
//  ****************************************************************


// Set image storage path
storageFormation= multer.diskStorage({
  destination: (req,file,cb)=>{
  let nameFolder = "/"+moment().format('MMMM')+moment().format('YYYY') ;
  let path = "public/images/formations" ;

  if (!fs.existsSync(path)){
    fs.mkdirSync(path);
    if  (!fs.existsSync(path+nameFolder)){
      fs.mkdirSync(path+nameFolder);
    }
  }
  path = path+nameFolder ;

  cb(null,path);
  },
  filename: (req,file,cb)=>{
     cb(null,Date.now()+ path.extname(file.originalname));
  }
});

module.exports.uploadFormation = multer({ storage: storageFormation , fileFilter : fileFilter});









