var express = require('express');
var router = express.Router();

// Middlewares 
const authMiddle = require('../../middleware/auth.middleware');
const rolesMiddle = require('../../middleware/roles.middleware');
const {uploadUser} = require('../../middleware/upload.middleware');

// Controllers
const userController = require('../../controllers/users/user.controller');

router.use(express.json());
router.use(express.urlencoded({extended: false}));



// ***************** Api verifierCode *****************
router.post('/verifierCode',(req, res) => {
  userController.verifierCode(req).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.status(400).json(err);
  });
});

// ***************** Api Register for user *****************
router.post('/sendNewPasword',(req, res) => {
  userController.sendNewPasword(req).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.status(400).json(err);
  });
});

// ***************** Api Register for user *****************
router.post('/fortgetPasword',(req, res) => {
  userController.fortgetPasword(req).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.status(400).json(err);
  });
});

// ***************** Api Register for user *****************
router.post('/add',uploadUser.single('image'),(req, res) => {
  userController.add(req).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.status(400).json(err);
  });
});

// ***************** Api update for user *****************
router.put('/update/:id',uploadUser.single('image'), (req, res) => {
  userController.update(req).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.status(400).json(err);
  });
});

// ***************** Api delete for user *****************
router.delete('/delete/:id', (req, res) => {
  userController.delete(req).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.status(400).json(err);
  });
});

// ***************** Api auth for user *****************
router.post('/auth', (req, res) => {
  userController.auth(req.body).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.status(400).json(err);
  });
});

// ***************** Api list users *****************
router.get('/list/:page?/:limit?', (req, res) => {
  // res.json('test test');

  userController.getListUsers(req).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.status(400).json(err);
  });
});

// ***************** Api get information user by id  *****************
router.get('/get/:id', (req, res) => {
  userController.getUser(req.params.id).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.status(400).json(err);
  });
});

// ***************** Api get information user by id  *****************
router.get('/getUrl', (req, res) => {
  // userController.getUrl().then((data) => {
  //   res.json(data);
  // }).catch((err) => {
  //   res.status(400).json(err);
  // });
  res.json(userController.getUrl());
});


module.exports = router;
