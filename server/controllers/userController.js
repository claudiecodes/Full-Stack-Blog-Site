const { User } = require("../models");
const jwt = require("jsonwebtoken");

class userController {
  static read = async (req, res) => {
    try {
      const users = await User.findAll();

      res.status(200).json(users);
    } catch (error) {
      console.log(error);
    }
  };

  static delete = async (req, res) => {
    try {
      const { email } = req.info;
      const foundUser = await User.destroy({ where: { email } });

      res.status(200).json({
        message: "Account successfully deleted",
        foundUser,
      });
    } catch (error) {
      throw error;
    }
  };
}

module.exports = userController;
