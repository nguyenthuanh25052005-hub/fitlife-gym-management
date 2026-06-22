require("dotenv").config();

const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");

const databasePath = process.env.DB_PATH || path.join(__dirname, "fitlife.sqlite");

const db = new sqlite3.Database(databasePath, (error) => {
  if (error) {
    console.error("Failed to open database:", error.message);
    process.exit(1);
  }
});

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(error) {
      if (error) {
        reject(error);
        return;
      }

      resolve(this);
    });
  });
}

async function seed() {
  try {
    await run("PRAGMA foreign_keys = OFF");

    await run("DELETE FROM payments");
    await run("DELETE FROM workout_schedules");
    await run("DELETE FROM trainers");
    await run("DELETE FROM memberships");
    await run("DELETE FROM membership_plans");
    await run("DELETE FROM users");

    await run("DELETE FROM sqlite_sequence WHERE name IN ('payments', 'workout_schedules', 'trainers', 'memberships', 'membership_plans', 'users')");

    await run("PRAGMA foreign_keys = ON");

    const passwordHash = await bcrypt.hash("123456", 10);

    const admin = await run(
      "INSERT INTO users (full_name, email, password_hash, role, phone) VALUES (?, ?, ?, ?, ?)",
      ["Admin FitLife", "admin@fitlife.com", passwordHash, "admin", "0900000001"]
    );

    const trainer1 = await run(
      "INSERT INTO users (full_name, email, password_hash, role, phone) VALUES (?, ?, ?, ?, ?)",
      ["Trainer One", "trainer1@fitlife.com", passwordHash, "trainer", "0900000002"]
    );

    const trainer2 = await run(
      "INSERT INTO users (full_name, email, password_hash, role, phone) VALUES (?, ?, ?, ?, ?)",
      ["Trainer Two", "trainer2@fitlife.com", passwordHash, "trainer", "0900000003"]
    );

    const member = await run(
      "INSERT INTO users (full_name, email, password_hash, role, phone) VALUES (?, ?, ?, ?, ?)",
      ["Member One", "member1@fitlife.com", passwordHash, "member", "0900000004"]
    );

    await run(
      "INSERT INTO trainers (user_id, specialization, experience_years, bio) VALUES (?, ?, ?, ?)",
      [trainer1.lastID, "Strength Training", 3, "Trainer specializing in strength and muscle gain."]
    );

    await run(
      "INSERT INTO trainers (user_id, specialization, experience_years, bio) VALUES (?, ?, ?, ?)",
      [trainer2.lastID, "Cardio and Weight Loss", 4, "Trainer specializing in cardio and weight loss programs."]
    );

    await run(
      "INSERT INTO membership_plans (name, price, duration_days, description, status) VALUES (?, ?, ?, ?, ?)",
      ["Basic", 200000, 30, "Basic gym access for 30 days.", "active"]
    );

    await run(
      "INSERT INTO membership_plans (name, price, duration_days, description, status) VALUES (?, ?, ?, ?, ?)",
      ["Standard", 350000, 30, "Gym access with limited trainer support.", "active"]
    );

    await run(
      "INSERT INTO membership_plans (name, price, duration_days, description, status) VALUES (?, ?, ?, ?, ?)",
      ["Premium", 500000, 30, "Full gym access with trainer support.", "active"]
    );

    console.log("Seed data inserted successfully");
    console.log("Demo accounts:");
    console.log("- Admin: admin@fitlife.com / 123456");
    console.log("- Trainer 1: trainer1@fitlife.com / 123456");
    console.log("- Trainer 2: trainer2@fitlife.com / 123456");
    console.log("- Member: member1@fitlife.com / 123456");

    // Prevent unused variable warning in later lint setup.
    if (!admin || !member) {
      throw new Error("Seed failed");
    }
  } catch (error) {
    console.error("Failed to seed database:", error.message);
    process.exitCode = 1;
  } finally {
    db.close();
  }
}

seed();