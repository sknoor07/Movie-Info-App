import { Client, ID, Query, TablesDB } from "appwrite";

const database_id = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const project_id = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const table_id = import.meta.env.VITE_APPWRITE_TABLE_ID;

const client = new Client()
  .setEndpoint("https://sgp.cloud.appwrite.io/v1")
  .setProject(project_id);

const tablesDB = new TablesDB(client);

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    const result = await tablesDB.listRows({
      databaseId: database_id,
      tableId: table_id,
      queries: [Query.equal("searchTerm", searchTerm)],
    });
    if (result.rows.length > 0) {
      await tablesDB.updateRow({
        databaseId: database_id,
        tableId: table_id,
        rowId: result.rows[0].$id,
        data: {
          count: result.rows[0].count + 1,
        },
      });
    } else {
      await tablesDB.createRow({
        databaseId: database_id,
        tableId: table_id,
        rowId: ID.unique(),
        data: {
          searchTerm: searchTerm,
          count: 1,
          movie_id: String(movie.id),
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        },
      });
    }
  } catch (e) {
    console.log("Error Updating Trending Movies to Database: " + e);
  }
};

export const getTrendingMovies = async () => {
  try {
    const result = await tablesDB.listRows({
      databaseId: database_id,
      tableId: table_id,
      queries: [Query.limit(5), Query.orderDesc("count")],
    });
    return result.rows;
  } catch (e) {
    console.log("Error Getting Trending Movies from Database: " + e);
    return [];
  }
};
