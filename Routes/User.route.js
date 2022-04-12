const express = require("express");
const route = express.Router();
const { verifyAccessToken } = require("../helpers/jwt_service");
const UserController = require("../Controllers/User.controller");

route.post("/register", UserController.register);

route.post("/refresh-token", UserController.refreshToken);

route.post("/login", UserController.login);

route.delete("/logout", UserController.logout);

route.get("/list-user", verifyAccessToken, UserController.listUser);

route.get("/insta-info", UserController.instaInfo);

module.exports = route;
