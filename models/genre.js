const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A genre must have a name.'],
        maxlength: [50, 'A genre name must be less or equal to 50 characters'],
        minlength: [2, 'A genre name must be more or equal to 2 characters'],
        unique: true,
    }
});

module.exports = mongoose.model('Genre',genreSchema);