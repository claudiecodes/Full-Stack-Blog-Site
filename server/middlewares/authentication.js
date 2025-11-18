const jwt = require("jsonwebtoken");
const { verifyToken } = require("../helper/jwt");

function authentication(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw { name: "InvalidToken" };
    }

    const access_token = authorization.split(" ")[1];

    const payload = verifyToken(access_token);

    req.info = {
      userId: payload.id,
      name: payload.name,
      email: payload.email,
    };

    next();
  } catch (error) {
    throw error;
  }
}

module.exports = authentication;
