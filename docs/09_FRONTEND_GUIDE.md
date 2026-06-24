
# 09. Frontend Guide

## 1. Tổng quan frontend

Frontend của FitLife được xây dựng bằng HTML, CSS và JavaScript thuần, không dùng framework. Giao diện được thiết kế để vừa chạy trực tiếp bằng Live Server, vừa phù hợp cho việc thuyết trình và demo đồ án quản lý phòng gym.

## 2. Cấu trúc thư mục frontend

```text
frontend/
├── index.html
├── login.html
├── member.html
├── trainer.html
├── admin.html
├── css/
│   └── style.css
└── js/
    ├── api.js
    ├── auth.js
    ├── member.js
    ├── trainer.js
    └── admin.js
```

## 3. Các trang giao diện

| Trang | Mục đích |
|---|---|
| `index.html` | Trang chủ giới thiệu hệ thống và tài khoản demo |
| `login.html` | Trang đăng nhập cho member, trainer và admin |
| `member.html` | Dashboard dành cho member |
| `trainer.html` | Dashboard dành cho trainer |
| `admin.html` | Dashboard dành cho admin |

## 4. Luồng đăng nhập theo role

Sau khi đăng nhập thành công, frontend sẽ lưu token và thông tin user vào localStorage, sau đó điều hướng theo role:

| Role | Trang đích |
|---|---|
| `member` | `member.html` |
| `trainer` | `trainer.html` |
| `admin` | `admin.html` |

## 5. Cách frontend gọi API bằng fetch

Frontend gọi backend qua file [frontend/js/api.js](../frontend/js/api.js). Mỗi request sử dụng `fetch` và tự động thêm header `Authorization` khi có token.

```js
const response = await fetch("http://127.0.0.1:3000/api/plans", {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
const data = await response.json();
```

## 6. Cách lưu token và session

Sau khi login thành công, frontend lưu dữ liệu như sau:

```js
localStorage.setItem("fitlife_token", token);
localStorage.setItem("fitlife_user", JSON.stringify(user));
```

## 7. Cách chạy frontend bằng Live Server

1. Khởi động backend:
   ```bash
   cd backend
   npm start
   ```
2. Mở thư mục frontend trong VS Code.
3. Nhấn chuột phải vào [frontend/index.html](../frontend/index.html) và chọn "Open with Live Server".
4. Truy cập giao diện qua URL của Live Server.

## 8. Tài khoản demo

| Vai trò | Email | Mật khẩu |
|---|---|---|
| Admin | admin@fitlife.com | 123456 |
| Trainer | trainer1@fitlife.com | 123456 |
| Member | member1@fitlife.com | 123456 |

## 9. Chức năng chính theo từng role

### Member

- Xem danh sách gói tập
- Đăng ký membership
- Xem thanh toán của mình
- Xem danh sách trainer
- Đặt lịch tập
- Xem lịch tập cá nhân

### Trainer

- Xem các lịch được giao
- Xác nhận lịch tập
- Hoàn thành hoặc hủy lịch tập

### Admin

- Xem toàn bộ membership
- Xem toàn bộ payments
- Xem toàn bộ schedules

## 10. Ghi chú thiết kế

Giao diện đã được tối ưu hóa cho màn hình rộng với layout gần full screen, container lớn, card nổi bật và font chữ rõ ràng. Trang login, landing page, member/trainer/admin dashboard đều được thiết kế để nhìn to, sáng và chuyên nghiệp hơn khi thuyết trình hoặc chiếu projector.
