const mongoose = require('mongoose');
const {getMoviesByActor} = require('../controllers/movieController');

const actorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Firstname is required for Actor"],
    },
    lastName: {
        type: String,
        required: [true, "Lastname is required for Actor"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true} 
});

// actorSchema.virtual('movies').get(function(){
//     return getMoviesByActor(this._id);
// });

actorSchema.index({firstName: 1, lastName: 1},{unique: true});

module.exports = mongoose.model('Actor',actorSchema);