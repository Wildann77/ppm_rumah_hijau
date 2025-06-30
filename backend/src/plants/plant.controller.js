const cloudinary = require('../helper/cludinary-setup');
const Plant = require('./plant.model');
const { ImageUploadUtil } = require("../utils/uploadUtil");
const postAPlant = async (req, res) => {
  try {
    const newPlant = await Plant({ ...req.body });
    await newPlant.save();

    res.status(200).send({
      message: 'Plant posted successfully',
      plant: newPlant,
    });
  } catch (error) {
    console.error('Error creating plant:', error);
    res.status(500).send({ message: 'Failed to create plant' });
  }
};

const getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find().sort({
      createdAt: -1,
    });
    res.status(200).send(plants);
  } catch (error) {
    console.error('Error fetching plant:', error);
    res.status(500).send({ message: 'Failed to fetch plant' });
  }
};

const getSinglePlant = async (req, res) => {
  try {
    const { id } = req.params;
    const plant = await Plant.findById(id);

    if (!plant) {
      res.status(404).json({ message: 'Plant not found' });
    }

    res.status(200).json(plant);
  } catch (error) {
    console.error('Error fetching plant:', error);
    res.status(500).json({ message: 'Failed to fetch plant' });
  }
};

const UpdatePlant = async (req, res) => {
  try {
    const { id } = req.params;
    const updatePlant = await Plant.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatePlant) {
      res.status(404).json({ message: 'Plant is not found' });
    }
    res.status(200).send({
      message: 'update plant successfully',
      plant: updatePlant,
    });
  } catch (error) {
    console.error('Error updating a plant:', error);
    res.status(500).json({ message: 'Failed to update a plant' });
  }
};

const deleteAPlant = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPlant = await Plant.findByIdAndDelete(id);

    if (!deletedPlant) {
      return res.status(404).send({ message: 'Plant not found' });
    }

    res.status(200).send({
      message: 'delete plant successfully',
      plant: deletedPlant,
    });
  } catch (error) {
    console.error('Error deleting a plant:', error);
    res.status(500).json({ message: 'Failed to delete a plant' });
  }
};

// controllers/uploadController.js


const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    const result = await ImageUploadUtil(dataURI);

    res.json({
      success: true,
      url: result.secure_url,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({
      success: false,
      message: 'Image upload failed',
    });
  }
};

const searchPlants = async (req, res) => {
  try {
    const { keyword } = req.params;

    if (!keyword || typeof keyword !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Keyword is required and must be in string format',
      });
    }

    const regEx = new RegExp(keyword, 'i'); // case-insensitive regex

    const searchQuery = {
      $or: [
        { title: regEx },
        { description: regEx },
        { category: regEx },
      ],
    };

    const results = await Plant.find(searchQuery);

    res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

module.exports = {
  postAPlant,
  getAllPlants,
  getSinglePlant,
  UpdatePlant,
  deleteAPlant,
  handleImageUpload,
  searchPlants
};
