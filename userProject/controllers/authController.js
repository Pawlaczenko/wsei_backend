const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const GlobalTryCatchAsync = require('../utils/globalTryCatchAsync');
const GlobalQuerying = require('../utils/globalQuerying');

exports.register = GlobalTryCatchAsync(
    async (req,res,next) => {
        const newUser = await User.create(req.body);

        res.status(201).json({
           status: 'success',
           data: {
            user: newUser,
           } 
        });
    }
);