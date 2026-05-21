const express = require('express');
const router = express.Router();

// Controllers (contain business logic)
const ProjectController = require('../modules/controllers/project.controller');
const TaskController = require('../modules/controllers/task.controller');
const TeamController = require('../modules/controllers/team.controller');

// Middleware to validate MongoDB ObjectId format
const validateObjectId = require('../middleware/validateObjectId.middleware');


/* =========================
   PROJECT ROUTES
========================= */

// Generate tasks automatically for a project (AI or logic-based)
// router.post('/generate-task', ProjectController.GenerateProjectTasks);

// Create a new project
// router.post('/projects', ProjectController.AddNewProject);
router.post('/projects', ProjectController.CreateProjectWithGeneratedTasks);

// Get all projects
router.get('/projects', ProjectController.GetAllProjects);

// Get project details by ID (with ID validation middleware)
router.get(
    '/projectdetails/:projectId',
    validateObjectId('projectId'),
    ProjectController.GetProjectDetails
);

// Delete a project by ID (validate ID first)
router.delete(
    '/projects/:id',
    validateObjectId('id'),
    ProjectController.DeleteProject
);

// Update a project by ID (validate ID first)
router.patch(
    '/projects/:id',
    validateObjectId('id'),
    ProjectController.UpdateProject
);


/* =========================
   TASK ROUTES
========================= */

// Create a new task under a specific project
router.post(
    '/tasks/:projectId',
    validateObjectId('projectId'),
    TaskController.AddNewTask
);

// Get all tasks under a specific project
router.get(
    '/tasks/:projectId',
    validateObjectId('projectId'),
    TaskController.GetAllTasks
);

// Delete a task by ID
router.delete(
    '/tasks/:id',
    validateObjectId('id'),
    TaskController.DeleteTask
);

// Update a task by ID
router.patch(
    '/tasks/:id',
    validateObjectId('id'),
    TaskController.UpdateTask
);
router.patch(
    '/tasks/:taskId/assign',
    validateObjectId('taskId'),
    TaskController.AssignTask
);


//#region Team Router
router.post('/teamMembers/:projectId/invite', TeamController.InviteMember)
router.get('/teamMembers/:projectId', TeamController.TeamMembers)
//#endregion

// Export router to use in main server file
module.exports = router;