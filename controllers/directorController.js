const Director = require('../models/director');

const {
    getMoviesByDirector
} = require('../controllers/movieController');

exports.getAllDirectors = async (req, res) => {
    try{
        const directors = await Director.find();
        res.render('directors/index', {
            directors: directors
        });
    } catch {
        res.redirect('/');
    }
}

exports.createDirector = async (req, res) => {
    const director = new Director({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    try {
        const newDirector = await director.save();
        res.redirect(`directors/${newDirector.id}`)
    } catch {
        res.render('directors/new',{
            director: director,
            errorMessage: 'Error creating Director'
        });
    }
}

exports.getOneDirector = async (req,res)=>{
    try {
        const director = await Director.findById(req.params.id);
        const movies = await getMoviesByDirector(director.id);
        res.render('directors/show',{
            director: director,
            moviesByDirector: movies
        });
    } catch {
        res.redirect('/');
    }
}

exports.editDirector = async (req,res)=>{
    let director;
    try {
        director = await Director.findById(req.params.id);
        director.firstName = req.body.firstName;
        director.lastName = req.body.lastName;

        await director.save();
        res.redirect(`/directors/${director.id}`)
    } catch(err) { 
        res.redirect('/');
    }
}

exports.deleteDirector = async (req,res)=>{
    let director;
    try {
        director = await Director.findById(req.params.id);
        await director.remove();
        res.redirect(`/directors`)
    } catch {
        if(director == null){
            res.redirect('/');
        } else {    
            res.redirect(`/directors/${director.id}`);
        }
    }
}