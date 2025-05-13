const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please provide a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;