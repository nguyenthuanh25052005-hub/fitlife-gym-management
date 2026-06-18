
14. Demo Script
1. Chuẩn bị demo

Chạy backend:

cd backend
npm install
npm run db:init
npm run db:seed
npm run dev

Mở frontend bằng Live Server hoặc mở trực tiếp file:

frontend/index.html
2. Demo Admin
Bước 1: Đăng nhập

Tài khoản dự kiến:

Email: admin@fitlife.com
Password: 123456
Bước 2: Quản lý gói tập
Mở Admin Dashboard.
Xem danh sách gói tập.
Thêm gói tập mới.
Sửa thông tin gói tập.
Xóa mềm gói tập.
Bước 3: Xem đăng ký và thanh toán
Xem danh sách membership.
Xem danh sách payment.
Xem toàn bộ lịch tập.
3. Demo Member
Bước 1: Đăng ký tài khoản
Mở trang register.
Nhập họ tên, email, password, phone.
Tạo tài khoản member.
Bước 2: Đăng nhập
Mở trang login.
Đăng nhập bằng tài khoản vừa tạo.
Điều hướng vào member dashboard.
Bước 3: Đăng ký gói tập
Xem danh sách gói tập.
Chọn gói Basic/Standard/Premium.
Bấm đăng ký.
Kiểm tra gói hiện tại.
Bước 4: Đặt lịch tập
Xem danh sách trainer.
Chọn trainer.
Chọn ngày và giờ.
Bấm đặt lịch.
Xem lịch cá nhân.
4. Demo Trainer
Bước 1: Đăng nhập

Tài khoản dự kiến:

Email: trainer1@fitlife.com
Password: 123456
Bước 2: Xem lịch dạy
Mở trainer dashboard.
Xem danh sách lịch pending.
Bước 3: Xác nhận lịch
Chọn lịch.
Cập nhật status thành confirmed.
Kiểm tra lại bên member.
5. Demo Testing

Chạy:

cd backend
npm test
6. Demo ESLint

Chạy:

cd backend
npm run lint
7. Demo GitHub Actions
Mở tab Actions trên GitHub.
Kiểm tra workflow CI.
Xác nhận lint và test pass.
