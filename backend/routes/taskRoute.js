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

//router.route("/").get(getTasks).post(createTask);
//router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

//Create a task
router.post("/", createTask);

//get a single task
router.get("/:id", getTask);
//:id is a parameter (params)

//Get all tasks
router.get("/", getTasks);

//delete a task
router.delete("/:id", deleteTask);

//update a task
router.put("/:id", updateTask);
//for put we need to put all the fields

//for patch we need to put only the fields/properties that we want to update
//like for example, in "completed" property we can use patch to change it to true
module.exports = router;
