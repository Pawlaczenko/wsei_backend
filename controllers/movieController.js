const Movie = require('../models/movie');

exports.getMoviesByDirector = async (directorId, limit = 5) => {
    return await Movie.find({director: directorId}).limit(limit).exec();
}