import express from "express";
const route = express.Router();

route.post("/get-all", (req, res, next) => {
  res.send("Get all product");
});

export default route;
