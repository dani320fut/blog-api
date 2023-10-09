const app = require("./config/express")();
const port = app.get("port");

app.listen(process.env.PORT || port, () => {
  console.log(`rodando na porta ${process.env.PORT || port}`);
});
