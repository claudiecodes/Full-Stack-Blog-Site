function errorHandler(error, req, res, next) {
    console.log(error, "<<<< di errorhandler")

  let status = 500;
  let message = "Internal server error";

  if (error.name == "InvalidLogin") {
    status = 400;
    message = "Sorry, invalid email or password";
  }

  if (error.name == "SequelizeUniqueConstraintError"){
    status = 400;
    message = "Email must be unique"
  }

  if(error.name == "InvalidToken"){
    status = 400;
    message = "Please login first"
  }

  if(error.name == "NotFound"){
    status = 404;
    message = "Data not found"
  }

  if(error.name == "Unauthorized"){
    status = 403;
    message = "You are unauthorized"
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;
