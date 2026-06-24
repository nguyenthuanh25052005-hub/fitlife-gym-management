const { connectDatabase } = require("../config/database");

const db = connectDatabase();

const getAllPayments = (req, res) => {
  db.all(
    `
    SELECT 
      payments.id,
      payments.user_id,
      users.full_name AS user_name,
      users.email AS user_email,
      payments.membership_id,
      payments.amount,
      payments.payment_method,
      payments.payment_status,
      payments.created_at
    FROM payments
    JOIN users ON payments.user_id = users.id
    ORDER BY payments.id DESC
    `,
    [],
    (error, payments) => {
      if (error) {
        return res.status(500).json({
          message: "Get payments failed",
          error: error.message
        });
      }

      return res.status(200).json({
        payments
      });
    }
  );
};

const getMyPayments = (req, res) => {
  const userId = req.user.id;

  db.all(
    `
    SELECT 
      id,
      membership_id,
      amount,
      payment_method,
      payment_status,
      created_at
    FROM payments
    WHERE user_id = ?
    ORDER BY id DESC
    `,
    [userId],
    (error, payments) => {
      if (error) {
        return res.status(500).json({
          message: "Get my payments failed",
          error: error.message
        });
      }

      return res.status(200).json({
        payments
      });
    }
  );
};

module.exports = {
  getAllPayments,
  getMyPayments
};