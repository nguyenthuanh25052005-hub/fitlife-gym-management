const request = require("supertest");
const app = require("../src/app");
const { connectDatabase } = require("../src/config/database");

let db;

let memberToken;
let trainerToken;
let adminToken;

let createdScheduleId;

const uniqueDay = String((Date.now() % 20) + 1).padStart(2, "0");
const testScheduleDate = `2026-07-${uniqueDay}`;
const testStartTime = "14:00";
const testEndTime = "15:00";

beforeAll(async () => {
  db = connectDatabase();

  const memberLogin = await request(app)
    .post("/api/auth/login")
    .send({
      email: "member1@fitlife.com",
      password: "123456"
    });

  memberToken = memberLogin.body.token;

  const trainerLogin = await request(app)
    .post("/api/auth/login")
    .send({
      email: "trainer2@fitlife.com",
      password: "123456"
    });

  trainerToken = trainerLogin.body.token;

  const adminLogin = await request(app)
    .post("/api/auth/login")
    .send({
      email: "admin@fitlife.com",
      password: "123456"
    });

  adminToken = adminLogin.body.token;
});

afterAll((done) => {
  if (db) {
    db.close(() => done());
    return;
  }

  done();
});

describe("FitLife API - Health", () => {
  test("GET /api/health returns status ok", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  test("GET unknown endpoint returns 404", async () => {
    const response = await request(app).get("/api/not-found");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("API endpoint not found");
  });
});

describe("FitLife API - Authentication and RBAC", () => {
  test("POST /api/auth/login returns token for member account", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "member1@fitlife.com",
        password: "123456"
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful");
    expect(response.body.token).toBeDefined();
    expect(response.body.user.role).toBe("member");
  });

  test("POST /api/auth/login returns 400 when email or password is missing", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "member1@fitlife.com"
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email and password are required");
  });

  test("POST /api/auth/login returns 401 for invalid password", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "member1@fitlife.com",
        password: "wrong-password"
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid email or password");
  });

  test("POST /api/auth/login returns 401 for unknown email", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "unknown@fitlife.com",
        password: "123456"
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid email or password");
  });

  test("GET /api/auth/profile returns current user", async () => {
    const response = await request(app)
      .get("/api/auth/profile")
      .set("Authorization", `Bearer ${memberToken}`);

    expect(response.status).toBe(200);
    expect(response.body.user.email).toBe("member1@fitlife.com");
    expect(response.body.user.role).toBe("member");
  });

  test("GET /api/auth/profile returns 401 without token", async () => {
    const response = await request(app).get("/api/auth/profile");

    expect(response.status).toBe(401);
  });

  test("GET /api/auth/admin-only blocks member role", async () => {
    const response = await request(app)
      .get("/api/auth/admin-only")
      .set("Authorization", `Bearer ${memberToken}`);

    expect(response.status).toBe(403);
  });

  test("GET /api/auth/member-only allows member role", async () => {
    const response = await request(app)
      .get("/api/auth/member-only")
      .set("Authorization", `Bearer ${memberToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Member access granted");
  });

  test("GET /api/auth/trainer-only allows trainer role", async () => {
    const response = await request(app)
      .get("/api/auth/trainer-only")
      .set("Authorization", `Bearer ${trainerToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Trainer access granted");
  });
});

