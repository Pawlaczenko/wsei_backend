const Actor = require('../models/actor');
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
            data: newActor
        })
    }
);

exports.getOneActor = globalTryCatchAsync(
    async (req,res, next)=>{
        const actor = await Actor.findById(req.params.id);
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

        res.status(200).json({
            status: 'success',
            data: actor
        })
    }
)

exports.deleteActor = globalTryCatchAsync(
    async (req,res, next)=>{
        actor = await Actor.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    }
)