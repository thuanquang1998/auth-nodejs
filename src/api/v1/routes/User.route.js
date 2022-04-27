import express from "express";
import {
  register,
  refreshToken,
  login,
  logout,
  listUser,
} from "../controllers/User.controller.js";
import { verifyAccessToken } from "../helpers/jwt_service.js";
const route = express.Router();

route.post("/register", register);

route.post("/refresh-token", refreshToken);

route.post("/login", login);

route.delete("/logout", logout);

route.get("/list-user", verifyAccessToken, listUser);

// module.exports = route;
export default route;
