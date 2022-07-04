const mongoose = require('mongoose');
const Movie = require('./movie');

const directorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Firstname is required for Director"],
    },
    lastName: {
        type: String,
        required: [true, "Lastname is required for Director"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
});

directorSchema.index({firstName: 1, lastName: 1},{unique: true});

module.exports = mongoose.model('Director',directorSchema);