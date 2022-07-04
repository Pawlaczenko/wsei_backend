const Actor = require('../models/actor');
const ErrorHandler = require('../utils/errorHandler');
const GlobalTryCatchAsync = require('../utils/globalTryCatchAsync');
const GlobalQuerying = require('../utils/globalQuerying');

exports.getAllActors = GlobalTryCatchAsync(
    async (req, res, next) => {
        const queryObj = new GlobalQuerying(Actor.find(),req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const actors = await queryObj.query;

        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            results: actors.length,
            data: actors
        });
    }
)

exports.createActor = GlobalTryCatchAsync(
    async (req, res, next) => {
        const actor = await Actor.create(req.body);
        res.status(201).json({
            status: 'success',
            data: actor
        })
    }
);

exports.getOneActor = GlobalTryCatchAsync(
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

exports.editActor = GlobalTryCatchAsync(
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

exports.deleteActor = GlobalTryCatchAsync(
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