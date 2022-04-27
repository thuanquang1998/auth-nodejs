import createError from "http-errors";
import mailService from "./mail.service.js";
import Joi from "joi";

const sendMail = async (req, res, next) => {
  try {
    const { toEmail, subject, content } = req.body;
    // validate
    // service
    await mailService.sendMail(toEmail, subject, content);
    // return
    res.send("<h3>Your email has been sent successfully.</h3>");
  } catch (error) {
    next(error);
  }
};

export default { sendMail };
