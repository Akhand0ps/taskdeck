const express = require('express');
const router  = express.Router();

const authMiddleware = require("../middleware/authmiddleware");
const TaskController = require("../controller/task.controller");

/* 
POST	/	Create a new task
GET	/	Get all own tasks
GET	/:id	Get one task by ID
PUT	/:id	Update a task
DELETE	/:id	Delete a task
PATCH	/:id/toggle	Toggle isPublic true/false
PATCH	/:id/complete	Mark task as completed/incomplete (optional)
 */

router.post('/',authMiddleware.authUser,TaskController.createTask)
router.get('/',authMiddleware.authUser,TaskController.getAllTasks);
router.put('/:id',authMiddleware.authUser,TaskController.updateTask);
router.delete('/:id',authMiddleware.authUser,TaskController.deleteTask);
router.patch('/:id/toggle',authMiddleware.authUser,TaskController.togglePublic);
router.patch('/:id/complete',authMiddleware.authUser,TaskController.completeTask);
router.get("/public/:userId",authMiddleware.authUser,TaskController.viewPublicTasks);
router.get("/public",authMiddleware.authUser,TaskController.viewPUsers);
router.get('/:id',authMiddleware.authUser,TaskController.getOneTask);




module.exports = router;
