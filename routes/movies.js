const express = require('express');
const router = express.Router();

const Movie = require('../models/movie');
const Director = require('../models/director');

// Get All Movies
router.get('/', async (req,res) => {
    let query = Movie.find();
    if(req.query.title != null && req.query.title != ''){
        query = query.regex('title', new RegExp(req.query.title, 'i'));
    }
    if(req.query.releasedBefore != null && req.query.releasedBefore != ''){
        query = query.lte('releaseDate', req.query.releasedBefore);
    }
    if(req.query.releasedAfter != null && req.query.releasedAfter != ''){
        query = query.gte('releaseDate', req.query.releasedAfter);
    }
    try {
        const movies = await query.exec();
        res.render('movies/index',{
            movies: movies,
            searchOptions: req.query
        })
    } catch (error) {
        res.redirect('/');
    }
});

// Get Movies form
router.get('/new',async (req,res)=>{
    renderNewPage(res,new Movie());
});

// Create Movies
router.post('/', async (req,res)=>{
    const movie = new Movie({
        title: req.body.title,
        director: req.body.director,
        releaseDate: new Date(req.body.releaseDate),
        duration: req.body.duration,
        description: req.body.description,
    });
    savePoster(movie,req.body.poster);

    try {
        const newMovie = await movie.save();
        //res.redirect(`movies/${newMovie.id}`);
        res.redirect('movies');
    } catch {
        renderNewPage(res,movie,true);
    }
});

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

const savePoster = (movie, poster) => {
    const imageTypes = ['image/jpeg','image/png','image/gif'];
    if(poster==null) return;
    const posterObject = JSON.parse(poster);
    if(posterObject != null && imageTypes.includes(posterObject.type)){
        //all good
        movie.posterImage = new Buffer.from(posterObject.data,'base64');
        movie.posterImageType = posterObject.type;
    }
}

module.exports = router;