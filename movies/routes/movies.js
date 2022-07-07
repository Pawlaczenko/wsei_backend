const express = require('express');
const router = express.Router();
const {protect} = require('../controllers/authController');

const {
    getAllMovies,
    createMovie,
    getOneMovie,
    editMovie,
    deleteMovie
} = require('../controllers/movieController');

router.route('/')
    .get(getAllMovies)
    .post(protect,createMovie);

router.route('/:id')
    .get(getOneMovie)
    .put(protect,editMovie)
    .delete(protect,deleteMovie);

module.exports = router;