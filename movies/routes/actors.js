const express = require('express');
const router = express.Router();
const {
    getAllActors,
    createActor,
    getOneActor,
    editActor,
    deleteActor
} = require('../controllers/actorController');
const {protect} = require('../controllers/authController');

router.route('/').get(getAllActors).post(protect, createActor);

router.route('/:id')
    .get(getOneActor)
    .put(protect,editActor)
    .delete(protect,deleteActor);

module.exports = router;