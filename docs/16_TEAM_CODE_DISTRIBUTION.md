\# 16. Phân công code nhóm



\## 1. Tổng quan phân công code



Dự án \*\*FitLife Gym Management System\*\* được chia theo module để mỗi thành viên phụ trách một phần cụ thể. Cách chia này giúp nhóm làm việc rõ ràng, dễ quản lý tiến độ, dễ review code và dễ trình bày khi báo cáo.



Mỗi thành viên sẽ phụ trách một nhóm chức năng, bao gồm cả phần backend, frontend, testing hoặc documentation liên quan đến module đó.



\---



\## 2. Bảng phân công chính



| Thành viên | Vai trò                                     | Backend code phụ trách                                                                                                                                                                                                                       | Frontend code phụ trách                                                                                       | Module chính                                  |

| ---------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |

| Thu Ánh    | Backend Core \& Database Developer           | `backend/src/app.js`<br>`backend/src/server.js`<br>`backend/src/config/`<br>`backend/src/database/`<br>`backend/src/database/schema.sql`<br>`backend/src/database/seed.js`                                                                   | Hỗ trợ kết nối API nếu cần                                                                                    | Core backend, SQLite database, cấu trúc dự án |

| Member 2   | Authentication \& RBAC Developer             | `backend/src/routes/auth.routes.js`<br>`backend/src/controllers/auth.controller.js`<br>`backend/src/services/auth.service.js`<br>`backend/src/middlewares/auth.middleware.js`<br>`backend/tests/auth.test.js`                                | `frontend/login.html`<br>`frontend/register.html`<br>`frontend/js/auth.js`                                    | Đăng ký, đăng nhập, JWT, phân quyền           |

| Member 3   | Membership Plans Developer                  | `backend/src/routes/plan.routes.js`<br>`backend/src/controllers/plan.controller.js`<br>`backend/src/services/plan.service.js`<br>`backend/tests/plan.test.js`                                                                                | `frontend/index.html`<br>`frontend/js/plans.js`                                                               | Quản lý gói tập                               |

| Member 4   | Membership \& Payment Developer              | `backend/src/routes/membership.routes.js`<br>`backend/src/controllers/membership.controller.js`<br>`backend/src/services/membership.service.js`<br>`backend/src/routes/payment.routes.js`<br>`backend/src/controllers/payment.controller.js` | `frontend/member-dashboard.html`<br>`frontend/js/member.js`                                                   | Đăng ký gói tập, payment mô phỏng             |

| Member 5   | Trainer \& Schedule Developer                | `backend/src/routes/trainer.routes.js`<br>`backend/src/controllers/trainer.controller.js`<br>`backend/src/services/trainer.service.js`<br>`backend/src/routes/schedule.routes.js`<br>`backend/src/controllers/schedule.controller.js`        | `frontend/trainer-dashboard.html`<br>`frontend/js/trainer.js`                                                 | Trainer, lịch tập, kiểm tra trùng lịch        |

| Member 6   | Frontend, Testing \& Documentation Developer | `backend/tests/`<br>`.github/workflows/ci.yml`<br>`backend/.eslintrc` hoặc `eslint.config.js`                                                                                                                                                | `frontend/css/style.css`<br>`frontend/js/api.js`<br>`frontend/admin-dashboard.html`<br>`frontend/js/admin.js` | Giao diện, test, CI/CD, README, docs          |



\---



\## 3. Phân công chi tiết theo module



\### 3.1 Backend Core \& Database



\*\*Người phụ trách:\*\* Thu Ánh



| Nội dung        | Chi tiết                                                                                                                                           |

| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |

| File phụ trách  | `backend/src/app.js`, `backend/src/server.js`, `backend/src/config/database.js`, `backend/src/database/schema.sql`, `backend/src/database/seed.js` |

| Công việc chính | Khởi tạo backend Node.js + Express, cấu hình SQLite, tạo schema database, tạo seed data, tạo health check API                                      |

| Kết quả cần đạt | Backend chạy được, database tạo được, có dữ liệu mẫu ban đầu                                                                                       |



\---



\### 3.2 Authentication \& RBAC



\*\*Người phụ trách:\*\* Member 2



| Nội dung        | Chi tiết                                                                                                                                                                |

| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

| File backend    | `backend/src/routes/auth.routes.js`, `backend/src/controllers/auth.controller.js`, `backend/src/services/auth.service.js`, `backend/src/middlewares/auth.middleware.js` |

| File frontend   | `frontend/login.html`, `frontend/register.html`, `frontend/js/auth.js`                                                                                                  |

| Công việc chính | Đăng ký, đăng nhập, hash password, JWT token, middleware xác thực, middleware phân quyền                                                                                |

| Kết quả cần đạt | User đăng ký/đăng nhập được, token hoạt động, phân quyền theo role Admin/Member/Trainer                                                                                 |



\---



\### 3.3 Membership Plans



\*\*Người phụ trách:\*\* Member 3



| Nội dung        | Chi tiết                                                                                                                  |

| --------------- | ------------------------------------------------------------------------------------------------------------------------- |

| File backend    | `backend/src/routes/plan.routes.js`, `backend/src/controllers/plan.controller.js`, `backend/src/services/plan.service.js` |

| File frontend   | `frontend/index.html`, `frontend/js/plans.js`                                                                             |

