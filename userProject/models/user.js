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
    role: {
        type: String,
        enum: ["user", "admin"],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, "Password is required for user"],
        minlength: 8,
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, "Confirm password is required for user"],
        minlength: 8,
        select: false,
        validate: {
            validator: function(item) {
                return item === this.password;
            },
            message: "Passwords don't match."
        }
    },
    passwordChangedAt: {
        type: Date
    }
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = undefined;
});

userSchema.methods.checkPassword = async function(incomingPassword, userPassword) {
    return await bcrypt.compare(incomingPassword, userPassword);
}

userSchema.methods.isPasswordChanged = function(tokenTime) {
    if(this.passwordChangedAt) {
        const passwordChangedAtMiliseconds = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
        return passwordChangedAtMiliseconds > tokenTime;
    }
    return false;
}

module.exports = mongoose.model('User', userSchema);