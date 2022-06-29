const Director = require('../models/director');
const globalTryCatchAsync = require('../utils/globalTryCatchAsync');

exports.getAllDirectors = globalTryCatchAsync(
    async (req, res, next) => {
        const directors = await Director.find();
            res.status(200).json({
                status: 'success',
                requestedAt: req.requestTime,
                results: directors.length,
                data: directors
        });
    }
);

exports.createDirector = globalTryCatchAsync(
    async (req, res, next) => {
        const director = await Director.create(req.body);
        res.status(201).json({
            status: 'success',
            data: director
        })
    }
);

exports.getOneDirector = globalTryCatchAsync(
    async (req,res, next)=>{
        const director = await Director.findById(req.params.id);
        if(!director){
            const error = new ErrorHandler("Director with given id doesn't exist.",404);
            return next(error);
        }
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: director
        }); 
    
    }
)

exports.editDirector = globalTryCatchAsync(
    async (req,res, next)=>{

        let director = await Director.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true
        });
        if(!director){
            const error = new ErrorHandler("Director with given id doesn't exist.",404);
            return next(error);
        }
        res.status(200).json({
            status: 'success',
            data: director
        })
    }
)

exports.deleteDirector = globalTryCatchAsync(
     async (req,res, next)=>{
        const director = await Director.findByIdAndDelete(req.params.id);
        if(!director){
            const error = new ErrorHandler("Director with given id doesn't exist.",404);
            return next(error);
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    }
)