const Movie = require('../models/movie');
const Director = require('../models/director');

exports.getAllMovies = async(req,res) => {
    let query = Movie.find();
    try {
        const movies = await query.populate('director').populate('genre').exec();
        res.status(200).json({
            movies: movies,
            results: movies.length,
            status: 'success'
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            messege: error
        })
    }
}

exports.createMovie = async (req,res)=>{
    const movie = new Movie({
        title: req.body.title,
        director: req.body.director,
        genre: req.body.genre,
        releaseDate: new Date(req.body.releaseDate),
        duration: req.body.duration,
        description: req.body.description,
    });

    try {
        const newMovie = await movie.save();
        res.status(201).json({
            status: 'success',
            data: newMovie
        })
    } catch(error) {
        res.status(404).json({
            status: 'fail',
            messege: error
        });
    }
}

exports.getOneMovie = async(req,res)=>{
    try {
        const movie = await Movie.findById(req.params.id).populate('director').populate('genre').exec();

        res.status(200).json({
            status: 'success',
            data: movie
        });
    } catch(err) {
        res.status(404).json({
            status: 'fail',
            messege: error
        });
    }
}

exports.editMovie = async(req,res)=>{
    let movie;

    try {
        movie = await Movie.findById(req.params.id);

        if(!movie){
            res.status(404).json({
                status: 'fail',
                message: 'Movie with this Id doesn\'t exist'
            })
        }

        movie.title = req.body.title;
        movie.director = req.body.director;
        movie.genre = req.body.genre;
        movie.releaseDate = new Date(req.body.releaseDate);
        movie.duration = req.body.duration;
        movie.description = req.body.description;
        
        await movie.save();
        res.status(201).json({
            status: 'success',
            message: 'Movie edited',
            data: movie
        })
    } catch(error) {
        res.status(404).json({
            status: 'fail',
            message: error.message,
        })
    }
}

exports.deleteMovie = async (req, res)=>{
    let movie;
    try {
        movie = await Movie.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: 'success',
            message: 'Movie deleted',
            data: null
        })
    } catch(error) {
        res.status(404).json({
            status: 'fail',
            message: error.message,
        })
    }
}

exports.getMoviesByDirector = async (directorId, limit = 5) => {
    return await Movie.find({director: directorId}).limit(limit).exec();
}