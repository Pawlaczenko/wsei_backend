const Director = require('../models/director');

exports.getAllDirectors = async (req, res) => {
    try{
        const directors = await Director.find();
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            results: directors.length,
            data: directors
        });
    } catch(error) {
        res.status(404).json({
            status:'Error',
            results: error
        })
    }
}

exports.createDirector = async (req, res) => {
    try {
        const director = await Director.create(req.body);
        res.status(201).json({
            status: 'success',
            data: newDirector
        })
    } catch (error) {
        res.status(404).json({
            status:'Error',
            results: error.message
        })
    }
}

exports.getOneDirector = async (req,res)=>{
    try {
        const director = await Director.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: director
        }); 
    } catch (error) {
        res.status(404).json({
            status:'Error',
            results: error
        })
    }
}

exports.editDirector = async (req,res, next)=>{
    let director;
    try {
        director = await Director.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: director
        })
    } catch(error) { 
        res.status(404).json({
            status:'Error',
            results: error
        })
    }
}

exports.deleteDirector = async (req,res)=>{
    try {
        director = await Director.findByIdAndDelete(req.params.id);
        if(!director){
            res.status(404).json({
                status: 'fail',
                message: 'No Director found with this ID'
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