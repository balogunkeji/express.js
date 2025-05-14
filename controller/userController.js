const User = require("../models/auth");
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

const postSignUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.create({ email, password });
        res.status(200).json({ message: "User registered!", user });
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