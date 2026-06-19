
# 09. Frontend Guide

## 1. Tổng quan frontend

Frontend dự kiến sử dụng HTML, CSS và JavaScript thuần. Giao diện sẽ gọi REST API từ backend bằng `fetch`, đồng thời lưu token đăng nhập để dùng cho các trang cần xác thực.

## 2. Cấu trúc frontend dự kiến

```text
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
```

## 3. Các trang chính

| Trang | Mục đích |
|---|---|
| `index.html` | Trang giới thiệu dự án và xem gói tập |
| `register.html` | Trang đăng ký member |
| `login.html` | Trang đăng nhập |
| `member-dashboard.html` | Dashboard dành cho hội viên |
| `admin-dashboard.html` | Dashboard dành cho admin |
| `trainer-dashboard.html` | Dashboard dành cho trainer |

## 4. Cách gọi API bằng `fetch`

Frontend dự kiến gọi API theo kiểu sau:

```js
const response = await fetch("http://localhost:3000/api/plans");
const data = await response.json();
```

## 5. Cách gửi token `Authorization`

Các API cần đăng nhập sẽ gửi token trong header `Authorization`:

```js
const token = localStorage.getItem("token");

fetch("http://localhost:3000/api/auth/me", {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

## 6. Cách lưu token vào `localStorage`

Sau khi login thành công, frontend dự kiến lưu token và thông tin user như sau:

```js
localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(data.user));
```

## 7. Điều hướng theo role

Sau khi login, frontend sẽ chuyển hướng theo role:

| Role | Trang đích |
|---|---|
| Admin | `admin-dashboard.html` |
| Member | `member-dashboard.html` |
| Trainer | `trainer-dashboard.html` |

## 8. Chức năng của từng dashboard

### Member Dashboard

| Chức năng | Mô tả |
|---|---|
| Xem thông tin cá nhân | Hiển thị hồ sơ và trạng thái tài khoản |
| Xem danh sách gói tập | Xem các plan đang hoạt động |
| Đăng ký gói tập | Chọn plan và gửi yêu cầu subscribe |
| Xem trainer | Xem danh sách huấn luyện viên |
| Đặt lịch tập | Tạo lịch với trainer phù hợp |
| Xem lịch cá nhân | Theo dõi các buổi tập đã đặt |

### Admin Dashboard

| Chức năng | Mô tả |
|---|---|
| Quản lý gói tập | Thêm, sửa, xóa hoặc vô hiệu hóa plan |
| Xem membership | Theo dõi các đăng ký gói tập |
| Xem payment | Xem các payment mô phỏng |
| Xem schedule | Quản lý toàn bộ lịch tập |
| Quản lý trainer | Thêm, sửa, xóa trainer |

### Trainer Dashboard

| Chức năng | Mô tả |
|---|---|
| Xem lịch dạy | Xem các buổi tập được gán cho trainer |
| Xác nhận lịch | Chuyển lịch từ pending sang confirmed |
| Cập nhật trạng thái lịch | Đổi trạng thái sang completed hoặc cancelled khi phù hợp |

## 9. Ghi chú

- Frontend chưa được triển khai ở giai đoạn tài liệu ban đầu.
- Mô tả trong tài liệu này là dự kiến và sẽ được cập nhật khi giao diện được tạo ở các sprint sau.
