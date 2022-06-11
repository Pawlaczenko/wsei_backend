const mongoose = require('mongoose');
const Genre = require('./movie');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
});

genreSchema.pre('remove', function(next){
    Genre.find({director: this.id},(err,movies)=>{
        if(err){
            next(err);
        } else if(movies.length >0){
            next(new Error("This director belongs to a movie"));
        } else {
            next();
        }
    });
});

module.exports = mongoose.model('Genre',genreSchema);