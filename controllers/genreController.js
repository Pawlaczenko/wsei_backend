const Genre = require('../models/genre');
const globalTryCatchAsync = require('../utils/globalTryCatchAsync');

exports.getAllGenres = globalTryCatchAsync(
    async (req, res, next) => {
        const genres = await Genre.find();
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            results: genres.length,
            data: genres
        });
    }
)

exports.createGenre = globalTryCatchAsync(
    async (req, res, next) => {
        const genre = await Genre.create(req.body);
        res.status(201).json({
            status: 'success',
            data: newGenre
        })
    }
);

exports.getOneGenre = globalTryCatchAsync(
    async (req,res, next)=>{
        const genre = await Genre.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: genre
        }); 
    }
)

exports.editGenre = globalTryCatchAsync(
    async (req,res, next)=>{
        let genre = await Genre.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: genre
        })
    }
)

exports.deleteGenre = globalTryCatchAsync(
    async (req,res, next)=>{
        genre = await Genre.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    }
)