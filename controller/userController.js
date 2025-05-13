const User = require("../models/auth");
const getSignUp = (req,res) => {
   console.log(req.body)
}

const postSignUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.create({ email, password });
        res.status(200).json({ message: "User registered!", user });
    } catch (err) {
        res.status(500).send("Signup failed");
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