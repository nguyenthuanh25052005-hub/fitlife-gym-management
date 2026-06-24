
# FitLife Gym Management System

FitLife Gym Management System là đồ án quản lý phòng gym với các chức năng chính như quản lý hội viên, gói tập, huấn luyện viên, lịch tập và thanh toán mô phỏng. Trong Sprint 6, nhóm đã hoàn thiện frontend HTML/CSS/JavaScript thuần để thể hiện luồng nghiệp vụ rõ ràng và phù hợp cho thuyết trình đồ án.

## 1. Mục tiêu dự án

FitLife hướng tới việc cung cấp một hệ thống web đơn giản nhưng đủ chuyên nghiệp để demo quy trình quản lý phòng gym:

- Quản lý thông tin người dùng theo vai trò Admin, Member và Trainer.
- Cho phép member đăng ký gói tập, đặt lịch và xem thanh toán.
- Cho phép trainer xem và cập nhật lịch tập.
- Cho phép admin giám sát toàn bộ dữ liệu hệ thống.

## 2. Chức năng đã hoàn thành ở Sprint 6

### Admin

- Đăng nhập hệ thống.
- Xem danh sách membership.
- Xem danh sách payment.
- Xem toàn bộ lịch tập.

### Member

- Đăng nhập hệ thống.
- Xem danh sách gói tập.
- Đăng ký gói tập.
- Xem membership của mình.
- Xem thanh toán của mình.
- Xem danh sách trainer.
- Đặt lịch tập với trainer.
- Xem lịch tập cá nhân.

### Trainer

- Đăng nhập hệ thống.
- Xem lịch dạy cá nhân.
- Xác nhận lịch tập.
- Hoàn thành hoặc hủy lịch tập.

## 3. Frontend

Frontend được xây dựng bằng HTML, CSS và JavaScript thuần, không dùng React, Vue hay Bootstrap. Giao diện đã được tối ưu cho màn hình laptop rộng với layout gần full screen, container lớn, form và bảng dữ liệu rõ ràng, màu xanh dương/cyan hiện đại và phù hợp cho demo đồ án và chiếu projector.

### Cách chạy backend

```bash
cd backend
npm install
npm run db:init
npm run db:seed
npm start
```

### Cách mở frontend bằng Live Server

1. Mở thư mục frontend trong VS Code.
2. Nhấn chuột phải vào [frontend/index.html](frontend/index.html).
3. Chọn "Open with Live Server".
4. Truy cập giao diện chạy trên localhost.

### Tài khoản demo

| Vai trò | Email | Mật khẩu |
|---|---|---|
| Admin | admin@fitlife.com | 123456 |
| Trainer | trainer1@fitlife.com | 123456 |
| Member | member1@fitlife.com | 123456 |

## 4. Cấu trúc thư mục

```text
fitlife-gym-management/
├── backend/
├── frontend/
├── docs/
├── .gitignore
└── README.md
```

## 5. Tài liệu liên quan

- [docs/09_FRONTEND_GUIDE.md](docs/09_FRONTEND_GUIDE.md)
- [docs/14_DEMO_SCRIPT.md](docs/14_DEMO_SCRIPT.md)

## 6. Trạng thái hiện tại

- Backend API đang hoạt động và có thể dùng cho frontend.
- Frontend đã hoàn thiện các trang và luồng chính cho member, trainer và admin.
- Giao diện đã được nâng cấp để phù hợp cho thuyết trình đồ án, với layout rộng, card nổi bật và bảng dữ liệu dễ đọc.
