const JWT = require("jsonwebtoken");
require("dotenv").config();

const signAccessToken = async () => {
  const payload = {
    userId: 1,
    name: "Name1",
  };

  const token = await JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });
  return token;
};

const signRefreshToken = async () => {
  const payload = {
    userId: 1,
    name: "Name1",
  };

  const token = await JWT.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

const signRefreshToken = async (req, res, next) => {
  return res.status(200).json({
    code: 401,
    msg: "Invalid Token",
  });
};
