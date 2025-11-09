"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {

    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: "userId" , onDelete: "cascade"});

    }
  }
  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "title is required",
          },
          notNull: {
            msg: "title is required",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "description is required",
          },
          notNull: "description is required",
        },
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
