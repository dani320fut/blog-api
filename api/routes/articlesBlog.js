module.exports = (app) => {
  const {
    getAllArticlesController,
    getArticlesBySearchController,
    getArticlesByPathController,
  } = app.controllers.articlesBlog;

  app.route("/api/articles").get(getAllArticlesController);
  app.route("/api/articles/search").get(getArticlesBySearchController);
  app.route("/api/articles/path").get(getArticlesByPathController);
};
