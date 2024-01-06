import TaskList from "./components/TaskList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// require('dotenv').config();


// export const URL = process.env.SERVER_URL;

function App() {
  return (
    <div className="app">
      <div className="task-container">
        <TaskList />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
