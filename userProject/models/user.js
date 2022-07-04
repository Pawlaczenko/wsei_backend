const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
        required: [true, "Email is required for user"],
        lowercase: true,
        validate: [validator.isEmail, 'This email is not valid'],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required for user"],
        minlength: 8
    },
    confirmPassword: {
        type: String,
        required: [true, "Confirm password is required for user"],
        minlength: 8,
        validate: {
            validator: function(item) {
                return item === this.password;
            },
            message: "Passwords don't match."
        }
    }
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = undefined;
});

module.exports = mongoose.model('User', userSchema);