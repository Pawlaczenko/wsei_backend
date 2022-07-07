const express = require('express');
const router = express.Router();
const {
    getAllActors,
    createActor,
    getOneActor,
    editActor,
    deleteActor
} = require('../controllers/actorController');
const {protect, restrict} = require('../controllers/authController');

router.route('/').get(getAllActors).post(protect,restrict('admin'), createActor);

router.route('/:id')
    .get(getOneActor)
    .put(protect,restrict('admin'),editActor)
    .delete(protect,restrict('admin'),deleteActor);

module.exports = router;