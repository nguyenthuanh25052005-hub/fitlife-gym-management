require("dotenv").config();

const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const databaseDir = __dirname;
const databasePath = process.env.DB_PATH || path.join(databaseDir, "fitlife.sqlite");
const schemaPath = path.join(databaseDir, "schema.sql");

if (!fs.existsSync(databaseDir)) {
  fs.mkdirSync(databaseDir, { recursive: true });
}

const schema = fs.readFileSync(schemaPath, "utf8");

const db = new sqlite3.Database(databasePath, (error) => {
  if (error) {
    console.error("Failed to open database:", error.message);
    process.exit(1);
  }
});

db.exec(schema, (error) => {
  if (error) {
    console.error("Failed to initialize database:", error.message);
    db.close();
    process.exit(1);
  }

  console.log("Database initialized successfully");
  console.log(`Database file: ${databasePath}`);

  db.close();
});