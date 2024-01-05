const dotenv = require("dotenv").config();
const express = require("express");
const connectDB = require("./config/connectDB");
const app = express();
const mongoose = require("mongoose");
const Task = require("./models/taskModel");
const taskRoute = require("./routes/taskRoute");

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(taskRoute);
//Route
app.get("/", (req, res) => {
  res.send("Home page");
});

const PORT = process.env.PORT || 3000;

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
