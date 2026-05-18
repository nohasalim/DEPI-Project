const httpStatusText = require("../../utils/httpStatusText");
const Task = require("../../models/task.model")
const Team = require("../../models/team.model");
const User = require("../../models/user.model");

const Project = require("../../models/project.model")

// ADD NEW TASK
const AddNewTask = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { title, description } = req.body;
        const projectExists = await Project.findById(projectId);
        if (!projectExists) {
            return res.status(404).json({
                status: httpStatusText.FAIL,
                message: "Project not found"
            })
        }
        const newTask = new Task({ title, description, projectId })

        await newTask.save();

        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            message: "Task  added successfully",
            data: newTask
        });

    } catch (error) {
        return res.status(500).json({
            status: httpStatusText.ERROR,
            message: error?.message || "Internal server error"
        });
    }

};

// Get All Tasks
const GetAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();

        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            data: tasks
        });
    } catch (error) {
        return res.status(500).json({
            status: httpStatusText.ERROR,
            message: error?.message || "Internal server error"
        });
    }

};

// Update Task By ID
const UpdateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedTask) {
            return res.status(404).json({
                status: httpStatusText.FAIL,
                message: "Task not found"
            })
        }

        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            message: "Task  updated successfully",

            data: updatedTask
        })

    } catch (error) {
        return res.status(500).json({
            status: httpStatusText.ERROR,
            message: error?.message || "Internal server error"
        });
    }

};
// Delete Task By ID
const DeleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id)
        if (!deletedTask) {
            return res.status(404).json({
                status: httpStatusText.FAIL,
                message: "Task not found"
            })
        }
        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            message: "Task deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            status: httpStatusText.ERROR,
            message: error?.message || "Internal server error"
        });
    }

};


const AssignTask = async (req, res) => {
    const currentUserId = req.user.id;

    try {
        const { taskId } = req.params;
        const { userId } = req.body;

        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({
                status: httpStatusText.FAIL,
                message: "Task not found"
            });
        }

        const project = await Project.findById(task.projectId);
        if (!project) {
            return res.status(404).json({
                status: httpStatusText.FAIL,
                message: "Project not found"
            });
        }

        const team = await Team.findOne({ owner: project.createdBy });
        if (!team) {
            return res.status(404).json({
                status: httpStatusText.FAIL,
                message: "Team not found"
            });
        }

        if (team.owner.toString() !== currentUserId) {
            return res.status(403).json({
                status: httpStatusText.FAIL,
                message: "You are not authorized to assign tasks"
            });
        }

        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({
                status: httpStatusText.FAIL,
                message: "User not found"
            });
        }

        const isMember = team.members.includes(userId);
        if (!isMember) {
            return res.status(400).json({
                status: httpStatusText.FAIL,
                message: "User is not in your team"
            });
        }

        task.assignedTo = userId;
        await task.save();

        if (!project.team.some(id => id.toString() === userId)) {
            project.team.push(userId);
            await project.save();
        }

        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            message: "Task assigned successfully",
            data: task
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            status: httpStatusText.ERROR,
            message: error?.message || "Internal server error"
        });
    }
};

module.exports = {
    AddNewTask,
    GetAllTasks,
    UpdateTask,
    DeleteTask,
    AssignTask
};