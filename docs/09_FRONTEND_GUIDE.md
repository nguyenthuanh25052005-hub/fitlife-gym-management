
09. Frontend Guide
1. Tổng quan

Frontend dự kiến sử dụng HTML, CSS và JavaScript thuần. Giao diện sẽ gọi REST API từ backend bằng fetch.

2. Cấu trúc frontend dự kiến
frontend/
├── index.html
├── login.html
├── register.html
├── member-dashboard.html
├── admin-dashboard.html
├── trainer-dashboard.html
├── css/
│   └── style.css
└── js/
    ├── api.js
    ├── auth.js
    ├── member.js
    ├── admin.js
    └── trainer.js
3. Các trang chính
TrangMục đích
index.htmlTrang giới thiệu, xem gói tập
register.htmlĐăng ký member
login.htmlĐăng nhập
member-dashboard.htmlDashboard hội viên
admin-dashboard.htmlDashboard admin
trainer-dashboard.htmlDashboard trainer
4. Gọi API bằng fetch

Ví dụ dự kiến:

const response = await fetch("http://localhost:3000/api/plans");
const data = await response.json();
5. Gửi token

Các API cần đăng nhập sẽ gửi token:

const token = localStorage.getItem("token");

fetch("http://localhost:3000/api/auth/me", {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
6. Lưu token

Sau khi login thành công:

localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(data.user));
7. Điều hướng theo role

Sau khi login:

admin   -> admin-dashboard.html
member  -> member-dashboard.html
trainer -> trainer-dashboard.html
8. Chức năng member dashboard
Xem thông tin cá nhân.
Xem danh sách gói tập.
Đăng ký gói tập.
Xem trainer.
Đặt lịch tập.
Xem lịch cá nhân.
9. Chức năng admin dashboard
Quản lý gói tập.
Xem membership.
Xem payment.
Xem schedule.
Quản lý trainer.
10. Chức năng trainer dashboard
Xem lịch dạy.
Xác nhận lịch.
Cập nhật trạng thái lịch.
11. Ghi chú

Frontend chưa được triển khai ở giai đoạn tài liệu ban đầu. File này sẽ được cập nhật sau khi giao diện hoàn thành.
