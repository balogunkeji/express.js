const User = require("../models/auth");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// Helper: handle signup/login errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // Incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'That email is not registered';
    }

    // Incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'That password is incorrect';
    }

    // Duplicate email error
    if (err.code === 11000) {
        errors.email = 'That email is already registered';
        errors.password = '';
        return errors;
    }

    // Validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};


// JWT helper
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
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
        console.log(token);
        res.status(201).json({ user: user._id, token: token });
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
       const token = createToken(user._id);
       res.cookie('jwt', token, {
           httpOnly: true,
           maxAge: maxAge * 1000,
       });
       res.status(200).json({ user: user._id, token: token });
   } catch(err){
       const errors = handleErrors(err);
       res.status(400).json({errors});
       console.log(errors);
   }
};

const updateEmail = async (req, res) => {
    const { newEmail } = req.body;
    const userId = req.user;

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { email: newEmail },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'Email updated successfully', email: user.email });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};




const updatePassword = async (req, res) => {
    const { newPassword } = req.body;
    const userId = req.user;

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const user = await User.findByIdAndUpdate(
            userId,
            { password: hashedPassword },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports = {
    getSignUp,
    postSignUp,
    getLogin,
    postLogin,
    updateEmail,
    updatePassword,
};
