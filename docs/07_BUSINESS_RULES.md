
# 07. Business Rules

## 1. Quy tắc tài khoản

| Quy tắc | Mô tả |
|---|---|
| Email không được trùng | Mỗi user chỉ được dùng một email duy nhất trong hệ thống |
| Mật khẩu phải được mã hóa | Password hiện có được hash bằng bcryptjs trước khi lưu |
| Role mặc định khi đăng ký | User đăng ký từ frontend mặc định có role `member` |
| Role admin và trainer | Hiện có được tạo bằng seed data hoặc do admin quản lý |

## 2. Quy tắc đăng nhập

| Quy tắc | Mô tả |
|---|---|
| Xác thực thông tin | Người dùng phải nhập đúng email và password |
| Phát hành token | Nếu hợp lệ, backend sẽ trả JWT token |
| Lưu token | Frontend sẽ lưu token trong `localStorage` |
| Gửi token khi gọi API | Các API cần xác thực sẽ gửi token qua header `Authorization` |

## 3. Quy tắc gói tập

| Quy tắc | Mô tả |
|---|---|
| Quyền quản lý | Chỉ Admin được thêm, sửa, xóa gói tập |
| Trạng thái hiển thị | Người dùng chỉ xem các gói có trạng thái `active` |
| Xóa gói | Hiện có dùng soft delete bằng cách đổi `status` sang `inactive` |
| Đăng ký gói | Member không được đăng ký gói `inactive` |

## 4. Quy tắc đăng ký gói tập

| Quy tắc | Mô tả |
|---|---|
| Điều kiện người dùng | Member phải đăng nhập |
| Điều kiện plan | Plan phải tồn tại |
| Trạng thái plan | Plan phải ở trạng thái `active` |
| Tạo membership | Khi đăng ký thành công, backend tạo record trong `memberships` |
| Tạo ngày hiệu lực | `start_date` là ngày hiện tại, `end_date` dựa theo `duration_days` |
| Tạo payment | Backend tạo payment mô phỏng sau khi đăng ký |

## 5. Quy tắc thanh toán mô phỏng

| Quy tắc | Mô tả |
|---|---|
| Chưa tích hợp cổng thanh toán | Level 1 chưa dùng payment gateway thật |
| Trạng thái mặc định | Khi đăng ký gói, hệ thống hiện có tạo payment với trạng thái `paid` |
| Quyền xem payment | Admin xem tất cả payment, Member chỉ xem payment của chính mình |

## 6. Quy tắc đặt lịch trainer

| Quy tắc | Mô tả |
|---|---|
| Điều kiện người đặt | Member phải đăng nhập |
| Điều kiện membership | Member phải có membership `active` |
| Điều kiện trainer | Trainer phải tồn tại |
| Hợp lệ thời gian | `end_time` phải lớn hơn `start_time` |
| Chống trùng lịch | Không đặt lịch trùng với lịch đã có của trainer trong cùng ngày và khung giờ |

## 7. Quy tắc trạng thái lịch

| Status | Ý nghĩa |
|---|---|
| `pending` | Lịch mới tạo, chờ xác nhận |
| `confirmed` | Trainer đã xác nhận |
| `completed` | Buổi tập đã hoàn thành |
| `cancelled` | Lịch đã bị hủy |

## 8. Quy tắc phân quyền

| Vai trò | Quyền chính |
|---|---|
| Admin | Quản lý toàn bộ hệ thống, dữ liệu và các trạng thái quan trọng |
| Member | Chỉ thao tác trên dữ liệu cá nhân và các luồng đăng ký/đặt lịch của mình |
| Trainer | Chỉ xem và cập nhật các lịch liên quan đến mình |

| Quy tắc | Mô tả |
|---|---|
| Kiểm tra role | API phải kiểm tra role trước khi xử lý các nghiệp vụ quan trọng |
| Kiểm tra token | Các API bảo vệ phải xác thực JWT trước khi cho phép truy cập |

## 9. Quy tắc chất lượng

| Quy tắc | Mô tả |
|---|---|
| Test cho module quan trọng | Mỗi module backend quan trọng cần có test |
| Thông báo lỗi rõ ràng | API lỗi phải trả message dễ hiểu và nhất quán |
| Bảo mật dữ liệu | Không trả `password_hash` về frontend |
| Kiểm tra lint | Code phải đi qua ESLint |
| Kiểm tra PR | Pull Request phải được rà soát trước khi merge |
