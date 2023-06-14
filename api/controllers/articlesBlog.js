const {
  getAllArticlesService,
  getArticlesBySearchService,
  getArticlesByPathIdentificationService,
} = require("../services/articlesBlog");

const getAllArticles = async (req, res) => {
  const articles = await getAllArticlesService();

  return res.status(200).json(articles);
};

const getArticlesBySearch = async (req, res) => {
  const articles = await getArticlesBySearchService(req.query.search);

  return res.status(200).json(articles);
};

const getArticlesByPath = async (req, res) => {
  const articles = await getArticlesByPathIdentificationService(req.query.path);

  return res.status(200).json(articles);
};

module.exports = {
  getAllArticlesController: getAllArticles,
  getArticlesBySearchController: getArticlesBySearch,
  getArticlesByPathController: getArticlesByPath,
};
