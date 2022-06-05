//index.js
const express = require("express");
const home = require("./src/Controller/home");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const { mysqlConnection } = require("./config-mysql");

mysqlConnection();

const { Model } = require("objection");
var conn = {
  host: "0.0.0.0",
  port: "32769",
  user: "root",
  password: "root",
  database: "tax",
};
const db = require("knex")({
  client: "mysql",
  connection: conn,
});
Model.knex(db);

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./src/view");

app.use("/", home);

app.listen(port, () => {
  console.log(`Server listening on port ${port} link http://localhost:${port}`);
});
