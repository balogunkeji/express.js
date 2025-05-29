const express = require('express');
const {
  getLogin,
  postLogin,
  getSignUp,
  postSignUp, updateEmail, updatePassword
} = require("../controller/userController");
const {requireAuth} = require("../middleware/authMiddleware");

const router = express.Router();

// GET /users/ → Render homepage or dashboard
router.get('/', (req, res) => {
  res.render('users');
});

// POST /users/signup → Handle signup form submission
router.post('/signup', postSignUp);

// GET /users/login → Render login page
router.get('/login', getLogin);

// POST /users/login → Handle login form submission
router.post('/login', postLogin);

// GET /users/signup → Render signup page
router.get('/signup', getSignUp);


// UPDATE /users/updateEmail
router.put('/update-email', requireAuth, updateEmail);

// UPDATE /users/updateEmail
router.put('/update-password', requireAuth, updatePassword);


module.exports = router;
