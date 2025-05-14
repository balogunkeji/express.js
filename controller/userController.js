const User = require("../models/auth");
const jwt = require('jsonwebtoken');
const getSignUp = (req,res) => {
   console.log(req.body)
}

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

//create token using jwt
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, 'tomi secrete key', {
        expiresIn: maxAge
    })

}

const postSignUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            expires: maxAge * 1000,
        })
        res.status(200).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};


const getLogin = (req, res) => {
    console.log(req.body)
}

const postLogin = (req, res) => {
    console.log(req.body)
}

module.exports = {
    getSignUp,
    postSignUp,
    getLogin,
    postLogin
}