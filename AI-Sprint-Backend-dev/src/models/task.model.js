const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    },

    state: {
        type: String,
        enum: ["backlog", "in_progress", "review", "completed"],
        default: "backlog"
    },
    phase: {
        type: String,
        enum: ["planning", "design", "development", "testing", "deployment", "Other"],
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Task", taskSchema);