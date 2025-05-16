const express = require('express');
const {
  // getLogin,
  postLogin,
  getSignUp,
  postSignUp
} = require("../controller/userController");

const router = express.Router();

// GET /users/ → Render homepage or dashboard
router.get('/', (req, res) => {
  res.render('users');
});

// POST /users/signup → Handle signup form submission
router.post('/signup', postSignUp);

// GET /users/login → Render login page
// router.get('/login', getLogin);

// POST /users/login → Handle login form submission
router.post('/login', postLogin);

// GET /users/signup → Render signup page
router.get('/signup', getSignUp);

module.exports = router;
