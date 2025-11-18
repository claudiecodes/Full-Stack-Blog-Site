const { User, Post } = require("../models");

async function authorization(req, res, next) {
  try {
    const { userId } = req.info;
    const {postId} = req.params

    if (!userId) {
      throw { name: "InvalidToken" };
    }
    
    
    const foundBlog = await Post.findOne({ where: { id: postId } });
    
    const authorId = foundBlog.dataValues.userId
    console.log(authorId, "<<<auth");


   

    if (!foundBlog) {
      throw { name: "NotFound" };
    }

    if (authorId !== userId) {
      throw { name: "Unauthorized" };
    }

    next();
  } catch (error) {
    throw error;
  }
}

module.exports = authorization;
