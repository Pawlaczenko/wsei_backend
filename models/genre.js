const mongoose = require('mongoose');
const Genre = require('./movie');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Genre',genreSchema);