const { generateTask } = require("../../services/aiService");
const httpStatusText = require("../../utils/httpStatusText");
const Project = require("../../models/project.model");
const Task = require("../../models/task.model");


const CreateProjectWithGeneratedTasks = async (req, res) => {
    const userId = req.user.id;
    const { projectName, description } = req.body;

    try {
        if (!projectName || !description) {
            return res.status(400).json({
                status: httpStatusText.FAIL,
                message: "Missing fields",
            });
        }

        const generatedTasks = await generateTask(
            projectName,
            description
        );

        const project = await Project.create({
            name: projectName,
            description,
            createdBy: userId
        });

        let createdTasks = [];

        if (generatedTasks?.tasks?.length) {

            const tasksToInsert = generatedTasks.tasks.map(task => ({
                projectId: project._id,
                title: task.title,
                description: task.description,
                priority: task.priority,
                state: task.state,
                phase: task.phase
            }));

            createdTasks = await Task.insertMany(tasksToInsert);
        }

        return res.status(201).json({
            status: httpStatusText.SUCCESS,
            data: {
                id: project._id,
                projectName: project.name,
                description: project.description,
                tasks: createdTasks
            }
        });

    } catch (error) {
        return res.status(500).json({
            status: httpStatusText.ERROR,
            message: error?.message || "Internal server error"
        });
    }
};

const GetAllProjects = async (req, res) => {
    const userId = req.user.id;

    try {
        // const projects = await Project.find({ createdBy: userId });
        const projects = await Project.find({
            $or: [
                { createdBy: userId },
                { team: userId }
            ]
        });

        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            data: projects
        });

    } catch (error) {
        return res.status(500).json({
            status: httpStatusText.ERROR,
            message: error?.message || "Internal server error"
        });
    }
};

// const GetProjectDetails = async (req, res) => {
//     const { projectId } = req.params;
//     const userId = req.user.id;

//     try {
//         const project = await Project.findOne({
//             _id: projectId,
//             createdBy: userId
//         });

//         if (!project) {
//             return res.status(404).json({
//                 status: httpStatusText.FAIL,
//                 message: "Project not found"
//             });
//         }

//         const tasks = await Task.find({ projectId });

//         return res.status(200).json({
//             status: httpStatusText.SUCCESS,
//             data: {
//                 project,
//                 tasks
//             }
//         });
//   catch (error) {
//     return res.status(500).json({
//         status: httpStatusText.ERROR,
//         message: error?.message || "Internal server error"
//     });
// }
// };

const GetProjectDetails = async (req, res) => {
    const { projectId } = req.params;
    const userId = req.user.id;

    try {
        const project = await Project.findOne({
            _id: projectId,
            createdBy: userId
        });

        if (!project) {
            return res.status(404).json({
                status: httpStatusText.FAIL,
                message: "Project not found"
            });
        }

        const tasks = await Task.find({
            projectId: project._id
        });

        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            data: {
                project,
                tasks
            }
        });

    } catch (error) {
        return res.status(500).json({
            status: httpStatusText.ERROR,
            message: error?.message || "Internal server error"
        });
    }
};


const UpdateProject = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const { name, description } = req.body;

    try {
        if (!name && !description) {
            return res.status(400).json({
                status: httpStatusText.FAIL,
                message: "Missing fields"
            });
        }
        const project = await Project.findOneAndUpdate(
            { _id: id, createdBy: userId },
            req.body,
            { returnDocument: 'after' }
        );

        if (!project) {
            return res.status(404).json({
                status: httpStatusText.FAIL,
                message: "Project not found"
            });
        }

        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            message: "Project updated successfully",

            data: project
        });

    } catch (error) {
        return res.status(500).json({
            status: httpStatusText.ERROR,
            message: error?.message || "Internal server error"
        });
    }
};

const DeleteProject = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const project = await Project.findOneAndDelete({
            _id: id,
            createdBy: userId
        });

        if (!project) {
            return res.status(404).json({
                status: httpStatusText.FAIL,
                message: "Project not found"
            });
        }

        // delete related tasks
        await Task.deleteMany({ projectId: id });

        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            message: "Project and related tasks deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            status: httpStatusText.ERROR,
            message: error?.message || "Internal server error"
        });
    }
};

module.exports = {
    CreateProjectWithGeneratedTasks,
    GetAllProjects,
    GetProjectDetails,
    UpdateProject,
    DeleteProject

};