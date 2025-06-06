const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    date: {
       type: Date,
    },
    dueDate: {
        type: Date,
    },
    dueBefore: {
        type: Date,
    },
    dueAfter: {
        type: Date,
    },
    labels: [{
        type: String,
    }],
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project', // Optional: assign task to a project
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, {timestamps: true});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;