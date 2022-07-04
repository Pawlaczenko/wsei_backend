const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const GlobalTryCatchAsync = require('../utils/globalTryCatchAsync');
const GlobalQuerying = require('../utils/globalQuerying');

exports.getAllUsers = GlobalTryCatchAsync(
    async (req, res) => {
        const queryObj = await new GlobalQuerying(User.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const users = await queryObj.query;

        res.status(200).json({
            status: 'success',
            results: users.length,
            data: users ,
        });
    }
);

exports.getOneUser = GlobalTryCatchAsync(
    async (req, res, next) => {
        const user = await User.findById(req.params.id);

        if (!user) return next(new ErrorHandler('No user found with this id', 404));

        return res.status(200).json({
            status: 'success',
            data: user,
        });
    }
);

exports.updateUser = GlobalTryCatchAsync(
    async (req, res, next) => {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, 
            {
                new: true,
                runValidators: true,
            }
        );

        if (!user) return next(new ErrorHandler('No user found with this id', 404));

        res.status(200).json({
            status: 'success',
            data: user,
        });
        }
);

exports.deleteUser = GlobalTryCatchAsync(
    async (req, res, next) => {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) return next(new ErrorHandler('No user found with this id', 404));

        res.status(204).json({
            status: 'success',
            data: null,
        });
    }
);