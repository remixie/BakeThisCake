/* eslint-disable no-console */

const { resolve } = require("path");

const {
  URI,
  DEBUG = false,
  HOST = "mongo",
  PORT = "27017",
  DATABASE = "cake",
  DROP_DATABASE = false,
  DROP_COLLECTIONS = false
} = process.env;

if (DEBUG) {
  process.env.DEBUG = "mongo-seeding";
}

const { Seeder } = require("mongo-seeding");

const database = URI ? URI : `mongodb://${HOST}:${PORT}/${DATABASE}`;

const seeder = new Seeder({
  database,
  dropDatabase: DROP_DATABASE,
  dropCollections: DROP_COLLECTIONS
});

(async function() {
  try {
    const collections = seeder.readCollectionsFromPath(
      resolve(__dirname, "../db/seeds")
    );

    await seeder.import(collections);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
})();
