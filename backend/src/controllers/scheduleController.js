const { connectDatabase } = require("../config/database");

const db = connectDatabase();

const bookSchedule = (req, res) => {
  const memberId = req.user.id;
  const { trainer_id, schedule_date, start_time, end_time, note } = req.body;

  if (!trainer_id || !schedule_date || !start_time || !end_time) {
    return res.status(400).json({
      message: "trainer_id, schedule_date, start_time and end_time are required"
    });
  }

  db.get(
    `
    SELECT * FROM memberships
    WHERE user_id = ?
      AND status = 'active'
      AND date(end_date) >= date('now')
    ORDER BY end_date DESC
    LIMIT 1
    `,
    [memberId],
    (membershipError, membership) => {
      if (membershipError) {
        return res.status(500).json({
          message: "Check membership failed",
          error: membershipError.message
        });
      }

      if (!membership) {
        return res.status(400).json({
          message: "Active membership is required to book schedule"
        });
      }

      db.get(
        "SELECT * FROM trainers WHERE id = ?",
        [trainer_id],
        (trainerError, trainer) => {
          if (trainerError) {
            return res.status(500).json({
              message: "Check trainer failed",
              error: trainerError.message
            });
          }

          if (!trainer) {
            return res.status(404).json({
              message: "Trainer not found"
            });
          }

          db.get(
            `
            SELECT * FROM workout_schedules
            WHERE trainer_id = ?
              AND schedule_date = ?
              AND status IN ('pending', 'confirmed')
              AND NOT (end_time <= ? OR start_time >= ?)
            `,
            [trainer_id, schedule_date, start_time, end_time],
            (conflictError, conflictSchedule) => {
              if (conflictError) {
                return res.status(500).json({
                  message: "Check schedule conflict failed",
                  error: conflictError.message
                });
              }

              if (conflictSchedule) {
                return res.status(400).json({
                  message: "Trainer already has a schedule at this time"
                });
              }

              db.run(
                `
                INSERT INTO workout_schedules 
                (member_id, trainer_id, schedule_date, start_time, end_time, status, note)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                `,
                [
                  memberId,
                  trainer_id,
                  schedule_date,
                  start_time,
                  end_time,
                  "pending",
                  note || null
                ],
                function (insertError) {
                  if (insertError) {
                    return res.status(500).json({
                      message: "Book schedule failed",
                      error: insertError.message
                    });
                  }

                  return res.status(201).json({
                    message: "Book schedule successfully",
                    schedule: {
                      id: this.lastID,
                      member_id: memberId,
                      trainer_id,
                      schedule_date,
                      start_time,
                      end_time,
                      status: "pending",
                      note: note || null
                    }
                  });
                }
              );
            }
          );
        }
      );
    }
  );
};

const getMySchedules = (req, res) => {
  const memberId = req.user.id;

  db.all(
    `
    SELECT
      workout_schedules.id,
      workout_schedules.trainer_id,
      users.full_name AS trainer_name,
      workout_schedules.schedule_date,
      workout_schedules.start_time,
      workout_schedules.end_time,
      workout_schedules.status,
      workout_schedules.note
    FROM workout_schedules
    JOIN trainers ON workout_schedules.trainer_id = trainers.id
    JOIN users ON trainers.user_id = users.id
    WHERE workout_schedules.member_id = ?
    ORDER BY workout_schedules.schedule_date DESC, workout_schedules.start_time DESC
    `,
    [memberId],
    (error, schedules) => {
      if (error) {
        return res.status(500).json({
          message: "Get my schedules failed",
          error: error.message
        });
      }

      return res.status(200).json({
        schedules
      });
    }
  );
};

const getTrainerSchedules = (req, res) => {
  const trainerUserId = req.user.id;

  db.get(
    "SELECT id FROM trainers WHERE user_id = ?",
    [trainerUserId],
    (trainerError, trainer) => {
      if (trainerError) {
        return res.status(500).json({
          message: "Get trainer failed",
          error: trainerError.message
        });
      }

      if (!trainer) {
        return res.status(404).json({
          message: "Trainer profile not found"
        });
      }

      db.all(
        `
        SELECT
          workout_schedules.id,
          workout_schedules.member_id,
          users.full_name AS member_name,
          users.email AS member_email,
          workout_schedules.schedule_date,
          workout_schedules.start_time,
          workout_schedules.end_time,
          workout_schedules.status,
          workout_schedules.note
        FROM workout_schedules
        JOIN users ON workout_schedules.member_id = users.id
        WHERE workout_schedules.trainer_id = ?
        ORDER BY workout_schedules.schedule_date DESC, workout_schedules.start_time DESC
        `,
        [trainer.id],
        (scheduleError, schedules) => {
          if (scheduleError) {
            return res.status(500).json({
              message: "Get trainer schedules failed",
              error: scheduleError.message
            });
          }

          return res.status(200).json({
            schedules
          });
        }
      );
    }
  );
};

const updateScheduleStatus = (req, res) => {
  const trainerUserId = req.user.id;
  const scheduleId = req.params.id;
  const { status } = req.body;

  const allowedStatus = ["confirmed", "completed", "cancelled"];

  if (!allowedStatus.includes(status)) {
    return res.status(400).json({
      message: "Status must be confirmed, completed or cancelled"
    });
  }

  db.get(
    "SELECT id FROM trainers WHERE user_id = ?",
    [trainerUserId],
    (trainerError, trainer) => {
      if (trainerError) {
        return res.status(500).json({
          message: "Get trainer failed",
          error: trainerError.message
        });
      }

      if (!trainer) {
        return res.status(404).json({
          message: "Trainer profile not found"
        });
      }

      db.run(
        `
        UPDATE workout_schedules
        SET status = ?
        WHERE id = ? AND trainer_id = ?
        `,
        [status, scheduleId, trainer.id],
        function (updateError) {
          if (updateError) {
            return res.status(500).json({
              message: "Update schedule failed",
              error: updateError.message
            });
          }

          if (this.changes === 0) {
            return res.status(404).json({
              message: "Schedule not found or not assigned to this trainer"
            });
          }

          return res.status(200).json({
            message: "Update schedule status successfully",
            schedule: {
              id: Number(scheduleId),
              status
            }
          });
        }
      );
    }
  );
};

const getAllSchedules = (req, res) => {
  db.all(
    `
    SELECT
      workout_schedules.id,
      workout_schedules.member_id,
      member.full_name AS member_name,
      workout_schedules.trainer_id,
      trainer_user.full_name AS trainer_name,
      workout_schedules.schedule_date,
      workout_schedules.start_time,
      workout_schedules.end_time,
      workout_schedules.status,
      workout_schedules.note
    FROM workout_schedules
    JOIN users AS member ON workout_schedules.member_id = member.id
    JOIN trainers ON workout_schedules.trainer_id = trainers.id
    JOIN users AS trainer_user ON trainers.user_id = trainer_user.id
    ORDER BY workout_schedules.schedule_date DESC, workout_schedules.start_time DESC
    `,
    [],
    (error, schedules) => {
      if (error) {
        return res.status(500).json({
          message: "Get schedules failed",
          error: error.message
        });
      }

      return res.status(200).json({
        schedules
      });
    }
  );
};

module.exports = {
  bookSchedule,
  getMySchedules,
  getTrainerSchedules,
  updateScheduleStatus,
  getAllSchedules
};