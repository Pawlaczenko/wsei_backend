const express = require('express');
const router = express.Router();
const {protect} = require('../controllers/authController');

const {
    getAllDirectors,
    createDirector,
    getOneDirector,
    editDirector,
    deleteDirector
} = require('../controllers/directorController');

router.route('/')
    .get(getAllDirectors)
    .post(protect,createDirector);

router.route('/:id')
    .get(getOneDirector)
    .put(protect,editDirector)
    .delete(protect,deleteDirector);

module.exports = router;