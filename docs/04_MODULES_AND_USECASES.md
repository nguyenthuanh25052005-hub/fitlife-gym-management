
# 04. Modules and Use Cases

## 1. Tổng quan module

Hệ thống FitLife dự kiến được chia thành các module nghiệp vụ để dễ triển khai, kiểm thử và phân công công việc. Cách chia module này cũng giúp tài liệu thiết kế bám sát luồng nghiệp vụ thực tế của đề tài 05.

Các module chính gồm:

- Auth Module
- Membership Plan Module
- Membership Module
- Trainer Module
- Schedule Module
- Payment Module

## 2. Auth Module

### Mục tiêu

Quản lý đăng ký, đăng nhập và phân quyền người dùng.

### Use cases dự kiến

- Member đăng ký tài khoản.
- User đăng nhập.
- User xem thông tin cá nhân.
- Backend kiểm tra JWT.
- Backend kiểm tra role trước khi cho phép truy cập.

## 3. Membership Plan Module

### Mục tiêu

Quản lý các gói tập của phòng gym.

### Use cases dự kiến

- Người dùng xem danh sách gói tập.
- Người dùng xem chi tiết gói tập.
- Admin thêm gói tập.
- Admin sửa gói tập.
- Admin xóa mềm gói tập.

## 4. Membership Module

### Mục tiêu

Quản lý việc hội viên đăng ký gói tập.

### Use cases dự kiến

- Member đăng ký gói tập.
- Member xem gói tập hiện tại.
- Admin xem danh sách đăng ký.
- Hệ thống tính ngày bắt đầu và ngày kết thúc theo gói đã chọn.

## 5. Trainer Module

### Mục tiêu

Quản lý huấn luyện viên.

### Use cases dự kiến

- Member xem danh sách trainer.
- Admin thêm trainer.
- Admin sửa thông tin trainer.
- Admin xóa trainer hoặc chuyển sang trạng thái ngừng hoạt động.
- Trainer được liên kết với tài khoản user có role `trainer`.

## 6. Schedule Module

### Mục tiêu

Quản lý lịch tập giữa member và trainer.

### Use cases dự kiến

- Member đặt lịch tập.
- Hệ thống kiểm tra membership còn hạn.
- Hệ thống kiểm tra lịch trainer có bị trùng không.
- Trainer xem lịch dạy.
- Trainer xác nhận lịch.
- Admin xem toàn bộ lịch.

## 7. Payment Module

### Mục tiêu

Mô phỏng thanh toán khi member đăng ký gói tập.

### Use cases dự kiến

- Tạo payment khi member đăng ký gói.
- Admin xem danh sách payment.
- Member xem payment của mình.
- Trạng thái payment gồm `paid`, `pending`, `failed`.

## 8. Luồng nghiệp vụ chính dự kiến

### Luồng đăng ký gói tập

Member đăng nhập -> Xem gói tập -> Chọn gói tập -> Gửi yêu cầu đăng ký -> Backend kiểm tra plan -> Tạo membership -> Tạo payment mô phỏng -> Trả kết quả thành công

### Luồng đặt lịch tập

Member đăng nhập -> Xem trainer -> Chọn ngày và giờ -> Backend kiểm tra membership active -> Backend kiểm tra trùng lịch -> Tạo lịch `pending` -> Trainer xác nhận -> Lịch chuyển sang `confirmed`

## 9. Ghi chú triển khai

- Các module trên là thiết kế dự kiến cho Level 1.
- Khi triển khai thực tế, mỗi module sẽ được tách thành controller, service và repository để dễ bảo trì.
- Use case nào liên quan đến quyền truy cập sẽ đi kèm middleware kiểm tra JWT và role.

