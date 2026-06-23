const { connectDatabase } = require("../config/database");

function runQuery(sql, params = []) {
  const db = connectDatabase();

  return new Promise((resolve, reject) => {
    db.all(sql, params, (error, rows) => {
      db.close();

      if (error) {
        reject(error);
        return;
      }

      resolve(rows);
    });
  });
}

function runGet(sql, params = []) {
  const db = connectDatabase();

  return new Promise((resolve, reject) => {
    db.get(sql, params, (error, row) => {
      db.close();

      if (error) {
        reject(error);
        return;
      }

      resolve(row);
    });
  });
}

function runExecute(sql, params = []) {
  const db = connectDatabase();

  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(error) {
      db.close();

      if (error) {
        reject(error);
        return;
      }

      resolve(this);
    });
  });
}

async function getAllPlans(req, res) {
  try {
    const plans = await runQuery(
      "SELECT id, name, price, duration_days, description, status FROM membership_plans ORDER BY id ASC"
    );

    return res.json({
      plans
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get membership plans",
      error: error.message
    });
  }
}

async function getPlanById(req, res) {
  try {
    const { id } = req.params;

    const plan = await runGet(
      "SELECT id, name, price, duration_days, description, status FROM membership_plans WHERE id = ?",
      [id]
    );

    if (!plan) {
      return res.status(404).json({
        message: "Membership plan not found"
      });
    }

    return res.json({
      plan
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get membership plan",
      error: error.message
    });
  }
}

async function createPlan(req, res) {
  try {
    const { name, price, durationDays, description, status } = req.body;

    if (!name || price === undefined || !durationDays) {
      return res.status(400).json({
        message: "Name, price, and durationDays are required"
      });
    }

    const result = await runExecute(
      "INSERT INTO membership_plans (name, price, duration_days, description, status) VALUES (?, ?, ?, ?, ?)",
      [name, price, durationDays, description || "", status || "active"]
    );

    const newPlan = await runGet(
      "SELECT id, name, price, duration_days, description, status FROM membership_plans WHERE id = ?",
      [result.lastID]
    );

    return res.status(201).json({
      message: "Membership plan created successfully",
      plan: newPlan
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create membership plan",
      error: error.message
    });
  }
}

async function updatePlan(req, res) {
  try {
    const { id } = req.params;
    const { name, price, durationDays, description, status } = req.body;

    const existingPlan = await runGet(
      "SELECT id FROM membership_plans WHERE id = ?",
      [id]
    );

    if (!existingPlan) {
      return res.status(404).json({
        message: "Membership plan not found"
      });
    }

    if (!name || price === undefined || !durationDays) {
      return res.status(400).json({
        message: "Name, price, and durationDays are required"
      });
    }

    await runExecute(
      "UPDATE membership_plans SET name = ?, price = ?, duration_days = ?, description = ?, status = ? WHERE id = ?",
      [name, price, durationDays, description || "", status || "active", id]
    );

    const updatedPlan = await runGet(
      "SELECT id, name, price, duration_days, description, status FROM membership_plans WHERE id = ?",
      [id]
    );

    return res.json({
      message: "Membership plan updated successfully",
      plan: updatedPlan
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update membership plan",
      error: error.message
    });
  }
}

async function deletePlan(req, res) {
  try {
    const { id } = req.params;

    const existingPlan = await runGet(
      "SELECT id FROM membership_plans WHERE id = ?",
      [id]
    );

    if (!existingPlan) {
      return res.status(404).json({
        message: "Membership plan not found"
      });
    }

    await runExecute(
      "UPDATE membership_plans SET status = 'inactive' WHERE id = ?",
      [id]
    );

    return res.json({
      message: "Membership plan deactivated successfully"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to deactivate membership plan",
      error: error.message
    });
  }
}

module.exports = {
  getAllPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan
};