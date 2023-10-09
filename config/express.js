const express = require("express");
const bodyParser = require("body-parser");
const consign = require("consign");
const cors = require("cors");

module.exports = () => {
  const app = express();
  app.use(cors());

  app.set("port", 8080);

  app.use(bodyParser.json());

  consign({ cwd: "api" }).then("controllers").then("routes").into(app);

  require("../api/routes/articlesBlog")(app);

  return app;
};
