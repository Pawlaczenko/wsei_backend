const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const GlobalTryCatchAsync = require('../utils/globalTryCatchAsync');
const GlobalQuerying = require('../utils/globalQuerying');

//utils
const filterObj = (obj, ...filters) => {
    const result = {};
    Object.keys(obj).forEach(el => {
        if(filters.includes(el)) result[el] = obj[el];
    });

    return result;
}
//

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

/// Signed users

exports.updateSignedUser = GlobalTryCatchAsync(
    async (req, res, next) => {
        if(req.body.password || req.body.confirmPassword){
            return next(new ErrorHandler("You can't update password with this route.",400));
        }

        const userBody = filterObj(req.body,'firstName','lastName','email');
        const user = await User.findByIdAndUpdate(req.user.id, userBody, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                user: user
            }
        });
    }
);

exports.deleteSignedUser = GlobalTryCatchAsync(
    async (req, res, next) => {
        await User.findByIdAndUpdate(req.user.id,{isActive: false});

        res.status(204).json({
            status: 'success',
            data: null
        });
    }
)