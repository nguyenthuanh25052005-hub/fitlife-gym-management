const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbPath = process.env.DB_PATH || path.join(__dirname, "../database/fitlife.sqlite");

function connectDatabase() {
  return new sqlite3.Database(dbPath, (error) => {
    if (error) {
      console.error("Database connection failed:", error.message);
      return;
    }

    console.log("Connected to SQLite database");
  });
}

module.exports = {
  dbPath,
  connectDatabase
};