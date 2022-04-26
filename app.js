import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import PostRoute from "./src/api/routes/Post.route.js";
import UserRoute from "./src/api/routes/User.route.js";
import AuthSpotifyRoute from "./src/api/routes/AuthSpotify.route.js";

const app = express();
const PORT = process.env.PORT || 5000;

const URI =
  "mongodb+srv://admin:thuanquang0201@mernblog.kevgs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());

app.use("/posts", PostRoute);
app.use("/user", UserRoute);
app.use("/authSpotify", AuthSpotifyRoute);

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to db");
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  })
  .catch((err) => console.log("err :>> ", err));
