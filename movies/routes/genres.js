const express = require('express');
const router = express.Router();
const {protect} = require('../controllers/authController');

const {
    getAllGenres,
    createGenre,
    getOneGenre,
    editGenre,
    deleteGenre
} = require('../controllers/genreController');

router.route('/').get(getAllGenres).post(protect,createGenre);

router.route('/:id')
    .get(getOneGenre)
    .put(protect,editGenre)
    .delete(protect,deleteGenre);

module.exports = router;