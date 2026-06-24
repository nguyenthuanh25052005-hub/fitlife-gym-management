const { connectDatabase } = require("../config/database");

const db = connectDatabase();

const getAllTrainers = (req, res) => {
  db.all(
    `
    SELECT 
      trainers.id,
      trainers.user_id,
      users.full_name,
      users.email,
      trainers.specialization,
      trainers.experience_years,
      trainers.bio
    FROM trainers
    JOIN users ON trainers.user_id = users.id
    ORDER BY trainers.id ASC
    `,
    [],
    (error, trainers) => {
      if (error) {
        return res.status(500).json({
          message: "Get trainers failed",
          error: error.message
        });
      }

      return res.status(200).json({
        trainers
      });
    }
  );
};

const getTrainerById = (req, res) => {
  const trainerId = req.params.id;

  db.get(
    `
    SELECT 
      trainers.id,
      trainers.user_id,
      users.full_name,
      users.email,
      trainers.specialization,
      trainers.experience_years,
      trainers.bio
    FROM trainers
    JOIN users ON trainers.user_id = users.id
    WHERE trainers.id = ?
    `,
    [trainerId],
    (error, trainer) => {
      if (error) {
        return res.status(500).json({
          message: "Get trainer failed",
          error: error.message
        });
      }

      if (!trainer) {
        return res.status(404).json({
          message: "Trainer not found"
        });
      }

      return res.status(200).json({
        trainer
      });
    }
  );
};

module.exports = {
  getAllTrainers,
  getTrainerById
};