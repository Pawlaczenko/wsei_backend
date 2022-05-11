const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');

// Get All Movies
router.get('/', async (req,res) => {
    res.send('All movies');
});

// Get Movies form
router.get('/new',(req,res)=>{
    res.send('New movies');
});

// Create Movies
router.post('/', async (req,res)=>{
    res.send('Create movies');
});

module.exports = router;