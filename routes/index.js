const express = require('express');
const router = express.Router();
const {getAllPost, getASinglePost, createPost, updatePost} = require("../controller/postController.js");
const {deletePost} = require("../controller/postController");


// GET homepage
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET posts
router.get('/api/task', getAllPost);

// GET single post
router.get('/api/task/:id', getASinglePost);

router.post('/api/task', createPost);

// PUT
router.put('/api/task/:id', updatePost);

// DELETE
router.delete('/api/task/:id', deletePost);

module.exports = router;
