const {
  getAllArticlesNotionService,
  getArticlesNotionBySearchService,
  getArticlesNotionByPathIdentificationService,
} = require("../services/notion");

const formatArticles = (articlesArray) => {
  return (
    articlesArray?.map(({ properties }) => {
      return {
        title: properties?.title[properties?.title?.type][0]?.text?.content,
        subtitle:
          properties?.subtitle[properties?.subtitle?.type][0]?.text?.content,
        description:
          properties?.description[properties?.description?.type][0]?.text
            ?.content,
        area: properties?.area[properties?.area?.type][0]?.text?.content,
        symptoms: properties?.symptoms[properties?.symptoms?.type]?.map(
          (symptom) => symptom.name
        ),
        tips: properties?.tips[properties?.tips?.type]?.map((tip) => tip.name),
        tags: properties?.Tags[properties?.Tags?.type]?.map((tag) => tag.name),
        pathIdentification:
          properties?.pathIdentification[
            properties?.pathIdentification?.type
          ][0]?.text?.content,
        name: properties?.name[properties?.name?.type][0]?.text?.content,
        image: properties?.image[properties?.image?.type][0]?.file?.url,
        // headache artigo principal
        isMainArticle:
          properties?.pathIdentification[
            properties?.pathIdentification?.type
          ][0]?.text?.content === "headache",
      };
    }) ?? []
  );
};

const getAllArticles = async () => {
  const { articles = [] } = await getAllArticlesNotionService();

  const articlesFormatted = formatArticles(articles);

  return articlesFormatted;
};

const getArticlesBySearch = async (searchText) => {
  const { articles = [] } = await getArticlesNotionBySearchService(searchText);

  const articlesFormatted = formatArticles(articles);

  return articlesFormatted;
};

const getArticlesByPathIdentification = async (path) => {
  const { articles = [] } = await getArticlesNotionByPathIdentificationService(
    path
  );

  const articlesFormatted = formatArticles(articles);

  return articlesFormatted;
};

module.exports = {
  getAllArticlesService: getAllArticles,
  getArticlesBySearchService: getArticlesBySearch,
  getArticlesByPathIdentificationService: getArticlesByPathIdentification,
};
