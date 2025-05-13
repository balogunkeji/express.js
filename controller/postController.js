const Task = require('../models/task');
const mongoose = require('mongoose');

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

const getAllPost = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching tasks.' });
    }
};



// @desc
// @route
// getASinglePost
const  getASinglePost = (req, res) => {
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
const createPost = async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            createdBy: new mongoose.Types.ObjectId(),
            project: new mongoose.Types.ObjectId(),
        });
        const savedTask = await task.save();
        res.status(200).json(savedTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// @desc
// @route
// updatePost
const  updatePost = (req, res) => {
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

module.exports = {
    getAllPost,
    getASinglePost,
    createPost,
    updatePost
};
