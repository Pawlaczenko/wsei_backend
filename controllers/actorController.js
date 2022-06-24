const Actor = require('../models/actor');

exports.getAllActors = async (req, res) => {
    try{
        const actors = await Actor.find();
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            results: actors.length,
            data: actors
        });
    } catch(error) {
        res.status(404).json({
            status:'Error',
            results: error
        })
    }
}

exports.createActor = async (req, res) => {
    try {
        const actor = new Actor({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });
    
        const newActor = await actor.save();
        res.status(201).json({
            status: 'success',
            data: newActor
        })
    } catch (error) {
        res.status(404).json({
            status:'Error',
            results: error.message
        })
    }
}

exports.getOneActor = async (req,res)=>{
    try {
        const actor = await Actor.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: actor
        }); 
    } catch (error) {
        res.status(404).json({
            status:'Error',
            results: error
        })
    }
}

exports.editActor = async (req,res, next)=>{
    let actor;
    try {
        actor = await Actor.findById(req.params.id);
        actor.firstName = req.body.firstName;
        actor.lastName = req.body.lastName;

        await actor.save();
        res.status(200).json({
            status: 'success',
            data: actor
        })
    } catch(error) { 
        res.status(404).json({
            status:'Error',
            results: error
        })
    }
}

exports.deleteActor = async (req,res)=>{
    try {
        actor = await Actor.findByIdAndDelete(req.params.id);
        if(!actor){
            res.status(404).json({
                status: 'fail',
                message: 'No Actor found with this ID'
            });
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch(error) {
        res.status(404).json({
            status:'Error',
            results: error
        });
    }
}