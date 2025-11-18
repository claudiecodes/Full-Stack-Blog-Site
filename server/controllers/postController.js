const { Post } = require("../models");
const { User } = require("../models");

class postController {
  static read = async (_req, res) => {
    try {
      const blogs = await Post.findAll({ order: [["createdAt", "DESC"]] });

      res.status(200).json(blogs);
    } catch (error) {
      console.log(error);
    }
  };

  static create = async (req, res) => {
    try {
      const { title, description } = req.body;

      const userId = req.info.userId;

      const newPost = await Post.create({ title, description, userId });

      res
        .status(201)
        .json({ message: "Successfully create a new blog!", newPost });
    } catch (error) {
      throw error;
    }
  };

  static update = async (req, res) => {
    try {
      const { postId } = req.params;
      const { title, description } = req.body;

      await Post.update(
        {
          title,
          description,
        },
        { where: { id: postId } }
      );

      const updatedPost = await Post.findOne({ where: { id: postId } });

      res
        .status(200)
        .json({ message: "Successfully update blog!", updatedPost });
    } catch (error) {
      throw error;
    }
  };

  static delete = async (req, res) => {
    try {
      
      const { postId } = req.params;

      const deletedPost = await Post.findOne({ where: { id: postId } });

      await Post.destroy({ where: { id: postId } });

      res.status(200).json({
        message: "Successfully delete blog",
        deletedPost,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static detailById = async (req, res) => {
    try {
      const { postId } = req.params;
      const foundBlog = await Post.findOne({
        where: { id: postId },
        include: {
          model: User,
          attributes: ["name"],
        },
      });

      res.status(200).json(foundBlog);
    } catch (error) {
      console.log(error);
    }
  };

 
}

module.exports = postController;
