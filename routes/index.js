const express = require('express');
const router = express.Router();
const path = require('path');
const {getAllPost, getASinglePost, createPost, updatePost} = require("../controller/postController");


// GET homepage
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET posts
router.get('/api/posts', getAllPost);

// GET single post
router.get('/api/posts/:id', getASinglePost);

router.post('/api/posts', createPost);

// PUT
router.put('/api/posts/:id', updatePost);

//DELETE
router.delete('/api/posts/:id', (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ error: `Post with id ${id} doesn't exist` });
  }

  posts = posts.filter((p) => p.id !== id);
  res.status(200).json(post);
});

module.exports = router;
