const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Firstname is required for User"],
    },
    lastName: {
        type: String,
        required: [true, "Lastname is required for User"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    email: {
        type: String,
        require: [true, "Email is required for user"],
        lowercase: true,
    },
    password: {
        type: String,
        require: [true, "Password is required for user"]
    },
    confirmPassword: {
        type: String,
        require: [true, "Confirm password is required for user"]
    }
});