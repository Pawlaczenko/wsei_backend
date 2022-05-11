const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Director name is required.'],
    },
    surname: {
        type: String,
        required: [true, 'Director surname is required.'],
    }
});

module.exports = mongoose.model('Director',directorSchema);