// server/connect.cjs
// this helper connects to MongoDB and returns both db and client
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

const connectionString = process.env.ATLAS_URL;
const client = new MongoClient(connectionString);

async function connectToDB() {
  await client.connect();
  return {
    db: client.db("StriveSports"),
    client
  };
}

module.exports = connectToDB;
