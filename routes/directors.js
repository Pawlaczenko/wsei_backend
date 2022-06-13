const express = require('express');
const router = express.Router();
const Director = require('../models/director');

const {
    getAllDirectors,
    createDirector,
    getOneDirector,
    editDirector,
    deleteDirector
} = require('../controllers/directorController');


router.get('/new',(req,res)=>{
    res.render('directors/new', {
        director: new Director()
    });
});

router.route('/').get(getAllDirectors).post(createDirector);

router.route('/:id')
    .get(getOneDirector)
    .put(editDirector)
    .delete(deleteDirector);

router.get('/:id/edit', async (req,res)=>{
    try {
        const director = await Director.findById(req.params.id);
        res.render('directors/edit', {director: director });   
    } catch (error) {
        res.redirect('/directors'); //TODO: change the way errors are handled
    }
});

module.exports = router;