
# 05. API Design

## 1. Tổng quan

API dự kiến của FitLife sẽ được thiết kế theo REST API với base URL:

```text
http://localhost:3000/api
```

Đây là thiết kế API ban đầu, sẽ được cập nhật khi backend được triển khai ở các sprint sau.

## 2. Auth API

| Method | Endpoint | Role | Mô tả |
|---|---|---|---|
| POST | `/auth/register` | Public | Đăng ký tài khoản member |
| POST | `/auth/login` | Public | Đăng nhập hệ thống |
| GET | `/auth/me` | User | Lấy thông tin user hiện tại từ token |

### POST `/auth/register`

Header:

```http
Không cần Authorization
```

Request body mẫu:

```json
{
  "full_name": "Nguyen Van A",
  "email": "member1@fitlife.com",
  "password": "123456",
  "phone": "0900000000"
}
```

Response mẫu:

```json
{
  "message": "Register successfully",
  "user": {
    "id": 1,
    "full_name": "Nguyen Van A",
    "email": "member1@fitlife.com",
    "role": "member"
  }
}
```

### POST `/auth/login`

Header:

```http
Không cần Authorization
```

Request body mẫu:

```json
{
  "email": "member1@fitlife.com",
  "password": "123456"
}
```

Response mẫu:

```json
{
  "message": "Login successfully",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "member1@fitlife.com",
    "role": "member"
  }
}
```

### GET `/auth/me`

Header:

```http
Authorization: Bearer <token>
```

Response mẫu:

```json
{
  "user": {
    "id": 1,
    "full_name": "Nguyen Van A",
    "email": "member1@fitlife.com",
    "role": "member",
    "phone": "0900000000"
  }
}
```

## 3. Plans API

| Method | Endpoint | Role | Mô tả |
|---|---|---|---|
| GET | `/plans` | Public | Xem danh sách gói tập |
| GET | `/plans/:id` | Public | Xem chi tiết một gói tập |
| POST | `/plans` | Admin | Tạo gói tập mới |
| PUT | `/plans/:id` | Admin | Cập nhật gói tập |
| DELETE | `/plans/:id` | Admin | Xóa mềm gói tập |

### POST `/plans`

Header:

```http
Authorization: Bearer <token>
```

Request body mẫu:

```json
{
  "name": "Premium",
  "price": 500000,
  "duration_days": 30,
  "description": "Full access gym and trainer support",
  "status": "active"
}
```

Response mẫu:

```json
{
  "message": "Create plan successfully",
  "plan": {
    "id": 1,
    "name": "Premium",
    "price": 500000,
    "duration_days": 30,
    "description": "Full access gym and trainer support",
    "status": "active"
  }
}
```

## 4. Membership API

| Method | Endpoint | Role | Mô tả |
|---|---|---|---|
| POST | `/memberships/subscribe` | Member | Đăng ký gói tập |
| GET | `/memberships/my` | Member | Xem membership của tôi |
| GET | `/memberships` | Admin | Xem toàn bộ membership |

### POST `/memberships/subscribe`

Header:

```http
Authorization: Bearer <token>
```

Request body mẫu:

```json
{
  "plan_id": 1,
  "payment_method": "cash"
}
```

Response mẫu:

```json
{
  "message": "Subscribe successfully",
  "membership": {
    "id": 10,
    "user_id": 1,
    "plan_id": 1,
    "start_date": "2026-06-19",
    "end_date": "2026-07-19",
    "status": "active"
  },
  "payment": {
    "id": 20,
    "user_id": 1,
    "membership_id": 10,
    "amount": 500000,
    "payment_method": "cash",
    "payment_status": "paid"
  }
}
```

## 5. Trainer API

| Method | Endpoint | Role | Mô tả |
|---|---|---|---|
| GET | `/trainers` | Public | Xem danh sách trainer |
| POST | `/trainers` | Admin | Thêm trainer |
| PUT | `/trainers/:id` | Admin | Cập nhật trainer |
| DELETE | `/trainers/:id` | Admin | Xóa trainer |

### POST `/trainers`

Header:

```http
Authorization: Bearer <token>
```

Request body mẫu:

```json
{
  "user_id": 5,
  "specialization": "Strength Training",
  "experience_years": 4,
  "bio": "Huấn luyện viên thể hình chuyên về tăng cơ"
}
```

Response mẫu:

```json
{
  "message": "Create trainer successfully",
  "trainer": {
    "id": 1,
    "user_id": 5,
    "specialization": "Strength Training",
    "experience_years": 4,
    "bio": "Huấn luyện viên thể hình chuyên về tăng cơ"
  }
}
```

## 6. Schedule API

| Method | Endpoint | Role | Mô tả |
|---|---|---|---|
| POST | `/schedules` | Member | Đặt lịch tập với trainer |
| GET | `/schedules/my` | Member | Xem lịch cá nhân |
| GET | `/schedules/trainer` | Trainer | Xem lịch dạy của trainer hiện tại |
| GET | `/schedules` | Admin | Xem toàn bộ lịch |
| PUT | `/schedules/:id/status` | Trainer, Admin | Cập nhật trạng thái lịch |

### POST `/schedules`

Header:

```http
Authorization: Bearer <token>
```

Request body mẫu:

```json
{
  "trainer_id": 1,
  "schedule_date": "2026-06-20",
  "start_time": "08:00",
  "end_time": "09:00",
  "note": "Chest workout"
}
```

Response mẫu:

```json
{
  "message": "Create schedule successfully",
  "schedule": {
    "id": 12,
    "member_id": 1,
    "trainer_id": 1,
    "schedule_date": "2026-06-20",
    "start_time": "08:00",
    "end_time": "09:00",
    "status": "pending",
    "note": "Chest workout"
  }
}
```

### PUT `/schedules/:id/status`

Header:

```http
Authorization: Bearer <token>
```

Request body mẫu:

```json
{
  "status": "confirmed"
}
```

Response mẫu:

```json
{
  "message": "Update schedule status successfully",
  "schedule": {
    "id": 12,
    "status": "confirmed"
  }
}
```

## 7. Payment API

| Method | Endpoint | Role | Mô tả |
|---|---|---|---|
| GET | `/payments` | Admin | Xem tất cả payment |
| GET | `/payments/my` | Member | Xem payment của tôi |

### GET `/payments`

Header:

```http
Authorization: Bearer <token>
```

Response mẫu:

```json
{
  "payments": [
    {
      "id": 20,
      "user_id": 1,
      "membership_id": 10,
      "amount": 500000,
      "payment_method": "cash",
      "payment_status": "paid"
    }
  ]
}
```

## 8. Header xác thực

Các API cần đăng nhập sẽ dùng header:

```http
Authorization: Bearer <token>
```

## 9. Quy ước response lỗi

```json
{
  "message": "Error message"
}
```

