
16. Phân công code nhóm
1. Tổng quan

Dự án FitLife được chia theo module để nhóm dễ quản lý công việc, dễ review code và dễ báo cáo tiến độ.

2. Bảng phân công chính
Thành viênVai tròBackend code phụ tráchFrontend code phụ tráchModule chính
Duy VinhBackend Core & Docsroutes, controllers, services, middlewaresHỗ trợ kết nối APIAuth, Plans, Schedule, Docs
Thành viên 2Frontend DeveloperHỗ trợ test APIindex, login, register, member dashboardUI Member
Thành viên 3Admin & Trainer UIHỗ trợ membership/payment APIadmin dashboard, trainer dashboardAdmin, Trainer
Thành viên 4Testing & QAtests, lint, CIKiểm tra UITesting, GitHub Actions, Report
3. Phân công theo module
Auth Module

Người phụ trách: Duy Vinh.

File dự kiến:

backend/src/routes/auth.routes.js
backend/src/controllers/auth.controller.js
backend/src/services/auth.service.js
backend/src/middlewares/auth.middleware.js
backend/tests/auth.test.js
Membership Plans Module

Người phụ trách: Duy Vinh.

File dự kiến:

backend/src/routes/plan.routes.js
backend/src/controllers/plan.controller.js
backend/src/services/plan.service.js
backend/tests/plan.test.js
Membership & Payment Module

Người phụ trách: Thành viên 3.

File dự kiến:

backend/src/routes/membership.routes.js
backend/src/controllers/membership.controller.js
backend/src/services/membership.service.js
backend/src/routes/payment.routes.js
backend/src/controllers/payment.controller.js
backend/tests/membership.test.js
Trainer & Schedule Module

Người phụ trách: Duy Vinh + Thành viên 3.

File dự kiến:

backend/src/routes/trainer.routes.js
backend/src/controllers/trainer.controller.js
backend/src/services/trainer.service.js
backend/src/routes/schedule.routes.js
backend/src/controllers/schedule.controller.js
backend/src/services/schedule.service.js
backend/tests/schedule.test.js
Frontend Module

Người phụ trách: Thành viên 2.

File dự kiến:

frontend/index.html
frontend/login.html
frontend/register.html
frontend/member-dashboard.html
frontend/admin-dashboard.html
frontend/trainer-dashboard.html
frontend/css/style.css
frontend/js/api.js
frontend/js/auth.js
frontend/js/member.js
frontend/js/admin.js
frontend/js/trainer.js
4. Quy tắc phối hợp
Không code trực tiếp trên main.
Mỗi module làm trên branch riêng.
Commit message rõ ràng.
Có Pull Request trước khi merge.
Cập nhật docs nếu thay đổi API hoặc database.
Test trước khi merge.
Không push file môi trường như .env.
5. Quy tắc review

Trước khi merge:

Code chạy được.
Không lỗi lint.
Không phá chức năng cũ.
Có test nếu là backend.
Tài liệu liên quan đã cập nhật.
