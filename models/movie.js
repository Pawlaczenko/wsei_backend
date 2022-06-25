const mongoose = require('mongoose');

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
    posterImage:{
        type: Buffer,
    },
    posterImageType: {
        type: String,
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
});

module.exports = mongoose.model('Movie', movieSchema);