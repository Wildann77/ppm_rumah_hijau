const express = require('express');
const Plant = require('./plant.model');
const {
  postAPlant,
  getAllPlants,
  getSinglePlant,
  UpdatePlant,
  deleteAPlant,
  handleImageUpload,
  searchPlants,
} = require('./plant.controller');
const verifyAdmintoke = require('../middleware/verifyAdminToken');

const router = express.Router();
const { upload } = require('../utils/uploadUtil');
router.get('/search/:keyword', searchPlants);

// post a book
router.post('/create-plant', verifyAdmintoke, postAPlant);

// get all books
router.get('/', getAllPlants);


// single book endpoint
router.get('/:id', getSinglePlant);

//  update a book endpoint
router.put('/edit/:id', verifyAdmintoke, UpdatePlant);

router.delete('/:id', verifyAdmintoke, deleteAPlant);
// delete a book endpoint
router.post('/upload', upload.single('image'), handleImageUpload);


module.exports = router;
