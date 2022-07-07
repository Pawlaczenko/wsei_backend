const express = require('express');
const router = express.Router();
const {protect, restrict} = require('../controllers/authController');

const {
    getAllDirectors,
    createDirector,
    getOneDirector,
    editDirector,
    deleteDirector
} = require('../controllers/directorController');

router.route('/')
    .get(getAllDirectors)
    .post(protect,restrict('admin'),createDirector);

router.route('/:id')
    .get(getOneDirector)
    .put(protect,restrict('admin'),editDirector)
    .delete(protect,restrict('admin'),deleteDirector);

module.exports = router;