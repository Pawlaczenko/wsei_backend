const Movie = require('../models/movie');
const ErrorHandler = require('../utils/errorHandler');
const GlobalTryCatchAsync = require('../utils/globalTryCatchAsync');
const GlobalQuerying = require('../utils/globalQuerying');

exports.getAllMovies = GlobalTryCatchAsync(
    async(req,res, next) => {
        const queryObj = new GlobalQuerying(Movie.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const movies = await queryObj.query;

        res.status(200).json({
            movies: movies,
            results: movies.length,
            status: 'success'
        })
    }
);

exports.createMovie = GlobalTryCatchAsync(
    async (req,res, next)=>{
        const newMovie = await Movie.create(req.body);
        res.status(201).json({
            status: 'success',
            data: newMovie
        })
    }
);

exports.getOneMovie = GlobalTryCatchAsync(
    async(req,res, next)=>{
        const movie = await Movie.findById(req.params.id)
        if(!movie){
            const error = new ErrorHandler("Movie with given id doesn't exist.",404);
            return next(error);
        }
        res.status(200).json({
            status: 'success',
            data: movie
        });
    }
)

exports.editMovie = GlobalTryCatchAsync(
    async(req,res, next)=>{
        let movie = await Movie.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true
        });
        if(!movie){
            const error = new ErrorHandler("Movie with given id doesn't exist.",404);
            return next(error);
        }
        res.status(201).json({
            status: 'success',
            message: 'Movie edited',
            data: movie
        })
    }
);

exports.deleteMovie = GlobalTryCatchAsync(
    async (req, res, next)=>{
        let movie = await Movie.findByIdAndDelete(req.params.id);
        if(!movie){
            const error = new ErrorHandler("Movie with given id doesn't exist.",404);
            return next(error);
        }
        res.status(201).json({
            status: 'success',
            message: 'Movie deleted',
            data: null
        })
    }
);
