
03. User Roles & RBAC
1. Tổng quan

Hệ thống FitLife sử dụng phân quyền theo vai trò RBAC để kiểm soát quyền truy cập API và giao diện.

Có 3 vai trò chính:

Admin
Member
Trainer
2. Admin

Admin là người quản lý hệ thống phòng gym.

Quyền dự kiến
Đăng nhập.
Quản lý gói tập.
Quản lý hội viên.
Quản lý trainer.
Xem toàn bộ lịch tập.
Xem danh sách đăng ký gói tập.
Xem danh sách thanh toán.
Cập nhật dữ liệu hệ thống.
3. Member

Member là hội viên sử dụng dịch vụ phòng gym.

Quyền dự kiến
Đăng ký tài khoản.
Đăng nhập.
Xem gói tập.
Đăng ký gói tập.
Xem trainer.
Đặt lịch tập.
Xem lịch tập cá nhân.
Xem thanh toán của mình.
4. Trainer

Trainer là huấn luyện viên của phòng gym.

Quyền dự kiến
Đăng nhập.
Xem lịch dạy cá nhân.
Xác nhận lịch tập.
Cập nhật trạng thái buổi tập.
5. Bảng phân quyền
Chức năngAdminMemberTrainer
Đăng ký tài khoảnKhôngCóKhông
Đăng nhậpCóCóCó
Xem gói tậpCóCóCó
Thêm gói tậpCóKhôngKhông
Sửa gói tậpCóKhôngKhông
Xóa gói tậpCóKhôngKhông
Đăng ký gói tậpKhôngCóKhông
Xem membership cá nhânKhôngCóKhông
Xem tất cả membershipCóKhôngKhông
Xem trainerCóCóCó
Đặt lịch tậpKhôngCóKhông
Xem lịch cá nhânKhôngCóCó
Xem toàn bộ lịchCóKhôngKhông
Cập nhật trạng thái lịchCóKhôngCó
Xem payment cá nhânKhôngCóKhông
Xem tất cả paymentCóKhôngKhông
6. Cách kiểm soát quyền

Backend dự kiến dùng:

Middleware authenticateToken để kiểm tra JWT.
Middleware authorizeRoles để kiểm tra role.

Ví dụ dự kiến:

GET /api/auth/me              -> cần đăng nhập
POST /api/plans               -> chỉ admin
POST /api/schedules           -> chỉ member
PUT /api/schedules/:id/status -> trainer hoặc admin
7. Nguyên tắc bảo mật
Không lưu mật khẩu dạng plain text.
Không trả password_hash về frontend.
Token cần được gửi qua header Authorization.
API quan trọng phải kiểm tra role.
