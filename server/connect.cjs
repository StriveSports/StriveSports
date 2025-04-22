// server/connect.cjs
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

const connectionString = process.env.ATLAS_URL;
const client = new MongoClient(connectionString);

async function connectToDB() {
  await client.connect();
  const db = client.db("StriveSports");
  return db;
}

module.exports = connectToDB;
