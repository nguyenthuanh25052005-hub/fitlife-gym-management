
# FitLife Gym Management System

FitLife Gym Management System là đồ án số 05 với chủ đề quản lý phòng gym và lịch tập. Repo hiện tại mới ở giai đoạn tài liệu hóa và thiết kế ban đầu; backend, database thật, REST API và frontend sẽ được triển khai dần trong các sprint tiếp theo.

## 1. Mục tiêu dự án

Mục tiêu của FitLife là thiết kế một hệ thống web hỗ trợ phòng gym quản lý hội viên, gói tập, huấn luyện viên, lịch tập và thanh toán mô phỏng theo hướng dễ mở rộng, dễ kiểm thử và dễ trình bày trong đồ án.

Các mục tiêu chính:

- Quản lý thông tin người dùng theo vai trò Admin, Member và Trainer.
- Thiết kế luồng đăng ký gói tập, đặt lịch tập và thanh toán mô phỏng.
- Dự kiến áp dụng JWT, bcryptjs, Jest, Supertest, ESLint và GitHub Actions.
- Xây dựng tài liệu phân tích, thiết kế và kế hoạch sprint rõ ràng.

## 2. Chức năng dự kiến

### Admin

- Đăng nhập hệ thống.
- Quản lý gói tập.
- Quản lý hội viên.
- Quản lý huấn luyện viên.
- Xem lịch tập và thanh toán.

### Member

- Đăng ký và đăng nhập tài khoản.
- Xem danh sách gói tập.
- Đăng ký gói tập.
- Xem danh sách trainer.
- Đặt lịch tập với trainer.
- Xem lịch tập và thanh toán cá nhân.

### Trainer

- Đăng nhập hệ thống.
- Xem lịch dạy cá nhân.
- Xác nhận lịch tập.
- Cập nhật trạng thái buổi tập.

## 3. Tech stack dự kiến

| Thành phần | Công nghệ dự kiến |
|---|---|
| Backend | Node.js, Express |
| Database | SQLite |
| API | REST API |
| Authentication | JWT, bcryptjs |
| Testing | Jest, Supertest |
| Code quality | ESLint |
| CI/CD | GitHub Actions |
| Frontend | HTML, CSS, JavaScript thuần |

## 4. Cấu trúc thư mục hiện tại

```text
fitlife-gym-management/
├── backend/
├── frontend/
├── docs/
├── .gitignore
└── README.md
```

> Ghi chú: `backend/` và `frontend/` hiện mới là khung thư mục, chưa có code nghiệp vụ thực tế. Các sprint sau sẽ bổ sung dần cấu trúc triển khai chi tiết.

## 5. Lộ trình phát triển theo sprint

| Sprint | Mục tiêu dự kiến | Kết quả mong đợi |
|---|---|---|
| Sprint 0 | Khởi tạo tài liệu và khung dự án | README, docs, cấu trúc repo, kế hoạch tổng quan |
| Sprint 1 | Nền tảng backend | Cấu trúc Express, cấu hình môi trường, chuẩn bị SQLite |
| Sprint 2 | Auth | Đăng ký, đăng nhập, JWT, bcryptjs, middleware phân quyền |
| Sprint 3 | Membership plan | CRUD gói tập, danh sách và chi tiết gói |
| Sprint 4 | Membership và payment | Đăng ký gói, tạo thanh toán mô phỏng, xem lịch sử |
| Sprint 5 | Trainer và schedule | Quản lý trainer, đặt lịch, kiểm tra trùng lịch |
| Sprint 6 | Frontend cơ bản | Giao diện HTML/CSS/JavaScript và luồng điều hướng |
| Sprint 7 | Testing và CI/CD | Jest, Supertest, ESLint, GitHub Actions |
| Sprint 8 | Hoàn thiện báo cáo | Rà soát tài liệu, checklist, demo và chốt đồ án |

## 6. Tài liệu dự án

- [01_PROJECT_OVERVIEW](docs/01_PROJECT_OVERVIEW.md)
- [02_DATABASE_DESIGN](docs/02_DATABASE_DESIGN.md)
- [03_USER_ROLES_RBAC](docs/03_USER_ROLES_RBAC.md)
- [04_MODULES_AND_USECASES](docs/04_MODULES_AND_USECASES.md)
- [05_API_DESIGN](docs/05_API_DESIGN.md)
- [06_DATA_MAPPING](docs/06_DATA_MAPPING.md)
- [07_BUSINESS_RULES](docs/07_BUSINESS_RULES.md)
- [08_BACKEND_GUIDE](docs/08_BACKEND_GUIDE.md)
- [09_FRONTEND_GUIDE](docs/09_FRONTEND_GUIDE.md)
- [10_TESTING_AND_DEPLOYMENT](docs/10_TESTING_AND_DEPLOYMENT.md)
- [11_GIT_WORKFLOW](docs/11_GIT_WORKFLOW.md)
- [12_SPRINT_PLAN](docs/12_SPRINT_PLAN.md)
- [13_FINAL_TEST_CHECKLIST](docs/13_FINAL_TEST_CHECKLIST.md)
- [14_DEMO_SCRIPT](docs/14_DEMO_SCRIPT.md)
- [15_REPORT_OUTLINE](docs/15_REPORT_OUTLINE.md)
- [16_TEAM_CODE_DISTRIBUTION](docs/16_TEAM_CODE_DISTRIBUTION.md)

## 7. Git workflow

Dự án dự kiến dùng nhánh `main` làm nhánh chính, kết hợp các nhánh theo sprint và theo feature để dễ kiểm soát tiến độ.

Nhánh tham khảo:

- `main`
- `docs/project-documentation`
- `sprint-01-backend-foundation`
- `sprint-02-auth-api`
- `sprint-03-membership-plans`
- `sprint-04-subscription-payment`
- `sprint-05-trainer-schedule`
- `sprint-06-frontend-ui`
- `sprint-07-testing-ci`
- `sprint-08-final-documentation`

Quy ước commit dự kiến:

- `feat`: thêm chức năng mới
- `fix`: sửa lỗi
- `docs`: cập nhật tài liệu
- `test`: thêm hoặc sửa test
- `refactor`: tối ưu code
- `chore`: cấu hình, setup

## 8. Testing và CI/CD

Trong các sprint sau, dự án sẽ bổ sung:

- Test API bằng Jest và Supertest.
- Kiểm tra chất lượng code bằng ESLint.
- Pipeline CI/CD trên GitHub Actions để chạy test và lint tự động.
- Checklist kiểm thử và tài liệu xác nhận đầu ra từng sprint.

## 9. Tài khoản demo dự kiến

| Vai trò | Email | Password |
|---|---|---|
| Admin | admin@fitlife.com | 123456 |
| Trainer | trainer1@fitlife.com | 123456 |
| Member | member1@fitlife.com | 123456 |

## 10. Trạng thái hiện tại

- Repository đã được khởi tạo.
- Cấu trúc thư mục cơ bản đã có sẵn.
- Bộ tài liệu thiết kế ban đầu đang được hoàn thiện.
- Backend, database, API và frontend sẽ được triển khai ở các sprint tiếp theo.
