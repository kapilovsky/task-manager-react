import { BiEditAlt } from "react-icons/bi";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { IoIosTrash } from "react-icons/io";

const Task = ({ task, index, deleteTask, getSingleTask, completeTask }) => {
  return (
    <div className={task.completed ? "task completed" : "task"}>
      <p>
        <span className="list-numbers">
          <b>{index + 1}. </b>
        </span>
        {task.name}
      </p>
      <div className="task-icons">
        <IoCheckmarkDoneOutline
          color="#486d98"
          size="1.5em"
          onClick={() => completeTask(task)}
        />
        <BiEditAlt
          color="#486d98"
          size="1.5em"
          onClick={() => getSingleTask(task)}
        />
        <IoIosTrash
          color="#486d98"
          size="1.5em"
          onClick={() => deleteTask(task._id)}
        />
      </div>
    </div>
  );
};

export default Task;
