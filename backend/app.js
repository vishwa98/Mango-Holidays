const express = require("express");
const path = require("path");

const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const adminCategoryRoutes = require("./routes/categoryAdmin");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const roomRoutes = require("./routes/room");

const app = express();

// import custom routes
const ApiRoutes = require("./routes");

// get the environment variables for the port and for the production state
const port = process.env.PORT || 5001;
const isProduction = process.env.PRODUCTION || false;

// adding middleware

// middleware to read and response with json
app.use(express.json());

// middleware to allow cross origin access to the server
app.use(cors());

app.use("/api", ApiRoutes);

// db
mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

// db
mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));

/* app.use("/api", ApiRoutes); */

// routes middleware
app.use("/api/categories", adminCategoryRoutes);
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", roomRoutes);

if (isProduction) {
  // middleware to host the react built page
  app.use(express.static(path.join(__dirname, "../", "build/")));
  // home page route
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "build/"));
  });
} else {
  // redirect the home page route to the react dev server during production
  app.get("/", function (req, res) {
    res.redirect(`http://localhost:${process.env.PORT}/`);
  });
}

// listening to events
app.listen(port, (err) => {
  if (err) {
    console.log("Error when serving the app: ", err);
  }

  console.log(`Server is listening on port ${port} @ http://localhost:${port}`);
});
