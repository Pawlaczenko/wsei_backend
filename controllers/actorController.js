const Actor = require('../models/actor');

const {
    getMoviesByActor
} = require('../controllers/movieController');

exports.getAllActors = async (req, res) => {
    try{
        const actors = await Actor.find();
        res.render('actors/index', {
            actors: actors
        });
    } catch {
        res.redirect('/');
    }
}

exports.createActor = async (req, res) => {
    const actor = new Actor({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    try {
        const newActor = await director.save();
        res.redirect(`actors/${newActor.id}`)
    } catch {
        res.render('actors/new',{
            actor: actor,
            errorMessage: 'Error creating Actor'
        });
    }
}

exports.getOneActor = async (req,res)=>{
    try {
        const actor = await Actor.findById(req.params.id);
        const movies = await getMoviesByActor(actor.id);
        res.render('actors/show',{
            actor: actor,
            getMoviesByActor: movies
        });
    } catch {
        res.redirect('/');
    }
}

exports.editActor = async (req,res)=>{
    let actor;
    try {
        actor = await Actor.findById(req.params.id);
        actor.firstName = req.body.firstName;
        actor.lastName = req.body.lastName;

        await actor.save();
        res.redirect(`/actors/${actor.id}`)
    } catch(err) { 
        res.redirect('/');
    }
}

exports.deleteActor = async (req,res)=>{
    let actor;
    try {
        actor = await Actor.findById(req.params.id);
        await actor.remove();
        res.redirect(`/actors`)
    } catch {
        if(actor == null){
            res.redirect('/');
        } else {    
            res.redirect(`/actors/${actor.id}`);
        }
    }
}