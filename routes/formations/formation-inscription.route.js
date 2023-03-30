var express = require('express');
var router = express.Router();


// Middleware
const authMiddle = require('../../middleware/auth.middleware');
const rolesMiddle = require('../../middleware/roles.middleware');
const {uploadUser} = require('../../middleware/upload.middleware');

const formationsController = require('../../controllers/formations/formationsinscription.controller');

router.use(express.json());
router.use(express.urlencoded({extended: false}));



// ***************** Api Register for insription *****************
router.post('/add',(req, res) => {
  formationsController.add(req).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.status(400).json(err);
  });
});

// ***************** Api update for insription *****************
router.put('/update/:id', (req, res) => {
  formationsController.update(req).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.status(400).json(err);
  });
});

// ***************** Api delete for insription *****************
router.delete('/delete/:id', (req, res) => {
  formationsController.delete(req).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.status(400).json(err);
  });
});


// ***************** Api get   by id  *****************
router.get('/get/:id', (req, res) => {
  formationsController.get(req.params.id).then((data) => {
    res.json(data);
  }).catch((err) => {
    res.status(400).json(err);
  });
});


// ***************** Api list inscription

router.get('/list', (req, res) => {
  formationsController.getList().then((data) => {
    res.json(data);
  }).catch((err) => {
    res.status(400).json(err);
  });
});

module.exports = router;


// ***************** Api list inscription

// router.get('/mail, (req, res) => {
//   formationsController.().the





























//((data) => {
//     res.json(data);
//   }).catch((err) => {
//     res.status(400).json(err);
//   });
// });
