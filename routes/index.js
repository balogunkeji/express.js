const express = require('express');
const router = express.Router();
const {getAllPost, getASinglePost, createPost, updatePost} = require("../controller/postController.js");
const {deletePost} = require("../controller/postController");
const { requireAuth } = require('../middleware/authMiddleware');

// GET homepage
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET posts
router.get('/api/task', requireAuth, getAllPost);

// GET single post
router.get('/api/task/:id', requireAuth, getASinglePost);

router.post('/api/task', requireAuth, createPost);

// PUT
router.put('/api/task/:id', requireAuth, updatePost);

// DELETE
router.delete('/api/task/:id', requireAuth, deletePost);

module.exports = router;
