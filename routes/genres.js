const express = require('express');
const router = express.Router();
const {
    getAllGenres,
    createGenre,
    getOneGenre,
    editGenre,
    deleteGenre
} = require('../controllers/genreController');

router.route('/').get(getAllGenres).post(createGenre);

router.route('/:id')
    .get(getOneGenre)
    .put(editGenre)
    .delete(deleteGenre);

module.exports = router;