import express from "express";
import {
  getPosts,
  getPostDetail,
  createPosts,
  updatePosts,
} from "../Controllers/Post.controller.js";
const route = express.Router();

route.get("/", getPosts);

route.get("/:id", getPostDetail);

route.post("/create", createPosts);

route.post("/update", updatePosts);

export default route;
