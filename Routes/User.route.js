const express = require("express");
const route = express.Router();
const createError = require("http-errors");

const User = require("../Models/User.model");
const { userValidate } = require("../helpers/validation");
const {
  signAccessToken,
  verifyAccessToken,
} = require("../helpers/jwt_service");

route.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // if (!email || !password) {
    //   throw createError.BadRequest();
    // }
    const { error } = await userValidate(req.body);

    if (error) {
      throw createError(error.details[0].message);
    }

    const isExists = await User.findOne({
      username: email,
    });

    if (isExists) {
      throw createError.Conflict(`${email} is ready been register`);
    }

    // const isCreate = await User.create({
    //   username: email,
    //   password: password,
    // });

    const user = new User({ username: email, password });

    const savedUser = await user.save();

    return res.json({
      status: "okay",
      elements: savedUser,
    });
  } catch (error) {
    next(error);
  }
});

route.post("/refresh-token", (req, res, next) => {
  res.send("function refresh-token");
});

route.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = await userValidate(req.body);

    if (error) {
      throw createError(error.details[0].message);
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw createError.NotFound("User not registered");
    }

    const isValid = await user.isCheckedPassword(password);

    if (!isValid) {
      throw createError.Unauthorized();
    }

    const accessToken = await signAccessToken(user._id);

    res.json({
      accessToken,
    });

    // res.send(user);
  } catch (error) {
    next(error);
  }
});

route.post("/logout", (req, res, next) => {
  res.send("function logout");
});

route.get("/list-user", verifyAccessToken, async (req, res, next) => {
  console.log("00000000  ", req.headers);
  try {
    const listUser = [
      {
        id: 1,
        name: "Name1",
      },
      {
        id: 2,
        name: "Name2",
      },
    ];
    res.json({ listUser });
  } catch (error) {}
});

module.exports = route;
