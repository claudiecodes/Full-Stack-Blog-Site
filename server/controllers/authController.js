const { signToken } = require("../helper/jwt");
const { User } = require("../models");
const { comparePass } = require("../helper/bcrypt");

class authController {
  static register = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const newUser = await User.create({ name, email, password });

      delete newUser.dataValues.password;

      res.status(201).json({
        message: "User registered successfully",
        user: newUser,
      });
    } catch (error) {
      throw error;
    }
  };
  static login = async (req, res) => {
    try {
      const { email, password } = req.body;

      const foundUser = await User.findOne({ where: { email } });

      if (!foundUser) {
        throw {
          name: "InvalidLogin",
        };
      }

      const foundPass = comparePass(password, foundUser.password);

      if (!foundPass) {
        throw {
          name: "InvalidLogin",
        };
      }

      const access_token = signToken({
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
      });

      res.status(200).json({
        message: "Successfully login",
        access_token,
      });
    } catch (error) {
      throw error;
    }
  };
}

module.exports = authController;
