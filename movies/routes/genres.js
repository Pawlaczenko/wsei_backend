const express = require('express');
const router = express.Router();
const {protect, restrict} = require('../controllers/authController');

const {
    getAllGenres,
    createGenre,
    getOneGenre,
    editGenre,
    deleteGenre
} = require('../controllers/genreController');

router.route('/').get(getAllGenres).post(protect,restrict('admin'),createGenre);

router.route('/:id')
    .get(getOneGenre)
    .put(protect,restrict('admin'),editGenre)
    .delete(protect,restrict('admin'),deleteGenre);

module.exports = router;