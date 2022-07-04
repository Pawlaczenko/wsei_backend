const express = require('express');
const router = express.Router();

const {
    getAllDirectors,
    createDirector,
    getOneDirector,
    editDirector,
    deleteDirector
} = require('../controllers/directorController');

router.route('/')
    .get(getAllDirectors)
    .post(createDirector);

router.route('/:id')
    .get(getOneDirector)
    .put(editDirector)
    .delete(deleteDirector);

module.exports = router;