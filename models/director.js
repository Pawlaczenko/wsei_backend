const mongoose = require('mongoose');
const Movie = require('./movie');

const directorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Director',directorSchema);