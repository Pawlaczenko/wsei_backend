const Genre = require('../models/genre');
const GlobalTryCatchAsync = require('../utils/globalTryCatchAsync');
const GlobalQuerying = require('../utils/globalQuerying');

exports.getAllGenres = GlobalTryCatchAsync(
    async (req, res, next) => {
        const queryObj = new GlobalQuerying(Genre.find(),req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const genres = await queryObj.query;
        
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            results: genres.length,
            data: genres
        });
    }
)

exports.createGenre = GlobalTryCatchAsync(
    async (req, res, next) => {
        const genre = await Genre.create(req.body);
        res.status(201).json({
            status: 'success',
            data: genre
        })
    }
);

exports.getOneGenre = GlobalTryCatchAsync(
    async (req,res, next)=>{
        const genre = await Genre.findById(req.params.id);
        if(!genre){
            const error = new ErrorHandler("Genre with given id doesn't exist.",404);
            return next(error);
        }
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: genre
        }); 
    }
)

exports.editGenre = GlobalTryCatchAsync(
    async (req,res, next)=>{
        let genre = await Genre.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!genre){
            const error = new ErrorHandler("Genre with given id doesn't exist.",404);
            return next(error);
        }
        res.status(200).json({
            status: 'success',
            data: genre
        })
    }
)

exports.deleteGenre = GlobalTryCatchAsync(
    async (req,res, next)=>{
        genre = await Genre.findByIdAndDelete(req.params.id);
        if(!genre){
            const error = new ErrorHandler("Genre with given id doesn't exist.",404);
            return next(error);
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    }
)