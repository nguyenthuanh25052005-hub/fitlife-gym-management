
07. Business Rules
1. Quy tắc tài khoản
Email không được trùng.
Mật khẩu phải được mã hóa bằng bcryptjs.
User đăng ký từ frontend mặc định có role là member.
Role admin và trainer nên được tạo bằng seed data hoặc do admin quản lý.
2. Quy tắc đăng nhập
Người dùng phải nhập đúng email và password.
Nếu hợp lệ, backend trả về JWT token.
Frontend lưu token trong localStorage.
Các API cần xác thực phải gửi token qua Authorization header.
3. Quy tắc gói tập
Chỉ admin được thêm, sửa, xóa gói tập.
Người dùng chỉ xem được các gói có status active.
Xóa gói tập nên là soft delete bằng cách đổi status sang inactive.
Không cho member đăng ký gói inactive.
4. Quy tắc đăng ký gói tập
Member phải đăng nhập.
Plan phải tồn tại.
Plan phải active.
Khi đăng ký thành công:
Tạo record trong memberships.
Tạo start_date là ngày hiện tại.
Tạo end_date dựa theo duration_days.
Tạo payment mô phỏng.
5. Quy tắc thanh toán mô phỏng
Level 1 chưa tích hợp cổng thanh toán thật.
Khi đăng ký gói, hệ thống tạo payment với trạng thái paid để mô phỏng thành công.
Admin có thể xem danh sách payment.
Member chỉ xem payment của chính mình.
6. Quy tắc đặt lịch trainer
Member phải đăng nhập.
Member phải có membership active.
Trainer phải tồn tại.
Không được đặt lịch có thời gian kết thúc nhỏ hơn hoặc bằng thời gian bắt đầu.
Không được đặt lịch trùng với lịch đã có của trainer trong cùng ngày và khung giờ.
7. Quy tắc trạng thái lịch

Trạng thái lịch gồm:

StatusÝ nghĩa
pendingLịch mới tạo, chờ xác nhận
confirmedTrainer đã xác nhận
completedBuổi tập đã hoàn thành
cancelledLịch đã bị hủy
8. Quy tắc phân quyền
Admin có quyền quản lý toàn bộ.
Member chỉ thao tác trên dữ liệu cá nhân.
Trainer chỉ xem và cập nhật lịch liên quan đến mình.
API phải kiểm tra role trước khi xử lý nghiệp vụ quan trọng.
9. Quy tắc chất lượng
Mỗi module backend quan trọng cần có test.
API lỗi phải trả message rõ ràng.
Không trả password_hash về frontend.
Code phải qua ESLint.
Pull Request phải được kiểm tra trước khi merge.
