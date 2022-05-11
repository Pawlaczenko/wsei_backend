const mongoose = require('mongoose');

const posterImageBasePath = 'uploads/moviePosters';

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Movie name is required.'],
    },
    description: {
        type: String,
    },
    duration: {
        type: Number
    },
    releaseDate: {
        type: Date,
        required: [true, 'Release date is required.'],
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    posterImageName:{
        type: String,
    },
    director: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Director is required.'],
        ref: 'Director'
    }
});

module.exports = mongoose.model('Movie',movieSchema);
module.exports.posterImageBasePath = posterImageBasePath;