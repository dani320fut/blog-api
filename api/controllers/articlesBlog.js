const {
  getAllArticlesService,
  getArticlesBySearchService,
  getArticlesByPathIdentificationService,
} = require("../services/articlesBlog.js");
const { teste } = require("../services/notion.js");
// teste
// novo teste

const getAllArticles = async (req, res) => {
  const { pageSize = 10 } = req.query;

  const articles = await getAllArticlesService(Number(pageSize));

  return res.status(200).json(articles);
};

const getArticlesBySearch = async (req, res) => {
  const { search = "", pageSize = 10, page = 1 } = req.query;

  const articles = await getArticlesBySearchService(
    search,
    Number(pageSize),
    Number(page)
  );

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
