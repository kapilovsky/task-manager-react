import TaskForm from "./TaskForm";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Task from "./Task";
import axios from "axios";
import loader from "../assets/reload-cat.gif";

const SERVER_URL = "http://localhost:5000";
const API_ENDPOINT = "/api/tasks";
const apiUrl = `${SERVER_URL}${API_ENDPOINT}`;

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [isEditing, setisEditing] = useState(false);
  const [editId, seteditId] = useState("");
  const [formData, setformData] = useState({
    name: "",
    completed: false,
  });

  const { name } = formData;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setformData({ ...formData, [name]: value });
  };

  const getTasks = async () => {
    setisLoading(true);
    try {
      const { data } = await axios.get(`${apiUrl}`);
      console.log(data);
      setTasks(data);
      setisLoading(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setisLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const createTask = async (event) => {
    event.preventDefault();
    if (name === "") {
      return toast.error("Please enter a task", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: {
          fontFamily: "Helvetica", // Replace with your desired font
          fontSize: "14px",
        },
      });
    }
    try {
      await axios.post(`${apiUrl}`, formData);
      toast.success("Task created successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: {
          fontFamily: "Helvetica", // Replace with your desired font
          fontSize: "14px",
        },
      });
      setformData({ ...formData, name: "" });
      getTasks();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getSingleTask = async (task) => {
    setformData({ name: task.name, completed: false });
    setisEditing(true);
    seteditId(task._id);
  };

  const updateTask = async (event) => {
    event.preventDefault();
    if (name === "") {
      return toast.error("Please enter a task");
    }
    try {
      await axios.put(`${apiUrl}/${editId}`, formData);
      getTasks();
      setformData({ ...formData, name: "" });
      setisEditing(false);
      getTasks();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const completeTask = async (task) => {
    const updatedTask = { name: task.name, completed: true };
    try {
      await axios.put(`${apiUrl}/${task._id}`, updatedTask);
      getTasks();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    const cTask = tasks.filter((task) => {
      return task.completed === true;
    });
    setCompletedTasks(cTask);
  }, [tasks]);

  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        name={name}
        handleInputChange={handleInputChange}
        createTask={createTask}
        isEditing={isEditing}
        updateTask={updateTask}
      />
      {tasks.length > 0 && (
        <div className="--flex-between --pb">
          <p>
            <b>Total Tasks: </b>
            {tasks.length}
          </p>
          <p>
            <b>Completed Tasks: </b>
            {completedTasks.length}
          </p>
        </div>
      )}

      {isLoading && (
        <div className="--flex-center">
          <img src={loader} alt="loading" />
        </div>
      )}
      {!isLoading && tasks.length === 0 ? (
        <p className="--py">No tasks found</p>
      ) : (
        <>
          {tasks.map((task, index) => {
            return (
              <Task
                key={task._id}
                task={task}
                index={index}
                deleteTask={deleteTask}
                getSingleTask={getSingleTask}
                completeTask={completeTask}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default TaskList;
