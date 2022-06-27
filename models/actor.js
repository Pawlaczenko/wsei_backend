const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    movies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"
    }]
});

module.exports = mongoose.model('Actor',actorSchema);