| Công việc chính | API xem gói tập, thêm gói tập, sửa gói tập, xóa mềm gói tập                                                               |

| Kết quả cần đạt | Admin CRUD gói tập được, Member xem được danh sách gói tập                                                                |



\---



\### 3.4 Membership \& Payment



\*\*Người phụ trách:\*\* Member 4



| Nội dung        | Chi tiết                                                                                                                                                                                                                             |

| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |

| File backend    | `backend/src/routes/membership.routes.js`, `backend/src/controllers/membership.controller.js`, `backend/src/services/membership.service.js`, `backend/src/routes/payment.routes.js`, `backend/src/controllers/payment.controller.js` |

| File frontend   | `frontend/member-dashboard.html`, `frontend/js/member.js`                                                                                                                                                                            |

| Công việc chính | Member đăng ký gói tập, tạo membership, tính ngày hết hạn, tạo payment mô phỏng                                                                                                                                                      |

| Kết quả cần đạt | Member đăng ký gói được, hệ thống tạo payment mô phỏng, Admin xem được danh sách đăng ký                                                                                                                                             |



\---



\### 3.5 Trainer \& Schedule



\*\*Người phụ trách:\*\* Member 5



| Nội dung        | Chi tiết                                                                                                                                                                                                                                                                  |

| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

| File backend    | `backend/src/routes/trainer.routes.js`, `backend/src/controllers/trainer.controller.js`, `backend/src/services/trainer.service.js`, `backend/src/routes/schedule.routes.js`, `backend/src/controllers/schedule.controller.js`, `backend/src/services/schedule.service.js` |

| File frontend   | `frontend/trainer-dashboard.html`, `frontend/js/trainer.js`                                                                                                                                                                                                               |

| Công việc chính | Quản lý trainer, đặt lịch tập, kiểm tra membership active, kiểm tra trùng lịch, trainer xác nhận lịch                                                                                                                                                                     |

| Kết quả cần đạt | Member đặt lịch được, không bị trùng lịch trainer, Trainer cập nhật trạng thái lịch được                                                                                                                                                                                  |



\---



\### 3.6 Frontend, Testing, CI/CD \& Documentation



\*\*Người phụ trách:\*\* Member 6



| Nội dung        | Chi tiết                                                                                                |

| --------------- | ------------------------------------------------------------------------------------------------------- |

| File frontend   | `frontend/css/style.css`, `frontend/js/api.js`, `frontend/admin-dashboard.html`, `frontend/js/admin.js` |

| File test/CI    | `backend/tests/`, `.github/workflows/ci.yml`, ESLint config                                             |

| File docs       | `README.md`, `docs/`                                                                                    |

| Công việc chính | Hoàn thiện giao diện, gom hàm gọi API, viết test, cấu hình GitHub Actions, cập nhật tài liệu            |

| Kết quả cần đạt | Frontend dùng được, test chạy được, GitHub Actions pass, tài liệu đầy đủ                                |



\---



\## 4. Quy tắc phối hợp Git



Mỗi thành viên làm việc trên branch riêng theo module.



| Thành viên | Branch đề xuất                  |

| ---------- | ------------------------------- |

| Thu Ánh    | `feature/backend-core-database` |

| Member 2   | `feature/auth-rbac`             |

| Member 3   | `feature/membership-plans`      |

| Member 4   | `feature/membership-payment`    |

| Member 5   | `feature/trainer-schedule`      |

| Member 6   | `feature/frontend-testing-docs` |



Quy trình làm việc:



```bash

git checkout main

git pull origin main

git checkout -b feature/module-name

```



Sau khi hoàn thành:



```bash

git add .

git commit -m "feat: implement module name"

git push origin feature/module-name

```



Sau đó tạo Pull Request vào `main`.



\---



\## 5. Quy tắc commit



| Prefix     | Ý nghĩa                 |

| ---------- | ----------------------- |

| `feat`     | Thêm chức năng mới      |

| `fix`      | Sửa lỗi                 |

| `docs`     | Cập nhật tài liệu       |

| `test`     | Thêm hoặc sửa test      |

| `refactor` | Tối ưu code             |

| `chore`    | Cấu hình, setup project |



Ví dụ:



```txt

feat: implement jwt authentication

feat: add membership plan api

fix: prevent duplicate trainer schedule

test: add auth integration tests

docs: update api design

chore: configure github actions

```



\---



\## 6. Quy tắc review code



Trước khi merge Pull Request vào `main`, cần kiểm tra:



\* Code chạy được.

\* Không lỗi lint.

\* Test pass.

\* Không commit file `.env`.

\* Không commit `node\_modules`.

\* Có cập nhật docs nếu thay đổi API hoặc database.

\* Không làm hỏng chức năng cũ.

\* Tên file, tên branch và commit rõ ràng.



\---



\## 7. Trách nhiệm khi demo



| Thành viên | Nội dung demo                                            |

| ---------- | -------------------------------------------------------- |

| Thu Ánh    | Giới thiệu tổng quan backend, database và cấu trúc dự án |

| Member 2   | Demo đăng ký, đăng nhập, JWT và phân quyền               |

| Member 3   | Demo quản lý gói tập                                     |

| Member 4   | Demo đăng ký gói tập và payment mô phỏng                 |

| Member 5   | Demo đặt lịch trainer và cập nhật trạng thái lịch        |

| Member 6   | Demo frontend, test, GitHub Actions và tài liệu          |



