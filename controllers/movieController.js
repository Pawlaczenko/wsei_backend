const Movie = require('../models/movie');
const Director = require('../models/director');
const globalTryCatchAsync = require('../utils/globalTryCatchAsync');

exports.getAllMovies = globalTryCatchAsync(
    async(req,res, next) => {
        const movies = await Movie.find();
        res.status(200).json({
            movies: movies,
            results: movies.length,
            status: 'success'
        })
    }
);

exports.createMovie = globalTryCatchAsync(
    async (req,res, next)=>{
        const newMovie = await Movie.create(req.body);
        res.status(201).json({
            status: 'success',
            data: newMovie
        })
    }
);

exports.getOneMovie = globalTryCatchAsync(
    async(req,res, next)=>{
        const movie = await Movie.findById(req.params.id)

        res.status(200).json({
            status: 'success',
            data: movie
        });
    }
)

exports.editMovie = globalTryCatchAsync(
    async(req,res, next)=>{
        let movie = await Movie.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true
        });
        
        res.status(201).json({
            status: 'success',
            message: 'Movie edited',
            data: movie
        })
    }
);

exports.deleteMovie = globalTryCatchAsync(
    async (req, res, next)=>{
        let movie = await Movie.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: 'success',
            message: 'Movie deleted',
            data: null
        })
    }
);

exports.getMoviesByDirector = async (directorId, limit = 5) => {
    return await Movie.find({director: directorId}).limit(limit).exec();
}