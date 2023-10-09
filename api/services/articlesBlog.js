const { teste } = require("./notion.js");

const transformArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

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

const getAllArticles = async (pageSize, page) => {
  // const { articles = [] } = await getAllArticlesNotionService(pageSize);
  const articles = [];
  const articlesFormatted = formatArticles(articles);

  return articlesFormatted;
};

const getArticlesBySearch = async (searchText, pageSize, page) => {
  let articlesFormatted = [];
  let foundedBySeach = false;

  if (searchText) {
    // const { articles = [] } = await getArticlesNotionBySearchService(
    //   searchText
    // );
    const articles = [];

    foundedBySeach = articles?.length > 0;

    articlesFormatted = foundedBySeach
      ? formatArticles(articles)
      : await getAllArticles();
  } else {
    articlesFormatted = await getAllArticles();
  }

  const articlesArray = await transformArray(articlesFormatted, pageSize);

  return { foundedBySeach: foundedBySeach, articles: articlesArray };
};

const getArticlesByPathIdentification = async (path) => {
  // const { articles = [] } = await getArticlesNotionByPathIdentificationService(
  //   path
  // );
  const articles = [];

  const articlesFormatted = formatArticles(articles);

  return articlesFormatted[0];
};

module.exports = {
  getAllArticlesService: getAllArticles,
  getArticlesBySearchService: getArticlesBySearch,
  getArticlesByPathIdentificationService: getArticlesByPathIdentification,
};
