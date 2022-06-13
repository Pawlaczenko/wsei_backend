const Movie = require('../models/movie');
const Director = require('../models/director');

exports.getAllMovies = async(req,res) => {
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
}

exports.createMovie = async (req,res)=>{
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
}

exports.getOneMovie = async(req,res)=>{
    try {
        const movie = await Movie.findById(req.params.id).populate('director').exec();
        res.render('movies/show',{movie:movie});
    } catch {
        res.redirect('/');
    }
}

exports.editMovie = async(req,res)=>{
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
}

exports.deleteMovie = async (req, res)=>{
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
}

exports.getEditMoviePage = async (req, res)=>{
    try {
        const movie = await Movie.findById(req.params.id);
        renderEditPage(res,movie);
    } catch {
        res.redirect('/');
    }
}

exports.getNewMoviePage = async (req,res)=>{
    await renderNewPage(res,new Movie());
};

exports.getMoviesByDirector = async (directorId, limit = 5) => {
    return await Movie.find({director: directorId}).limit(limit).exec();
}

renderNewPage = async (res, movie, hasError = false ) => {
    renderFormPage(res,movie,'new',hasError);
}

renderEditPage = async (res, movie, hasError = false ) => {
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
    } catch(err) {
        res.redirect('/movies');
    }
}

savePoster = (movie, poster) => {
    const imageTypes = ['image/jpeg','image/png','image/gif'];
    if(poster==null) return;
    const posterObject = JSON.parse(poster);
    if(posterObject != null && imageTypes.includes(posterObject.type)){
        movie.posterImage = new Buffer.from(posterObject.data,'base64');
        movie.posterImageType = posterObject.type;
    }
}