const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const router = require("./routers");
const errorHandler = require("./middlewares/errorHandler");
const cors = require ("cors")

const port = process.env.PORT;

app.use(cors())
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.use(errorHandler)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
