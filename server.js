const express = require("express");
const app = express();
const createError = require("http-errors");
const UserRoute = require("./Routes/User.route");
// const { signAccessToken, signRefreshToken } = require("./helpers//init_jwt");

require("dotenv").config();
require("./helpers/connections_mongodb");
const client = require("./helpers/connections_redis");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// app.get("/api/login", async (req, res) => {
//   return res.status(200).json({
//     status: "success",
//     elements: {
//       // token: "accessToken",
//       // timeExpired: Date.now() + 60 * 1000,
//       accessToken: await signAccessToken(),
//       refreshToken: await signRefreshToken(),
//     },
//   });
// });

// app.get("/api/refreshToken", (req, res) => {
//   return res.status(200).json({
//     status: "success",
//     elements: {
//       token: "newAccessToken",
//       timeExpired: Date.now() + 60 * 1000,
//     },
//   });
// });

// app.get("/api/users", (req, res) => {
//   return res.status(200).json({
//     status: "success",
//     users: [{ name: "Name1" }, { name: "Name2" }],
//   });
// });

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
  console.log(`Server running on ${PORT}`);
});
