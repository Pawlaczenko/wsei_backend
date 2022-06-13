const express = require('express');
const router = express.Router();
const Actor = require('../models/actor');

const {
    getAllActors,
    createActor,
    getOneActor,
    editActor,
    deleteActor
} = require('../controllers/actorController');


router.get('/new',(req,res)=>{
    res.render('actors/new', {
        director: new Director()
    });
});

router.route('/').get(getAllActors).post(createActor);

router.route('/:id')
    .get(getOneActor)
    .put(editActor)
    .delete(deleteActor);

router.get('/:id/edit', async (req,res)=>{
    try {
        const actor = await Actor.findById(req.params.id);
        res.render('actors/edit', {actor: actor });   
    } catch (error) {
        res.redirect('/actors');
    }
});

module.exports = router;