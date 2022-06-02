const express = require('express');
const { redirect } = require('express/lib/response');
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
        res.redirect(`directors/${newDirector.id}`)
    } catch {
        res.render('directors/new',{
            director: director,
            errorMessage: 'Error creating Director'
        });
    }
});


router.get('/:id',(req,res)=>{
    res.send("Show Director "+req.params.id);
});

router.get('/:id/edit', async (req,res)=>{
    try {
        const director = await Director.findById(req.params.id);
        res.render('directors/edit', {director: director });   
    } catch (error) {
        res.redirect('/directors');
    }
});

router.put('/:id',async (req,res)=>{
    let director;
    try {
        director = await Director.findById(req.params.id);
        director.name = req.body.name;
        director.surname = req.body.surname;
        await director.save();
        res.redirect(`/directors/${director.id}`)
    } catch {
        if(director == null){
            res.redirect('/');
        } else {    
            res.render('directors/new',{
                director: director,
                errorMessage: 'Error updating Director'
            });
        }
    }
});

router.delete('/:id',async  (req,res)=>{
    let director;
    try {
        director = await Director.findById(req.params.id);
        await director.remove();
        res.redirect(`/directors`)
    } catch {
        if(director == null){
            res.redirect('/');
        } else {    
            res.redirect(`/directors/${director.id}`);
        }
    }
});

module.exports = router;