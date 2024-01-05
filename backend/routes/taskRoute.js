const express = require("express");
const Task = require("../models/taskModel");
const router = express.Router();
const {
  createTask,
  getTask,
  getTasks,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");

//Create a task
router.post("/api/tasks", createTask);

//get a single task
router.get("/api/tasks/:id", getTask);
//:id is a parameter (params)

//Get all tasks
router.get("/api/tasks", getTasks);

//delete a task
router.delete("/api/tasks/:id", deleteTask);

//update a task
router.put("/api/tasks/:id", updateTask);
//for put we need to put all the fields

//for patch we need to put only the fields/properties that we want to update
//like for example, in "completed" property we can use patch to change it to true
module.exports = router;
