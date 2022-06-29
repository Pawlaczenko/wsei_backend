const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Firstname is required for Actor"],
    },
    lastName: {
        type: String,
        required: [true, "Lastname is required for Actor"],
    },
    movies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"
    }]
});

actorSchema.index({firstName: 1, lastName: 1},{unique: true});

module.exports = mongoose.model('Actor',actorSchema);