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
        res.redirect(`movies/${newMovie.id}`);
    } catch {
        renderNewPage(res,movie,true);
    }
});

router.get('/:id', async(req,res)=>{
    try {
        const movie = await Movie.findById(req.params.id).populate('director').exec();
        res.render('movies/show',{movie:movie});
    } catch {
        res.redirect('/');
    }
});


// Edit Movie
router.put('/:id', async (req,res)=>{
    let movie;

    try {
        movie = await Movie.findById(req.params.id);
        movie.title = req.body.title;
        movie.director = req.body.director;
        movie.releaseDate = new Date(req.body.releaseDate);
        movie.duration = req.body.duration;
        movie.description = req.body.description;
        if(req.body.poster != null && req.body.poster !== ''){
            savePoster(movie, req.body.poster);
        }
        await movie.save();
        res.redirect(`/movies/${movie.id}`);
    } catch(error) {
        console.log(error);
        if(movie != null){
            renderEditPage(res,movie,true);
        } else {
            res.redirect('/');
        }
            
    }
});

router.get('/:id/edit', async (req, res)=>{
    try {
        const movie = await Movie.findById(req.params.id);
        renderEditPage(res,movie);
    } catch {
        res.redirect('/');
    }
});

//Delete movie Page
router.delete('/:id', async (req, res)=>{
    let movie;
    try {
        movie = await Movie.findById(req.params.id);
        await movie.remove();
        res.redirect('/movies');
    } catch {
        if(movie != null){
            res.render('movies/show', {
                movie: movie,
                errorMessage: 'Could not remove movie'
            });
        } else {
            res.redirect('/');
        }
    }
});

const renderNewPage = async (res, movie, hasError = false ) => {
    renderFormPage(res,movie,'new',hasError);
}

const renderEditPage = async (res, movie, hasError = false ) => {
    renderFormPage(res,movie,'edit',hasError);
}

const renderFormPage = async (res, movie, form, hasError = false ) => {
    try {
        const directors = await Director.find({});
        const params = {
            directors: directors,
            movie: movie
        }
        if(hasError) params.errorMessage = 'Error Creating a Movie';
        res.render(`movies/${form}`,params);
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