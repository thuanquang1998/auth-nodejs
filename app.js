import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import createError from "http-errors";
import asyncBusboy from "async-busboy";

import PostRoute from "./src/api/v1/routes/Post.route.js";
import UserRoute from "./src/api/v1/routes/User.route.js";
import AuthSpotifyRoute from "./src/api/v1/routes/AuthSpotify.route.js";

import UploadRoute from "./src/api/v2/upload/upload.route.js";
import MailerRoute from "./src/api/v2/mail/mail.route.js";

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve(path.dirname(""));
const route = express.Router();
const URI =
  "mongodb+srv://admin:thuanquang0201@mernblog.kevgs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/views/index.html");
});

// version 1
app.use("/posts", PostRoute);
app.use("/user", UserRoute);
app.use("/authSpotify", AuthSpotifyRoute);

// version 2
app.use("/upload", UploadRoute);
app.use("/mail", MailerRoute);

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

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to db");
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  })
  .catch((err) => console.log("err :>> ", err));
