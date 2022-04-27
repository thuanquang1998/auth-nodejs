import express from "express";
const route = express.Router();

route.get("/", (req, res, next) => {
  console.log("upload file");
  res.status(200).json({
    success: true,
    msg: "upload file success",
  });
});

export default route;
