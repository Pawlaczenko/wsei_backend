const express = require('express');
const router = express.Router();
const Director = require('../models/director');

// Get All Directors
router.get('/', async (req,res) => {
    let searchOptions = {};
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name,'i');
    }
    try{
        const directors = await Director.find(searchOptions);
        res.render('directors/index', {
            searchOptions: req.query,
            directors: directors
        });
    } catch {
        res.redirect('/'); //TODO: change
    }
    res.render('directors/index');
});

// Get Director form
router.get('/new',(req,res)=>{
    res.render('directors/new', {
        director: new Director()
    });
});

// Create Director
router.post('/', async (req,res)=>{
    const director = new Director({
        name: req.body.name,
        surname: req.body.surname
    });

    try {
        const newDirector = await director.save();
        //res.redirect(`directors/${newDirector.id}`)
        res.redirect(`directors`);
    } catch {
        res.render('directors/new',{
            director: director,
            errorMessage: 'Error creating Director'
        });
    }
});

module.exports = router;