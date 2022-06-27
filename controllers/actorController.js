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
        });
    }
}

exports.createActor = async (req, res) => {
    try {
        const actor = await Actor.save(req.body);
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
    try {
        let actor = await Actor.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true
        });

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