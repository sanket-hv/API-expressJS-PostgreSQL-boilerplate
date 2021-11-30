import dbClient from "../db/index";

export const checkDbConnection = async () => {
  try {
    await dbClient.authenticate();
    console.log("connection has been established to database successfully");
  } catch (error) {
    console.error("unable to connect to the database:", error);
    throw error;
  }
};
