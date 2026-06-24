
# 14. Demo Script

## 1. Chuẩn bị demo

### Backend

```bash
cd backend
npm install
npm run db:init
npm run db:seed
npm start
```

### Frontend

Mở frontend bằng Live Server hoặc mở trực tiếp file:

```text
frontend/index.html
```

## 2. Kịch bản demo UI

### Bước 1: Mở trang chủ

- Mở [frontend/index.html](../frontend/index.html).
- Quan sát hero section rộng, các card vai trò và nút đăng nhập nổi bật trên toàn màn hình.
- Nhấn "Bắt đầu demo" để chuyển sang trang login.

### Bước 2: Login member

- Sử dụng tài khoản member: `member1@fitlife.com / 123456`.
- Sau khi đăng nhập, hệ thống chuyển sang [frontend/member.html](../frontend/member.html).
- Quan sát phần thông tin user và các thống kê nhanh.

### Bước 3: Member xem gói tập và đăng ký

- Xem danh sách các gói tập.
- Nhấn nút "Đăng ký ngay" cho một gói phù hợp.
- Quan sát membership mới được hiển thị.

### Bước 4: Member xem membership/payment/trainer

- Kiểm tra section membership của tôi.
- Xem thanh toán đã tạo.
- Xem danh sách trainer và thông tin chuyên môn của họ.

### Bước 5: Member đặt lịch

- Chọn trainer, ngày, giờ và ghi chú.
- Bấm "Đặt lịch".
- Xem lịch tập mới xuất hiện trong bảng lịch của tôi.

### Bước 6: Login trainer

- Đăng xuất và đăng nhập bằng `trainer1@fitlife.com / 123456`.
- Hệ thống chuyển sang [frontend/trainer.html](../frontend/trainer.html).
- Xem danh sách lịch tập được giao.

### Bước 7: Trainer xác nhận lịch

- Nhấn nút "Xác nhận", "Hoàn thành" hoặc "Hủy" tương ứng.
- Quan sát trạng thái trên bảng thay đổi.

### Bước 8: Login admin

- Đăng xuất và đăng nhập bằng `admin@fitlife.com / 123456`.
- Hệ thống chuyển sang [frontend/admin.html](../frontend/admin.html).
- Xem các card thống kê tổng quan.

### Bước 9: Admin xem dữ liệu hệ thống

- Xem bảng memberships.
- Xem bảng payments.
- Xem bảng schedules.
- Nhấn mạnh rằng dữ liệu được render trực tiếp từ API backend.

## 3. Tài khoản demo

| Vai trò | Email | Password |
|---|---|---|
| Admin | admin@fitlife.com | 123456 |
| Trainer | trainer1@fitlife.com | 123456 |
| Member | member1@fitlife.com | 123456 |
