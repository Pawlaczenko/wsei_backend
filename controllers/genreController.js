const Genre = require('../models/genre');

exports.getAllGenres = async (req, res) => {
    try{
        const genres = await Genre.find();
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            results: genres.length,
            data: genres
        });
    } catch(error) {
        res.status(404).json({
            status:'Error',
            results: error
        })
    }
}

exports.createGenre = async (req, res) => {
    try {
        const genre = new Genre({
            name: req.body.name
        });
    
        const newGenre = await genre.save();
        res.status(201).json({
            status: 'success',
            data: newGenre
        })
    } catch (error) {
        res.status(404).json({
            status:'Error',
            results: error.message
        })
    }
}

exports.getOneGenre = async (req,res)=>{
    try {
        const genre = await Genre.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: genre
        }); 
    } catch (error) {
        res.status(404).json({
            status:'Error',
            results: error
        })
    }
}

exports.editGenre = async (req,res, next)=>{
    let genre;
    try {
        genre = await Genre.findById(req.params.id);
        genre.name = req.body.name;

        await genre.save();
        res.status(200).json({
            status: 'success',
            data: genre
        })
    } catch(error) { 
        res.status(404).json({
            status:'Error',
            results: error
        })
    }
}

exports.deleteGenre = async (req,res)=>{
    try {
        genre = await Genre.findByIdAndDelete(req.params.id);
        if(!genre){
            res.status(404).json({
                status: 'fail',
                message: 'No Genre found with this ID'
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