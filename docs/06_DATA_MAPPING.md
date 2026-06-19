
# 06. Data Mapping

## 1. Tổng quan

File này mô tả mapping dự kiến giữa form frontend, API payload và các trường trong database. Thiết kế này áp dụng cho giai đoạn đầu của FitLife, khi backend và database vẫn đang được triển khai theo sprint.

## 2. Register Form

| Frontend field | API field | Database field |
|---|---|---|
| fullName | full_name | users.full_name |
| email | email | users.email |
| password | password | users.password_hash |
| phone | phone | users.phone |

### Ghi chú

- `password` sẽ được hash bằng bcryptjs trước khi lưu vào database.
- Frontend chỉ gửi mật khẩu thô; backend tự xử lý hash.

## 3. Login Form

| Frontend field | API field | Database field |
|---|---|---|
| email | email | users.email |
| password | password | users.password_hash |

### Ghi chú

- Backend sẽ kiểm tra mật khẩu bằng bcryptjs.
- Nếu hợp lệ, backend trả JWT để frontend lưu và dùng cho các API cần xác thực.

## 4. Plan Form

| Frontend field | API field | Database field |
|---|---|---|
| name | name | membership_plans.name |
| price | price | membership_plans.price |
| durationDays | duration_days | membership_plans.duration_days |
| description | description | membership_plans.description |
| status | status | membership_plans.status |

## 5. Subscribe Form

| Frontend field | API field | Database field |
|---|---|---|
| planId | plan_id | memberships.plan_id |
| paymentMethod | payment_method | payments.payment_method |

### Backend tự tạo

| Dữ liệu | Nguồn tạo |
|---|---|
| memberships.user_id | Lấy từ token sau khi giải mã JWT |
| memberships.start_date | Backend tự tạo theo ngày đăng ký |
| memberships.end_date | Backend tự tính theo `duration_days` của plan |
| payments.amount | Backend lấy từ `plan.price` |
| payments.payment_status | Backend đặt theo luồng thanh toán mô phỏng |
| payments.membership_id | Backend liên kết với membership vừa tạo |

## 6. Schedule Form

| Frontend field | API field | Database field |
|---|---|---|
| trainerId | trainer_id | workout_schedules.trainer_id |
| scheduleDate | schedule_date | workout_schedules.schedule_date |
| startTime | start_time | workout_schedules.start_time |
| endTime | end_time | workout_schedules.end_time |
| note | note | workout_schedules.note |

### Backend tự tạo

| Dữ liệu | Nguồn tạo |
|---|---|
| workout_schedules.member_id | Lấy từ token sau khi giải mã JWT |
| workout_schedules.status | Mặc định là `pending` |

## 7. Schedule Status Form

| Frontend field | API field | Database field |
|---|---|---|
| status | status | workout_schedules.status |

### Trạng thái hợp lệ

- `pending`
- `confirmed`
- `completed`
- `cancelled`

## 8. Ghi chú triển khai

- `password` chỉ xuất hiện ở phía frontend/API request, còn trong database sẽ là `password_hash`.
- `user_id` và `member_id` dự kiến không nhập thủ công ở các form quan trọng mà sẽ lấy từ token đăng nhập.
- Backend sẽ tự tạo `start_date`, `end_date` và payment khi member đăng ký gói tập.
