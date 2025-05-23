const User = require("../models/auth");
const jwt = require('jsonwebtoken');

// Helper: handle signup/login errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

// JWT helper
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'tomi secreate key', {
        expiresIn: maxAge
    });
};

// GET routes (optional)
const getSignUp = (req, res) => {
    res.render('signup'); // Or render signup page
};
//
const getLogin = (req, res) => {
    res.render('login'); // Or render login page
};

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
   try{
       const user = await User.login(email, password);
       res.status(200).json({ user: user._id });
   }catch(err){
       res.status(400).json({});
   }

};

module.exports = {
    getSignUp,
    postSignUp,
    getLogin,
    postLogin
};
