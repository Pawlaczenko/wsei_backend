const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const GlobalTryCatchAsync = require('../utils/globalTryCatchAsync');
const GlobalQuerying = require('../utils/globalQuerying');

const jwt = require('jsonwebtoken');

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

exports.register = GlobalTryCatchAsync(
    async (req,res,next) => {
        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        });

        const token = signToken(newUser._id);

        res.status(201).json({
           status: 'success',
           token,
           data: {
            user: newUser,
           } 
        });
    }
);

exports.login = GlobalTryCatchAsync(
    async (req, res, next) => {
        const {email, password} = req.body;

        if(!email || !password){
            return next(new ErrorHandler("Email and Password are required to log in", 400));
        }

        const user = await User.findOne({email}).select('+password');

        if(!user || !(await user.checkPassword(password, user.password))){
            return next(new ErrorHandler("Incorrect email or password", 401));
        }

        const token = signToken(user._id);
        res.status(200).json({
            status: 'success',
            token
        });
    }
)