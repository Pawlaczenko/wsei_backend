const express = require('express');
const router = express.Router();

const {
    getAllMovies,
    createMovie,
    getOneMovie,
    editMovie,
    deleteMovie,
} = require('../controllers/movieController');

router.route('/')
    .get(getAllMovies)
    .post(createMovie);

router.route('/:id')
    .get(getOneMovie)
    .put(editMovie)
    .delete(deleteMovie);


module.exports = router;