const express = require('express');
const router = express.Router();
const {
    getAllActors,
    createActor,
    getOneActor,
    editActor,
    deleteActor
} = require('../controllers/actorController');

router.route('/').get(getAllActors).post(createActor);

router.route('/:id')
    .get(getOneActor)
    .put(editActor)
    .delete(deleteActor);

module.exports = router;