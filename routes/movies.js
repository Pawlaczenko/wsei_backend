const express = require('express');
const router = express.Router();

const Movie = require('../models/movie');
const Director = require('../models/director');

const {
    getAllMovies,
    createMovie,
    getOneMovie,
    editMovie,
    deleteMovie,
    getNewMoviePage,
    getEditMoviePage
} = require('../controllers/movieController');

router.route('/')
    .get(getAllMovies)
    .post(createMovie);

router.route('/new')
    .get(getNewMoviePage);

router.route('/:id')
    .get(getOneMovie)
    .put(editMovie)
    .delete(deleteMovie);

router.route('/:id/edit')
    .get(getEditMoviePage);

module.exports = router;