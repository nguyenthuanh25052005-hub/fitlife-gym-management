
12. Sprint Plan
Sprint 0: Project Setup
Goal

Khởi tạo repo, cấu trúc thư mục và tài liệu ban đầu.

Tasks
Tạo GitHub repository.
Tạo backend, frontend, docs.
Tạo README.md.
Tạo .gitignore.
Tạo GitHub workflow folder.
Output
Repo có cấu trúc rõ ràng.
Definition of Done
Push lên GitHub thành công.
README hiển thị trên GitHub.
Có docs ban đầu.
Sprint 1: Backend Foundation
Goal

Xây dựng nền tảng backend.

Tasks
Khởi tạo Node.js project.
Cài Express, SQLite, dotenv, cors.
Tạo app.js và server.js.
Tạo schema database.
Tạo seed data.
Tạo health check API.
Output
Backend chạy được.
Database tạo được.
Definition of Done
npm run dev chạy.
GET /api/health trả OK.
Sprint 2: Authentication
Goal

Xây dựng đăng ký, đăng nhập và JWT.

Tasks
Register API.
Login API.
Auth middleware.
Role middleware.
GET /auth/me.
Test Auth API.
Output
User đăng ký và đăng nhập được.
Definition of Done
Token hoạt động.
Password được hash.
Test Auth pass.
Sprint 3: Membership Plans
Goal

Quản lý gói tập.

Tasks
GET plans.
GET plan detail.
Admin create plan.
Admin update plan.
Admin soft delete plan.
Output
Plans API hoàn chỉnh.
Definition of Done
Admin CRUD được.
Member xem được gói.
Test pass.
Sprint 4: Membership and Payment
Goal

Member đăng ký gói tập và tạo payment mô phỏng.

Tasks
Subscribe plan.
Tạo membership.
Tính start_date và end_date.
Tạo payment.
Admin xem membership/payment.
Output
Đăng ký gói hoạt động.
Definition of Done
Không cho đăng ký plan inactive.
Payment được tạo.
Test pass.
Sprint 5: Trainer and Schedule
Goal

Member đặt lịch với trainer.

Tasks
Xem trainer.
Đặt lịch.
Kiểm tra membership active.
Kiểm tra trùng lịch.
Trainer xác nhận lịch.
Admin xem lịch.
Output
Schedule API hoàn chỉnh.
Definition of Done
Member đặt lịch được.
Không trùng lịch trainer.
Trainer cập nhật status được.
Sprint 6: Frontend UI
Goal

Xây dựng giao diện HTML/CSS/JS.

Tasks
Trang chủ.
Login.
Register.
Member dashboard.
Admin dashboard.
Trainer dashboard.
Gọi API bằng fetch.
Output
Frontend thao tác được với backend.
Definition of Done
Login điều hướng theo role.
Member đăng ký gói được.
Member đặt lịch được.
Admin xem dữ liệu được.
Sprint 7: Testing and CI
Goal

Hoàn thiện kiểm thử và CI.

Tasks
Viết test API chính.
Cấu hình ESLint.
Cấu hình GitHub Actions.
Tạo quality report.
Output
Test và lint chạy tự động.
Definition of Done
npm test pass.
npm run lint pass.
GitHub Actions pass.
Sprint 8: Final Documentation
Goal

Hoàn thiện tài liệu và demo.

Tasks
Cập nhật README.
Cập nhật docs API.
Viết demo script.
Viết checklist nộp bài.
Kiểm tra lại repo.
Output
Repo sẵn sàng nộp.
Definition of Done
README đầy đủ.
Docs đầy đủ.
Demo script có thể dùng thuyết trình.
