const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const Movie = require('../models/movie');
const Director = require('../models/director');

const uploadPath = path.join('public', Movie.posterImageBasePath);
const imageMimeTypes = ['images/jpeg', 'images/png', 'images/gif'];
const upload = multer({
    dest: uploadPath,
    filterFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype));
    }
});

// Get All Movies
router.get('/', async (req,res) => {
    res.send('All movies');
});

// Get Movies form
router.get('/new',async (req,res)=>{
    renderNewPage(res,new Movie());
});

// Create Movies
router.post('/', upload.single('poster'), async (req,res)=>{
    const fileName = req.file != null ? req.file.filename : null;
    const movie = new Movie({
        title: req.body.title,
        director: req.body.director,
        releaseDate: new Date(req.body.releaseDate),
        duration: req.body.duration,
        description: req.body.description,
        posterImageName: fileName
    });

    try {
        const newMovie = await movie.save();
        //res.redirect(`movies/${newMovie.id}`);
        res.redirect('movies');
    } catch {
        if(movie.posterImageName != null) removeMoviePoster(movie.posterImageName);
        renderNewPage(res,movie,true);
    }
});

const removeMoviePoster = (filename) => {
    fs.unlink(path.join(uploadPath, fileName), error => {
        if(error) console.error(error);
    });
}

const renderNewPage = async (res, movie, hasError = false ) => {
    try {
        const directors = await Director.find({});
        const params = {
            directors: directors,
            movie: movie
        }
        if(hasError) params.errorMessage = 'Error Creating a Movie';
        res.render('movies/new',params);
    } catch {
        res.redirect('/movies');
    }
}

module.exports = router;