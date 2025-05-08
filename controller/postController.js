const Task = require('../model/task');
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

// @desc
// @route
// getAllPost

export const  getAllPost = (req, res) => {
    const task = new Task({

    });

    // const limit = parseInt(req.query.limit);
    // if (!isNaN(limit) && limit > 0) {
    //     return res.status(200).json(posts.slice(0, limit));
    // }
    // return res.status(200).json(posts);
}

// @desc
// @route
// getASinglePost
export const  getASinglePost = (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find((p) => p.id === id);
    if (!post) {
        return res.status(404).json({ error: `Post with id ${id} doesn't exist` });
    }
    return res.status(200).json(post);
}

// @desc
// @route
// createPost
export const  createPost = (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title
    }
    if(!newPost.title) {
        return res.status(400).json({ error: `Please enter title ` });
    }
    posts.push(newPost);
    return res.status(201).json(posts);
}

// @desc
// @route
// updatePost
export const  updatePost = (req, res) => {
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
}