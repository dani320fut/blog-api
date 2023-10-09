const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const consign = require("consign");
const cors = require("cors");
console.log(
  "🚀 ~ file: express.js:4 ~ config:",
  config.get("server.port" || 8080)
);

module.exports = () => {
  const app = express();
  app.use(cors());

  app.set("port", config.get("server.port"));

  app.use(bodyParser.json());

  consign({ cwd: "api" }).then("controllers", "routes").into(app);

  require("../api/routes/articlesBlog")(app);

  return app;
};
