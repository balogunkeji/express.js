const express = require('express');
const router = express.Router();
const path = require('path');

let posts = [
  { id: 1, title: 'post 1' },
  { id: 2, title: 'post 2' },
  { id: 3, title: 'post 3' },
  { id: 4, title: 'post 4' },
  { id: 5, title: 'post 5' },
  { id: 6, title: 'post 6' },
  { id: 7, title: 'post 7' },
  { id: 8, title: 'post 8' },
  { id: 9, title: 'post 9' },
  { id: 10, title: 'post 10' },
];

// GET homepage
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET posts
router.get('/api/posts', (req, res) => {
  const limit = parseInt(req.query.limit);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  return res.status(200).json(posts);
});

// GET single post
router.get('/api/posts/:id', (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((p) => p.id === id);
  if (!post) {
    return res.status(404).json({ error: `Post with id ${id} doesn't exist` });
  }
  return res.status(200).json(post);
});

router.post('/api/posts', async (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title
  }
  if(!newPost.title) {
    return res.status(400).json({ error: `Please enter title ` });
  }
  posts.push(newPost);
  return res.status(201).json(posts);
})

// PUT
router.put('/api/posts/:id', (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ error: `Post with id ${id} doesn't exist` });
  }

  if (!req.body.title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  post.title = req.body.title;
  res.status(200).json(post);
});

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
