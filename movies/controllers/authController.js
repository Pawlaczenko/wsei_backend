const ErrorHandler = require('../utils/errorHandler');
const GlobalTryCatchAsync = require('../utils/globalTryCatchAsync');
const GlobalQuerying = require('../utils/globalQuerying');
const axios = require('axios');

exports.protect = GlobalTryCatchAsync(
    async (req, res, next) => {
        if(!req.cookies.token) return next(new ErrorHandler("You must be logged in.",401));
        try {
            const response = await axios.get( `http://users:3002/users/getUser/${req.cookies.token}`);
            req.user = response.data;
        } catch(error) {
           return next(new ErrorHandler(error.data.message,401));
        }

        next();
    }
);

exports.restrict = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.data.role)){
            return next(new ErrorHandler('Permission denied.',403));
        }
        next();
    }
}