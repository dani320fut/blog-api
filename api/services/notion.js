// const { Client } = require("@notionhq/client");

require("dotenv").config();

const auth = process.env.NOTION_SECRET;
const database_id = process.env.DATABASE_ID;

const getAllArticlesNotion = async (pageSize) => {
  try {
    // const notion = new Client({
    //   auth,
    // });

    const fetchPages = await notion.databases.query({
      database_id,
      page_size: pageSize,
      filter: {
        property: "status",
        status: {
          equals: "Done",
        },
      },
    });

    return {
      success: true,
      error: null,
      articles: fetchPages?.results,
    };
  } catch (err) {
    return { success: false, error: err, articles: [] };
  }
};

const getArticlesBySearch = async (searchText) => {
  try {
    // const notion = new Client({
    //   auth,
    // });

    const fetchPages = await notion.databases.query({
      database_id,
      filter: {
        and: [
          {
            property: "status",
            status: {
              equals: "Done",
            },
          },
          {
            property: "title",
            rich_text: {
              contains: searchText,
            },
          },
        ],
      },
    });

    return {
      success: true,
      error: null,
      articles: fetchPages?.results,
    };
  } catch (err) {
    return { success: false, error: err, articles: [] };
  }
};

const getArticlesByPathIdentification = async (path) => {
  try {
    // const notion = new Client({
    //   auth,
    // });

    const fetchPages = await notion.databases.query({
      database_id,
      filter: {
        and: [
          {
            property: "status",
            status: {
              equals: "Done",
            },
          },
          {
            property: "pathIdentification",
            rich_text: {
              equals: path,
            },
          },
        ],
      },
    });

    return {
      success: true,
      error: null,
      articles: fetchPages?.results,
    };
  } catch (err) {
    return { success: false, error: err, articles: [] };
  }
};

module.exports = {
  getAllArticlesNotionService: getAllArticlesNotion,
  getArticlesNotionBySearchService: getArticlesBySearch,
  getArticlesNotionByPathIdentificationService: getArticlesByPathIdentification,
};
