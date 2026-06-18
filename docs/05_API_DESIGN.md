
05. API Design
1. Tổng quan

API dự kiến được thiết kế theo REST API.

Base URL dự kiến:

http://localhost:3000/api

Đây là thiết kế API ban đầu, sẽ được cập nhật sau khi backend được triển khai.

2. Auth API
MethodEndpointRoleMô tả
POST/auth/registerPublicĐăng ký member
POST/auth/loginPublicĐăng nhập
GET/auth/meUserLấy thông tin user hiện tại
POST /auth/register

Request:

{
  "full_name": "Nguyen Van A",
  "email": "member1@fitlife.com",
  "password": "123456",
  "phone": "0900000000"
}

Response:

{
  "message": "Register successfully",
  "user": {
    "id": 1,
    "full_name": "Nguyen Van A",
    "email": "member1@fitlife.com",
    "role": "member"
  }
}
POST /auth/login

Request:

{
  "email": "member1@fitlife.com",
  "password": "123456"
}

Response:

{
  "message": "Login successfully",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "member1@fitlife.com",
    "role": "member"
  }
}
3. Plans API
MethodEndpointRoleMô tả
GET/plansPublicXem danh sách gói tập
GET/plans/PublicXem chi tiết gói
POST/plansAdminTạo gói tập
PUT/plans/AdminCập nhật gói tập
DELETE/plans/AdminXóa mềm gói tập

Request tạo gói:

{
  "name": "Premium",
  "price": 500000,
  "duration_days": 30,
  "description": "Full access gym and trainer support"
}
4. Membership API
MethodEndpointRoleMô tả
POST/memberships/subscribeMemberĐăng ký gói tập
GET/memberships/myMemberXem gói của tôi
GET/membershipsAdminXem tất cả membership

Request đăng ký:

{
  "plan_id": 1,
  "payment_method": "cash"
}
5. Trainer API
MethodEndpointRoleMô tả
GET/trainersMember/AdminXem danh sách trainer
POST/trainersAdminThêm trainer
PUT/trainers/AdminSửa trainer
DELETE/trainers/AdminXóa trainer
6. Schedule API
MethodEndpointRoleMô tả
POST/schedulesMemberĐặt lịch tập
GET/schedules/myMemberXem lịch của tôi
GET/schedules/trainerTrainerTrainer xem lịch dạy
GET/schedulesAdminAdmin xem toàn bộ
PUT/schedules//statusTrainer/AdminCập nhật trạng thái

Request đặt lịch:

{
  "trainer_id": 1,
  "schedule_date": "2026-06-20",
  "start_time": "08:00",
  "end_time": "09:00",
  "note": "Chest workout"
}

Request cập nhật trạng thái:

{
  "status": "confirmed"
}
7. Payment API
MethodEndpointRoleMô tả
GET/paymentsAdminXem tất cả payment
GET/payments/myMemberXem payment của tôi
8. Header xác thực

Các API cần đăng nhập dùng header:

Authorization: Bearer <token>
9. Quy ước response lỗi
{
  "message": "Error message"
}

