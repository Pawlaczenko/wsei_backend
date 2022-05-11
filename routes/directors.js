const express = require('express');
const router = express.Router();
const Director = require('../models/director');

// Get All Directors
router.get('/', (req,res) => {
    res.render('directors/index');
});

// Get Director form
router.get('/new',(req,res)=>{
    res.render('directors/new', {
        director: new Director()
    });
});

// Create Director
router.post('/',(req,res)=>{
    const director = new Director({
        name: req.body.name
    });
    director.save((err,newDirector)=>{
        if(err){
            res.render('directors/new',{
                director: director,
                errorMessage: 'Error creating Director'
            });
        } else {
            //res.redirect(`directors/${newDirector.id}`)
            res.redirect(`directors`);
        }
    });
});

module.exports = router;