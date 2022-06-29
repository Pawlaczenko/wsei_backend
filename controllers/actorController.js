const Actor = require('../models/actor');
const ErrorHandler = require('../utils/errorHandler');
const globalTryCatchAsync = require('../utils/globalTryCatchAsync');

exports.getAllActors = globalTryCatchAsync(
    async (req, res, next) => {
        const actors = await Actor.find();
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            results: actors.length,
            data: actors
        });
    }
)

exports.createActor = globalTryCatchAsync(
    async (req, res, next) => {
        const actor = await Actor.create(req.body);
        res.status(201).json({
            status: 'success',
            data: actor
        })
    }
);

exports.getOneActor = globalTryCatchAsync(
    async (req,res, next)=>{
        const actor = await Actor.findById(req.params.id);
        if(!actor){
            const error = new ErrorHandler("Actor with given id doesn't exist.",404);
            return next(error);
        }
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: actor
        }); 
    }
);

exports.editActor = globalTryCatchAsync(
    async (req,res, next)=>{
        let actor = await Actor.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true
        });
        if(!actor){
            const error = new ErrorHandler("Actor with given id doesn't exist.",404);
            return next(error);
        }
        res.status(200).json({
            status: 'success',
            data: actor
        })
    }
)

exports.deleteActor = globalTryCatchAsync(
    async (req,res, next)=>{
        await Actor.findByIdAndDelete(req.params.id);
        if(!actor){
            const error = new ErrorHandler("Actor with given id doesn't exist.",404);
            return next(error);
        }
        res.status(204).json({
            status: 'success',
            data: null,
            message: "Successfully deleted actor"
        });
    }
)