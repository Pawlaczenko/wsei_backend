const {promisify} = require('util');

const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const GlobalTryCatchAsync = require('../utils/globalTryCatchAsync');
const {convertDaysToMiliseconds} = require('../utils/generalUtils');

const jwt = require('jsonwebtoken');

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

const createAndSendToken = (user, statusCode,res)=>{
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(Date.now() + convertDaysToMiliseconds(30)),
        httpOnly: true
    };
    if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('token',token,cookieOptions);

    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user: user,
        } 
    });
}

exports.register = GlobalTryCatchAsync(
    async (req,res,next) => {
        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            role: req.body.role
        });
        createAndSendToken(newUser,201,res);
    }
);

exports.login = GlobalTryCatchAsync(
    async (req, res, next) => {
        const {email, password,} = req.body;

        if(!email || !password){
            return next(new ErrorHandler("Email and Password are required to log in", 400));
        }

        const user = await User.findOne({email}).select('+password +role');

        if(!user || !(await user.checkPassword(password, user.password))){
            return next(new ErrorHandler("Incorrect email or password", 401));
        }

        createAndSendToken(user,200,res);
    }
)

exports.protect = GlobalTryCatchAsync(
    async (req, res, next) => {

        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            // Authorization: "Bearer token"
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token){
            return next(new ErrorHandler("Not logged in users don't have access to this data", 401));
        }

        const tokenPromise = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        const currentUser = await User.findById(tokenPromise.id);

        if(!currentUser){
            return next(new ErrorHandler("The user does not exists",401));
        }

        if(currentUser.isPasswordChanged(tokenPromise.iat)){
            return next(new ErrorHandler("The password has been changed. Log in again.",401));
        }

        req.user = currentUser;
        next();
    }
)

exports.restrict = (...roles) => {
    return (req,res,next) => {
        // console.log(req.user);
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler('Permission denied.',403));
        }
        next();
    }
}

exports.changePassword = GlobalTryCatchAsync(
    async (req,res,next) => {
        const user = await User.findById(req.user.id).select('+password');
        if(!(await user.checkPassword(req.body.passwordCurrent,user.password))){
            return next(new ErrorHandler('Password is incorrect. Try again.',401));
        }
        
        user.password = req.body.password;
        user.confirmPassword = req.body.confirmPassword;
        await user.save();

        createAndSendToken(user,200,res);
    }
)

exports.getUser = GlobalTryCatchAsync(
    async (req,res,next) => {
        if (!req.params.token) return next(new AppError('You must be logged in', 401));

        const token = req.params.token;
        const tokenPromise = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const currentUser = await User.findById(tokenPromise.id).select('+role');
        if(!currentUser){
            return next(new ErrorHandler("The user does not exists",401));
        }
        if(currentUser.isPasswordChanged(tokenPromise.iat)){
            return next(new ErrorHandler("The password has been changed. Log in again.",401));
        }

        res.status(200).json({
            status: 'success',
            data: currentUser
        });
    }
);