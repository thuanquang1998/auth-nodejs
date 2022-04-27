import express from "express";
import mailController from "./mail.controller.js";
const route = express.Router();

route.post("/send-email", mailController.sendMail);

export default route;
