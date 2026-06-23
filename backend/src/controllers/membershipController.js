const { connectDatabase } = require("../config/database");

const db = connectDatabase();

const subscribePlan = (req, res) => {
  const userId = req.user.id;
  const planId = req.body.plan_id;

  if (!planId) {
    return res.status(400).json({
      message: "plan_id is required"
    });
  }

  db.get(
    "SELECT * FROM membership_plans WHERE id = ?",
    [planId],
    (error, plan) => {
      if (error) {
        return res.status(500).json({
          message: "Database error",
          error: error.message
        });
      }

      if (!plan) {
        return res.status(404).json({
          message: "Plan not found"
        });
      }

      if (plan.status !== "active") {
        return res.status(400).json({
          message: "Cannot subscribe inactive plan"
        });
      }

      const startDate = new Date();
      const endDate = new Date();

      endDate.setDate(startDate.getDate() + plan.duration_days);

      const startDateString = startDate.toISOString().split("T")[0];
      const endDateString = endDate.toISOString().split("T")[0];

      db.run(
        `
        INSERT INTO memberships (user_id, plan_id, start_date, end_date, status)
        VALUES (?, ?, ?, ?, ?)
        `,
        [userId, planId, startDateString, endDateString, "active"],
        function (membershipError) {
          if (membershipError) {
            return res.status(500).json({
              message: "Create membership failed",
              error: membershipError.message
            });
          }

          const membershipId = this.lastID;

          db.run(
            `
            INSERT INTO payments (user_id, membership_id, amount, payment_method, payment_status)
            VALUES (?, ?, ?, ?, ?)
            `,
            [userId, membershipId, plan.price, "mock", "paid"],
            function (paymentError) {
              if (paymentError) {
                return res.status(500).json({
                  message: "Create payment failed",
                  error: paymentError.message
                });
              }

              return res.status(201).json({
                message: "Subscribe plan successfully",
                membership: {
                  id: membershipId,
                  user_id: userId,
                  plan_id: planId,
                  start_date: startDateString,
                  end_date: endDateString,
                  status: "active"
                },
                payment: {
                  id: this.lastID,
                  amount: plan.price,
                  payment_method: "mock",
                  payment_status: "paid"
                }
              });
            }
          );
        }
      );
    }
  );
};

const getAllMemberships = (req, res) => {
  db.all(
    `
    SELECT 
      memberships.id,
      memberships.user_id,
      users.full_name AS user_name,
      users.email AS user_email,
      memberships.plan_id,
      membership_plans.name AS plan_name,
      membership_plans.price,
      memberships.start_date,
      memberships.end_date,
      memberships.status
    FROM memberships
    JOIN users ON memberships.user_id = users.id
    JOIN membership_plans ON memberships.plan_id = membership_plans.id
    ORDER BY memberships.id DESC
    `,
    [],
    (error, memberships) => {
      if (error) {
        return res.status(500).json({
          message: "Get memberships failed",
          error: error.message
        });
      }

      return res.status(200).json({
        memberships
      });
    }
  );
};

const getMyMemberships = (req, res) => {
  const userId = req.user.id;

  db.all(
    `
    SELECT 
      memberships.id,
      memberships.plan_id,
      membership_plans.name AS plan_name,
      membership_plans.price,
      memberships.start_date,
      memberships.end_date,
      memberships.status
    FROM memberships
    JOIN membership_plans ON memberships.plan_id = membership_plans.id
    WHERE memberships.user_id = ?
    ORDER BY memberships.id DESC
    `,
    [userId],
    (error, memberships) => {
      if (error) {
        return res.status(500).json({
          message: "Get my memberships failed",
          error: error.message
        });
      }

      return res.status(200).json({
        memberships
      });
    }
  );
};

module.exports = {
  subscribePlan,
  getAllMemberships,
  getMyMemberships
};