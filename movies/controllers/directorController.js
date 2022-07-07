const Director = require('../models/director');
const ErrorHandler = require('../utils/errorHandler');
const GlobalTryCatchAsync = require('../utils/globalTryCatchAsync');
const GlobalQuerying = require('../utils/globalQuerying');

exports.getAllDirectors = GlobalTryCatchAsync(
    async (req, res, next) => {
        const queryObj = new GlobalQuerying(Director.find(),req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const directors = await queryObj.query;

        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            results: directors.length,
            data: directors
        });
    }
);

exports.createDirector = GlobalTryCatchAsync(
    async (req, res, next) => {
        const director = await Director.create(req.body);
        res.status(201).json({
            status: 'success',
            data: director
        })
    }
);

exports.getOneDirector = GlobalTryCatchAsync(
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

exports.editDirector = GlobalTryCatchAsync(
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

exports.deleteDirector = GlobalTryCatchAsync(
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