const ErrorHandler = require('../utils/errorHandler');
const GlobalTryCatchAsync = require('../utils/globalTryCatchAsync');
const GlobalQuerying = require('../utils/globalQuerying');
const axios = require('axios');

exports.protect = GlobalTryCatchAsync(
    async (req, res, next) => {
        
        next();
    }
)