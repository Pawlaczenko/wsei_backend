const ErrorHandler = require('../utils/errorHandler');
const GlobalTryCatchAsync = require('../utils/globalTryCatchAsync');
const GlobalQuerying = require('../utils/globalQuerying');
const axios = require('axios');

exports.protect = GlobalTryCatchAsync(
    async (req, res, next) => {
        if(!req.cookies.token) return next(new ErrorHandler("You must be logged in.",401));
        try {
            const response = await axios.get( "http://127.0.0.1:3002/users/getUser/" +req.cookies.token);
            req.user = response.user;
        } catch(error) {

           return next(new ErrorHandler(error.data.message,401));
        }

        next();
    }
);