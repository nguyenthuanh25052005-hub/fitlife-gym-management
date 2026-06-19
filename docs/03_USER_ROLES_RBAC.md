
# 03. User Roles & RBAC

## 1. Tổng quan

Hệ thống FitLife dự kiến áp dụng mô hình phân quyền theo vai trò RBAC để kiểm soát quyền truy cập API và giao diện. Thiết kế này giúp tách biệt rõ trách nhiệm giữa Admin, Member và Trainer, đồng thời giảm rủi ro truy cập sai chức năng.

RBAC sẽ được dùng xuyên suốt ở backend và đồng bộ với luồng hiển thị của frontend trong các sprint sau.

Ba vai trò chính gồm:

- Admin
- Member
- Trainer

## 2. Role Admin

Admin là người quản lý toàn bộ hệ thống phòng gym.

### Quyền dự kiến

- Đăng nhập hệ thống.
- Quản lý gói tập.
- Quản lý hội viên.
- Quản lý trainer.
- Xem toàn bộ lịch tập.
- Xem danh sách đăng ký gói tập.
- Xem danh sách thanh toán.
- Cập nhật dữ liệu hệ thống.

## 3. Role Member

Member là hội viên sử dụng dịch vụ phòng gym.

### Quyền dự kiến

- Đăng ký tài khoản.
- Đăng nhập hệ thống.
- Xem danh sách gói tập.
- Đăng ký gói tập.
- Xem danh sách trainer.
- Đặt lịch tập.
- Xem lịch tập cá nhân.
- Xem thanh toán của mình.

## 4. Role Trainer

Trainer là huấn luyện viên của phòng gym.

### Quyền dự kiến

- Đăng nhập hệ thống.
- Xem lịch dạy cá nhân.
- Xác nhận lịch tập.
- Cập nhật trạng thái buổi tập.

## 5. Bảng phân quyền dự kiến

| Chức năng | Admin | Member | Trainer |
|---|---:|---:|---:|
| Đăng ký tài khoản | Không | Có | Không |
| Đăng nhập | Có | Có | Có |
| Xem gói tập | Có | Có | Có |
| Thêm gói tập | Có | Không | Không |
| Sửa gói tập | Có | Không | Không |
| Xóa gói tập | Có | Không | Không |
| Đăng ký gói tập | Không | Có | Không |
| Xem membership cá nhân | Không | Có | Không |
| Xem tất cả membership | Có | Không | Không |
| Xem trainer | Có | Có | Có |
| Đặt lịch tập | Không | Có | Không |
| Xem lịch cá nhân | Không | Có | Có |
| Xem toàn bộ lịch | Có | Không | Không |
| Cập nhật trạng thái lịch | Có | Không | Có |
| Xem payment cá nhân | Không | Có | Không |
| Xem tất cả payment | Có | Không | Không |

## 6. Cách kiểm soát quyền dự kiến

Backend dự kiến sẽ dùng:

- Middleware `authenticateToken` để kiểm tra JWT.
- Middleware `authorizeRoles` để kiểm tra role.

Ví dụ kiểm soát quyền dự kiến:

- `GET /api/auth/me` cần đăng nhập.
- `POST /api/plans` chỉ dành cho Admin.
- `POST /api/schedules` chỉ dành cho Member.
- `PUT /api/schedules/:id/status` dành cho Trainer hoặc Admin.

## 7. Nguyên tắc bảo mật dự kiến

- Không lưu mật khẩu dạng plain text.
- Không trả `password_hash` về frontend.
- Token dự kiến được gửi qua header `Authorization`.
- API quan trọng phải kiểm tra đăng nhập và role trước khi xử lý.