describe("FitLife API - Plans", () => {
  let createdPlanId;

  test("GET /api/plans returns active plans", async () => {
    const response = await request(app).get("/api/plans");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.plans)).toBe(true);
    expect(response.body.plans.length).toBeGreaterThan(0);
  });

  test("GET /api/plans/1 returns one plan", async () => {
    const response = await request(app).get("/api/plans/1");

    expect(response.status).toBe(200);
    expect(response.body.plan).toBeDefined();
    expect(response.body.plan.id).toBe(1);
  });

  test("GET /api/plans/99999 returns 404", async () => {
    const response = await request(app).get("/api/plans/99999");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Membership plan not found");
  });

  test("POST /api/plans blocks unauthenticated request", async () => {
    const response = await request(app)
      .post("/api/plans")
      .send({
        name: "Test Plan No Auth",
        price: 100000,
        durationDays: 30,
        description: "No auth test",
        status: "active"
      });

    expect(response.status).toBe(401);
  });

  test("POST /api/plans blocks member role", async () => {
    const response = await request(app)
      .post("/api/plans")
      .set("Authorization", `Bearer ${memberToken}`)
      .send({
        name: "Test Plan Member",
        price: 100000,
        durationDays: 30,
        description: "Member role test",
        status: "active"
      });

    expect(response.status).toBe(403);
  });

  test("POST /api/plans returns 400 when required data is missing", async () => {
    const response = await request(app)
      .post("/api/plans")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Invalid Plan"
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Name, price, and durationDays are required");
  });

  test("POST /api/plans creates a new plan for admin", async () => {
    const response = await request(app)
      .post("/api/plans")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: `Automated Test Plan ${Date.now()}`,
        price: 350000,
        durationDays: 45,
        description: "Created by automated test",
        status: "active"
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Membership plan created successfully");
    expect(response.body.plan).toBeDefined();
    expect(response.body.plan.name).toContain("Automated Test Plan");

    createdPlanId = response.body.plan.id;
  });

  test("PUT /api/plans/:id returns 404 for missing plan", async () => {
    const response = await request(app)
      .put("/api/plans/99999")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Missing Plan",
        price: 200000,
        durationDays: 30,
        description: "Missing",
        status: "active"
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Membership plan not found");
  });

  test("PUT /api/plans/:id returns 400 when required data is missing", async () => {
    const response = await request(app)
      .put(`/api/plans/${createdPlanId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Invalid Update"
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Name, price, and durationDays are required");
  });

  test("PUT /api/plans/:id updates plan for admin", async () => {
    const response = await request(app)
      .put(`/api/plans/${createdPlanId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Updated Automated Plan",
        price: 400000,
        durationDays: 60,
        description: "Updated by automated test",
        status: "active"
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Membership plan updated successfully");
    expect(response.body.plan.name).toBe("Updated Automated Plan");
    expect(response.body.plan.price).toBe(400000);
  });

  test("DELETE /api/plans/:id returns 404 for missing plan", async () => {
    const response = await request(app)
      .delete("/api/plans/99999")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Membership plan not found");
  });

  test("DELETE /api/plans/:id deactivates plan for admin", async () => {
    const response = await request(app)
      .delete(`/api/plans/${createdPlanId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Membership plan deactivated successfully");
  });
});

describe("FitLife API - Memberships and Payments", () => {
  test("POST /api/memberships/subscribe requires member role", async () => {
    const response = await request(app)
      .post("/api/memberships/subscribe")
      .set("Authorization", `Bearer ${trainerToken}`)
      .send({
        plan_id: 1
      });

    expect(response.status).toBe(403);
  });

  test("POST /api/memberships/subscribe returns 400 when plan_id is missing", async () => {
    const response = await request(app)
      .post("/api/memberships/subscribe")
      .set("Authorization", `Bearer ${memberToken}`)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("plan_id is required");
  });

  test("POST /api/memberships/subscribe returns 404 for missing plan", async () => {
    const response = await request(app)
      .post("/api/memberships/subscribe")
      .set("Authorization", `Bearer ${memberToken}`)
      .send({
        plan_id: 99999
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Plan not found");
  });

  test("POST /api/memberships/subscribe creates membership and payment", async () => {
    const response = await request(app)
      .post("/api/memberships/subscribe")
      .set("Authorization", `Bearer ${memberToken}`)
      .send({
        plan_id: 1
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Subscribe plan successfully");
    expect(response.body.membership).toBeDefined();
    expect(response.body.payment).toBeDefined();
    expect(response.body.payment.payment_status).toBe("paid");
  });

  test("GET /api/memberships/me returns member memberships", async () => {
    const response = await request(app)
      .get("/api/memberships/me")
      .set("Authorization", `Bearer ${memberToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.memberships)).toBe(true);
  });

  test("GET /api/payments/me returns member payments", async () => {
    const response = await request(app)
      .get("/api/payments/me")
      .set("Authorization", `Bearer ${memberToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.payments)).toBe(true);
  });

  test("GET /api/memberships returns all memberships for admin", async () => {
    const response = await request(app)
      .get("/api/memberships")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.memberships)).toBe(true);
  });

  test("GET /api/payments returns all payments for admin", async () => {
    const response = await request(app)
      .get("/api/payments")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.payments)).toBe(true);
  });

  test("GET /api/payments blocks member from admin payment list", async () => {
    const response = await request(app)
      .get("/api/payments")
      .set("Authorization", `Bearer ${memberToken}`);

    expect(response.status).toBe(403);
  });
});

describe("FitLife API - Trainers and Schedules", () => {
  test("GET /api/trainers returns trainers", async () => {
    const response = await request(app)
      .get("/api/trainers")
      .set("Authorization", `Bearer ${memberToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.trainers)).toBe(true);
    expect(response.body.trainers.length).toBeGreaterThan(0);
  });

  test("GET /api/trainers/1 returns trainer detail", async () => {
    const response = await request(app)
      .get("/api/trainers/1")
      .set("Authorization", `Bearer ${memberToken}`);

    expect(response.status).toBe(200);
    expect(response.body.trainer).toBeDefined();
  });

  test("GET /api/trainers/99999 returns 404", async () => {
    const response = await request(app)
      .get("/api/trainers/99999")
      .set("Authorization", `Bearer ${memberToken}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Trainer not found");
  });

  test("POST /api/schedules requires member role", async () => {
    const response = await request(app)
      .post("/api/schedules")
      .set("Authorization", `Bearer ${trainerToken}`)
      .send({
        trainer_id: 2,
        schedule_date: testScheduleDate,
        start_time: testStartTime,
        end_time: testEndTime,
        note: "Role test"
      });

    expect(response.status).toBe(403);
  });

  test("POST /api/schedules returns 400 when required data is missing", async () => {
    const response = await request(app)
      .post("/api/schedules")
      .set("Authorization", `Bearer ${memberToken}`)
      .send({
        trainer_id: 2
      });

    expect(response.status).toBe(400);
  });

  test("POST /api/schedules creates schedule for member", async () => {
    const response = await request(app)
      .post("/api/schedules")
      .set("Authorization", `Bearer ${memberToken}`)
      .send({
        trainer_id: 2,
        schedule_date: testScheduleDate,
        start_time: testStartTime,
        end_time: testEndTime,
        note: "Automated test schedule"
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Book schedule successfully");
    expect(response.body.schedule).toBeDefined();

    createdScheduleId = response.body.schedule.id;
  });

  test("POST /api/schedules blocks duplicated trainer time", async () => {
    const response = await request(app)
      .post("/api/schedules")
      .set("Authorization", `Bearer ${memberToken}`)
      .send({
        trainer_id: 2,
        schedule_date: testScheduleDate,
        start_time: testStartTime,
        end_time: testEndTime,
        note: "Duplicate schedule"
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Trainer already has a schedule at this time");
  });

  test("GET /api/schedules/me returns member schedules", async () => {
    const response = await request(app)
      .get("/api/schedules/me")
      .set("Authorization", `Bearer ${memberToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.schedules)).toBe(true);
  });

  test("GET /api/schedules/trainer/me returns trainer schedules", async () => {
    const response = await request(app)
      .get("/api/schedules/trainer/me")
      .set("Authorization", `Bearer ${trainerToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.schedules)).toBe(true);
  });

  test("PATCH /api/schedules/:id/status updates schedule status", async () => {
    const response = await request(app)
      .patch(`/api/schedules/${createdScheduleId}/status`)
      .set("Authorization", `Bearer ${trainerToken}`)
      .send({
        status: "confirmed"
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Update schedule status successfully");
    expect(response.body.schedule.status).toBe("confirmed");
  });

  test("PATCH /api/schedules/:id/status rejects invalid status", async () => {
    const response = await request(app)
      .patch(`/api/schedules/${createdScheduleId}/status`)
      .set("Authorization", `Bearer ${trainerToken}`)
      .send({
        status: "invalid-status"
      });

    expect(response.status).toBe(400);
  });

  test("GET /api/schedules returns all schedules for admin", async () => {
    const response = await request(app)
      .get("/api/schedules")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.schedules)).toBe(true);
  });

  test("GET /api/schedules blocks member from admin schedule list", async () => {
    const response = await request(app)
      .get("/api/schedules")
      .set("Authorization", `Bearer ${memberToken}`);

    expect(response.status).toBe(403);
  });
});