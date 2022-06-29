const mongoose = require('mongoose');
const Actor = require('./actor');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A movie must have a title'],
        maxlength: [150, 'A movie title must be less or equal to 150 characters'],
        minlength: [2, 'A movie title must be more or equal to 2 characters'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'A movie must have a description'],
        maxlength: [1000, 'A movie description must be less or equal to 1000 characters'],
        minlength: [2, 'A movie description must be more or equal to 2 characters'],
        trim: true,
    },
    duration: {
        type: Number,
        required: [true, 'A movie must have a duration time in minutes'],
        minlength: [1, 'A movie must be at least a minute long'],
        maxlength: [5100, 'A movie musn\'t be longer than 5100 minutes long'],
    },
    releaseDate: {
        type: Date,
        required: [true, 'A movie must have a release date'],
    },
    director: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true,'A movie must have a director'],
        ref: 'Director'
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'A movie must have specified genre'],
        ref: 'Genre'
    },
    actors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor'
    }]
});

movieSchema.pre('find', function(next) {
    this.populate({path: 'director'})
        .populate({path:'genre'})
        .populate({path:'actors',select: 'firstName lastName'})
    next();
});

movieSchema.pre('findOne', function(next) {
    this.populate({path: 'director'})
        .populate({path:'genre'})
        .populate({path:'actors',select: 'firstName lastName'})
    next();
});

// movieSchema.pre('save', function(next){
//     [this.actors].map(actorId => {

//     });
// });

module.exports = mongoose.model('Movie', movieSchema);