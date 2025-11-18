const { User, Post } = require("../models");
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

  static postByAuthorId = async (req, res) => {
    try {
      const {userId} = req.info
      const blog = await Post.findAll({where:{userId},  include: {
          model: User,
          attributes: ["name"],
        }});

      res.status(200).json(blog);
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = userController;
