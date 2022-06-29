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
            data: newDirector
        })
    }
);

exports.getOneDirector = globalTryCatchAsync(
    async (req,res, next)=>{
        const director = await Director.findById(req.params.id);
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

        res.status(200).json({
            status: 'success',
            data: director
        })
    }
)

exports.deleteDirector = globalTryCatchAsync(
     async (req,res, next)=>{
        director = await Director.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    }
)