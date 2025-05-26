const Task = require('../models/task');
const mongoose = require('mongoose');

// @desc
// @route
// getAllPost

const getAllPost = async (req, res) => {
    try {
        const filter = {};

        // Filter by completion
        if (req.query.completed) {
            filter.completed = req.query.completed === 'true';
        }

        // Filter by priority
        if (req.query.priority) {
            filter.priority = req.query.priority;
        }

        // Filter by dueDate ranges
        if (req.query.dueBefore || req.query.dueAfter) {
            filter.dueDate = {};

            if (req.query.dueBefore) {
                filter.dueDate.$lt = new Date(req.query.dueBefore);
            }

            if (req.query.dueAfter) {
                filter.dueDate.$gt = new Date(req.query.dueAfter);
            }
        }

        const tasks = await Task.find(filter);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching tasks.' });
    }
};


// @desc
// @route
// getASinglePost
const getASinglePost = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findById(id);
        console.log(id)

        if (!task) {
            return res.status(404).json({ error: `Task with ID ${id} not found.` });
        }
        res.status(200).json({message: 'Success', task });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while fetching the task.' });
    }
};


// @desc
// @route
// createPost
const createPost = async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            priority: req.body.priority ||'medium',
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
const updatePost = async (req, res) => {
    const id = req.params.id;

    try {
        // Check if the task exists
        const existingTask = await Task.findById(id);
        if (!existingTask) {
            return res.status(404).json({ error: `Post with id ${id} doesn't exist` });
        }

        // Update task
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
            new: true, // return the updated document
            runValidators: true, // validate against schema
        });

        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while updating the post.' });
    }
};

// @desc
// @route
// deletePost
const deletePost = async (req, res) => {
    const id = req.params.id;

    try {
        // Check if the task exists
        const existingTask = await Task.findById(id);
        if (!existingTask) {
            return res.status(404).json({ error: `Post with id ${id} doesn't exist` });
        }
        // Delete task
        const deleteTask = await Task.findByIdAndDelete(id);

        res.status(200).json(deleteTask);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while deleting the post.' });
    }
};


module.exports = {
    getAllPost,
    getASinglePost,
    createPost,
    updatePost,
    deletePost,
};
