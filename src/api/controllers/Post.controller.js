import { PostModel } from "../models/Post.model.js";
import { ObjectId } from "mongodb";
export const getPosts = async (req, res, next) => {
  try {
    const posts = await PostModel.find();
    console.log("posts[0]._id :>> ", posts[0]._id);
    setTimeout(() => {
      res.status(200).json(posts);
    }, 300);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getPostDetail = async (req, res, next) => {
  try {
    var _id = new ObjectId(req.params.id);
    const posts = await PostModel.findById(_id);
    setTimeout(() => {
      res.status(200).json(posts);
    }, 300);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createPosts = async (req, res) => {
  try {
    const newPost = req.body;
    const post = new PostModel(newPost);
    await post.save();
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updatePosts = async (req, res) => {
  try {
    const updatePost = req.body;

    const post = await PostModel.findOneAndUpdate(
      { _id: updatePost._id },
      updatePost,
      { new: true }
    );

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ error });
  }
};
