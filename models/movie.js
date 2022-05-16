const mongoose = require('mongoose');

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
    posterImage:{
        type: Buffer,
    },
    posterImageType: {
        type: String,
    },
    director: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Director is required.'],
        ref: 'Director'
    }
});

movieSchema.virtual('posterImagePath').get(function(){
    if(this.posterImage != null && this.posterImageType != null){
        return `data:${this.posterImageType};charset=utf-8;base64,${this.posterImage.toString('base64')}`;
    }
});

module.exports = mongoose.model('Movie', movieSchema);