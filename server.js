const app = require("./config/express")();
const port = app.get("port");

app.listen(process.env.PORT || port, () => {
  console.log(`rodando na porta ${process.env.PORT || port}`);
});

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});
