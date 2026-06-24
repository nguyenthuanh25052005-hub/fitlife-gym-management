# 05. API Design

## 1. Tổng quan

API hiện tại của FitLife được thiết kế theo REST với base URL:

```text
http://127.0.0.1:3000/api
```

## 2. API endpoint hiện có

| Method | Endpoint | Role | Mô tả |
|---|---|---|---|
| GET | /api/health | Public | Health check |
| POST | /api/auth/login | Public | Đăng nhập |
| GET | /api/auth/profile | Authenticated | Xem profile |
| GET | /api/plans | Public | Xem danh sách gói tập |
| POST | /api/memberships/subscribe | Member | Đăng ký gói tập |
| GET | /api/memberships/me | Member | Xem membership của mình |
| GET | /api/memberships | Admin | Xem toàn bộ membership |
| GET | /api/payments/me | Member | Xem thanh toán của mình |
| GET | /api/payments | Admin | Xem toàn bộ payment |
| GET | /api/trainers | Authenticated | Xem danh sách trainer |
| POST | /api/schedules | Member | Đặt lịch tập |
| GET | /api/schedules/me | Member | Xem lịch của mình |
| GET | /api/schedules/trainer/me | Trainer | Xem lịch của trainer |
| PATCH | /api/schedules/:id/status | Trainer | Cập nhật trạng thái lịch |
| GET | /api/schedules | Admin | Xem toàn bộ lịch |

## 3. Mẫu request/response chính

### POST /api/auth/login

Request:

```json
{
  "email": "member1@fitlife.com",
  "password": "123456"
}
```

Response:

```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "member1@fitlife.com",
    "role": "member"
  }
}
```

### POST /api/memberships/subscribe

Request:

```json
{
  "plan_id": 1
}
```

Response:

```json
{
  "message": "Subscribe plan successfully",
  "membership": {
    "id": 1,
    "plan_id": 1,
    "status": "active"
  },
  "payment": {
    "amount": 200000,
    "payment_method": "mock",
    "payment_status": "paid"
  }
}
```

### POST /api/schedules

Request:

```json
{
  "trainer_id": 1,
  "schedule_date": "2026-06-20",
  "start_time": "09:00",
  "end_time": "10:00",
  "note": "Bodybuilding session"
}
```

Response:

```json
{
  "message": "Book schedule successfully",
  "schedule": {
    "id": 1,
    "status": "pending"
  }
}
```
