import config from "config";
/* eslint-disable prefer-const */
import { Options, Sequelize } from "sequelize";

import { initModels } from "./model/init-models";

const { dialect, host, database, username, password } = config.get("db");

let dbClient: Sequelize;

const connectionOptions: Options = {
  dialect,
  host,
  database,
  username,
  password,
  logging: (message) => console.log(message),
};
if (process.env.NODE_ENV === "production") connectionOptions.logging = false;
dbClient = new Sequelize(connectionOptions);

initModels(dbClient);

// dbClient.sync({ force: true })

export default dbClient;
