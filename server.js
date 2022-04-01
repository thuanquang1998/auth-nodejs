const express = require("express");
const app = express();
const createError = require("http-errors");
const UserRoute = require("./Routes/User.route");

require("dotenv").config();
require("./helpers/connections_mongodb");

app.get("/", (req, res) => {
  res.send("Home page");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route
app.use("/user", UserRoute);

//middlewares
app.use((req, res, next) => {
  next(createError.notFound("This route does not exist."));
});

app.use((err, req, res, next) => {
  res.json({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, (req, res) => {
  console.log(`Server running on ${PORT}`);
});
