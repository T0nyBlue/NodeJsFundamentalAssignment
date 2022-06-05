//index.js
const express = require("express");
const home = require("./src/Controller/home");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const { mongodbConection } = require("./config-mongodb");

mongodbConection();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./src/view");

app.use("/", home);

app.listen(port, () => {
  console.log(`Server listening on port ${port} link http://localhost:${port}`);
});
