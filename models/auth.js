const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');
const bcrypt = require("bcrypt");

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

//Mongoose hooks are functions that run before or after certain actions in your model — like saving, updating, deleting, etc.
// They are used for hashing passwords, run validations, cleanup logic, etc.

//pre save: runs before the function
userSchema.pre('save', async function(next) {
   const salt = await bcrypt.genSalt();
   this.password = await bcrypt.hash(this.password, salt);

    next();
})

//post save: runs after the function
userSchema.post('save', async function(doc, next) {
    console.log('post save', doc)
    next();
})

const User = mongoose.model('User', userSchema);
module.exports = User;