const createError = require("http-errors");

const User = require("../Models/User.model");
const { userValidate } = require("../helpers/validation");
const {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../helpers/jwt_service");
const client = require("../helpers/connections_redis");
const yourSessionId = "49601292461%3A0Cu9SNfyRxFPRt%3A28";

const Insta = require("scraper-instagram");
const InstaClient = new Insta();

InstaClient.authBySessionId(yourSessionId)
  .then((account) => console.log("Auth successful"))
  .catch((err) => console.error(err));

module.exports = {
  register: async (req, res, next) => {
    try {
      const { email, password } = req.body;

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

      const user = new User({ username: email, password });

      const savedUser = await user.save("");

      return res.json({
        status: "okay",
        elements: savedUser,
      });
    } catch (error) {
      next(error);
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      console.log(req.body);
      const { refreshToken } = req.body;
      if (!refreshToken) throw createError.BadRequest();

      const { userId } = await verifyRefreshToken(refreshToken);
      const accessToken = await signAccessToken(userId);
      const refToken = await signRefreshToken(userId);
      res.json({ accessToken, refreshToken: refToken });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    console.log("mmmmmmmmmmmmmmm");
    try {
      const { email, password } = req.body;
      const { error } = await userValidate(req.body);
      if (error) {
        throw createError(error.details[0].message);
      }
      const user = await User.findOne({ username: email });
      if (!user) {
        throw createError.NotFound("User not registered");
      }

      const isValid = await user.isCheckedPassword(password);

      if (!isValid) {
        throw createError.Unauthorized();
      }

      const accessToken = await signAccessToken(user._id);
      const refreshToken = await signRefreshToken(user._id);

      res.json({
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  },

  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        throw createError.BadRequest();
      }
      const { userId } = await verifyRefreshToken(refreshToken);
      client.del(userId.toString(), (err, reply) => {
        if (err) {
          throw createError.InternalServerError();
        }
        res.json({
          message: "Logout",
        });
      });
    } catch (error) {
      next(error);
    }
  },

  listUser: async (req, res, next) => {
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
  },

  instaInfo: async (req, res, next) => {
    try {
      let data;
      console.log("00000000000000000000000");
      const username = "cristiano";
      // InstaClient.authBySessionId(yourSessionId)
      //   .then((account) => console.log("account   ::: "))
      //   .catch((err) => console.error(err));

      InstaClient.getProfile(username)
        .then((profile) =>
          res.json({
            success: "true",
            profile: [...profile?.lastPosts],
          })
        )
        .catch((err) => console.error("error ::: ", err));
    } catch (error) {}
  },
};
