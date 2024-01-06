const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const app = express();
const mongoose = require("mongoose");
const Task = require("./models/taskModel");
const taskRoute = require("./routes/taskRoute");
const cors = require("cors");
//Middleware
app.use(cors(
  {
    origin:["http://localhost:3000"]
  }
))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/tasks", taskRoute);


//Route
app.get("/", (req, res) => {
  res.send("Home page");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();

//2nd way
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });
