const ErrorHandler = require('../utils/errorHandler');

const handleDevError = (err,res) =>{
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        error: err
    });
}

const handleProductionError = (err, res) => {
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        console.error(err);
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong :('
        });
    }
}

const handleCastError = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new ErrorHandler(message,400);
}

const handleDuplicationError = (err) => {
    const value = err.keyValue.name;
    const message = `The value ${value} already exists. Use different value`;

    return new ErrorHandler(message,400);
}

const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;

    return new ErrorHandler(message, 400);
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if(process.env.NODE_ENV === 'production'){
        let error = err;
        
        console.log(error);

        if(error.name === 'CastError') error = handleCastError(error);
        if(error.code === 11000) error = handleDuplicationError(error);
        if(error.name === 'ValidationError') error = handleValidationError(error);

        handleProductionError(error,res);
    } else {
        handleDevError(err,res);
    }
}