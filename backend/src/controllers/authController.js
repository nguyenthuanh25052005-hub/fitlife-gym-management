const bcrypt = require("bcryptjs");
const { connectDatabase } = require("../config/database");
const { generateToken } = require("../utils/jwt");

function getUserByEmail(email) {
  const db = connectDatabase();

  return new Promise((resolve, reject) => {
    db.get(
      "SELECT id, full_name, email, password_hash, role, phone, created_at FROM users WHERE email = ?",
      [email],
      (error, row) => {
        db.close();

        if (error) {
          reject(error);
          return;
        }

        resolve(row);
      }
    );
  });
}

function getUserById(id) {
  const db = connectDatabase();

  return new Promise((resolve, reject) => {
    db.get(
      "SELECT id, full_name, email, role, phone, created_at FROM users WHERE id = ?",
      [id],
      (error, row) => {
        db.close();

        if (error) {
          reject(error);
          return;
        }

        resolve(row);
      }
    );
  });
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = generateToken(user);

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        role: user.role,
        phone: user.phone
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
}

async function profile(req, res) {
  try {
    const user = await getUserById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.json({
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        createdAt: user.created_at
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get profile",
      error: error.message
    });
  }
}

function adminOnly(req, res) {
  return res.json({
    message: "Admin access granted",
    user: req.user
  });
}

function trainerOnly(req, res) {
  return res.json({
    message: "Trainer access granted",
    user: req.user
  });
}

function memberOnly(req, res) {
  return res.json({
    message: "Member access granted",
    user: req.user
  });
}

module.exports = {
  login,
  profile,
  adminOnly,
  trainerOnly,
  memberOnly
};
