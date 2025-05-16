const User = require("../models/auth");
const jwt = require('jsonwebtoken');

// Helper: handle signup/login errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // Duplicate email error
    if (err.code === 11000) {
        errors.email = 'That email is already registered';
        return errors;
    }

    // Mongoose validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    // Custom errors (e.g. in login)
    if (err.message === 'Incorrect email') {
        errors.email = 'That email is not registered';
    }
    if (err.message === 'Incorrect password') {
        errors.password = 'That password is incorrect';
    }

    return errors;
};

// JWT helper
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'tomi secreate key', {
        expiresIn: maxAge
    });
};

// // GET routes (optional)
// const getSignUp = (req, res) => {
//     res.send('Signup route'); // Or render signup page
// };
//
// const getLogin = (req, res) => {
//     res.send('Login route'); // Or render login page
// };

// POST: Signup user
const postSignUp = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
        });
        res.status(201).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

// POST: Login user
const postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password); // See note below
        const token = createToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000,
        });
        res.status(200).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports = {
    // getSignUp,
    postSignUp,
    // getLogin,
    postLogin
};
