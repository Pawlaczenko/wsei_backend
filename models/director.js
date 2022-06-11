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

directorSchema.pre('remove', function(next){
    Movie.find({director: this.id},(err,movies)=>{
        if(err){
            next(err);
        } else if(movies.length >0){
            next(new Error("This director belongs to a movie"));
        } else {
            next();
        }
    });
});

module.exports = mongoose.model('Director',directorSchema);