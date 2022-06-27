const mongoose = require('mongoose');
const Actor = require('./actor');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    duration: {
        type: Number
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    director: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Director'
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
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