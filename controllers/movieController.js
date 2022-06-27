const Movie = require('../models/movie');
const Director = require('../models/director');

exports.getAllMovies = async(req,res) => {
    try {
        const movies = await Movie.find();
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
    // const movie = Movie(req.body)
    try {
        const newMovie = await Movie.create(req.body);
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
        const movie = await Movie.findById(req.params.id)

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
        movie = await Movie.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true
        });

        if(!movie){
            res.status(404).json({
                status: 'fail',
                message: 'Movie with this Id doesn\'t exist'
            })
        }
        
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
    try {
        let movie = await Movie.findByIdAndDelete(req.params.id);
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