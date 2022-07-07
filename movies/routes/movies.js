const express = require('express');
const router = express.Router();
const {protect, restrict} = require('../controllers/authController');

const {
    getAllMovies,
    createMovie,
    getOneMovie,
    editMovie,
    deleteMovie
} = require('../controllers/movieController');

router.route('/')
    .get(getAllMovies)
    .post(protect,restrict('admin'),createMovie);

router.route('/:id')
    .get(getOneMovie)
    .put(protect,restrict('admin'),editMovie)
    .delete(protect,restrict('admin'),deleteMovie);

module.exports = router;