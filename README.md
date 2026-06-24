
# FitLife Gym Management System

FitLife Gym Management System là hệ thống quản lý phòng gym mô phỏng với các module: hội viên, gói tập, trainer, lịch tập và thanh toán. Dự án đã hoàn thành Sprint 0 đến Sprint 7 và đang ở Sprint 8 để hoàn thiện tài liệu nộp bài cuối cùng. Hệ thống hiện có backend Node.js + Express, database SQLite, frontend web HTML/CSS/JavaScript, kiểm thử Jest/Supertest, ESLint, GitHub Actions CI và tài liệu SPQM.

## 1. Trạng thái hiện tại
- Backend: hoạt động ổn định với các API chính cho auth, plans, memberships, payments, trainers và schedules.
- Frontend: có các trang index, login, member, trainer và admin để thao tác luồng nghiệp vụ chính.
- Testing: đã bổ sung Jest + Supertest và chạy thành công.
- QA/CI: có ESLint và GitHub Actions cho lint + test.
- Docs: README, hướng dẫn backend/frontend, demo script, SPQM report, checklist nộp bài đã được cập nhật.

## 2. Mức độ hoàn thành (3-Level Model)
### Level 1 – Đã hoàn thành
- REST API Node.js + Express
- SQLite
- Jest + Supertest
- ESLint
- GitHub Actions CI cơ bản
- Git workflow và docs

### Level 2 – Hoàn thành một phần
- Auth JWT + phân quyền: đã hoàn thành
- Workflow nghiệp vụ chính: đã hoàn thành
- Review code / Pull Request: đã áp dụng qua sprint branch và PR
- Quality gate nâng cao SonarQube/SonarCloud: optional, chưa triển khai

### Level 3 – Ngoài phạm vi hiện tại
- Microservices, Redis, load test, Prometheus/Grafana, quality gate tự động chặn pipeline

## 3. Tech stack
- Backend: Node.js, Express, JWT, bcryptjs, SQLite
- Frontend: HTML, CSS, JavaScript thuần
- Testing: Jest, Supertest
- Quality: ESLint
- CI/CD: GitHub Actions

## 4. Chức năng đã hoàn thành
### Admin
- Đăng nhập
- Xem memberships
- Xem payments
- Xem schedules

### Member
- Đăng nhập
- Xem plans
- Đăng ký gói tập
- Xem membership
- Xem payment
- Xem trainer
- Đặt lịch
- Xem lịch của mình

### Trainer
- Đăng nhập
- Xem lịch được phân công
- Cập nhật trạng thái lịch: confirmed/completed/cancelled

## 5. Cấu trúc thư mục
```text
fitlife-gym-management/
├── backend/
│   ├── src/
│   ├── tests/
│   └── package.json
├── frontend/
│   ├── css/
│   └── js
├── docs/
├── .github/workflows/
└── README.md
```

## 6. Hướng dẫn chạy dự án
### Backend
```bash
cd backend
npm install
npm run db:init
npm run db:seed
npm start
```
Backend sẽ chạy tại http://127.0.0.1:3000/api

### Frontend
Mở thư mục frontend trong VS Code và chạy bằng Live Server hoặc mở file index.html bằng trình duyệt.

## 7. Tài khoản demo
| Vai trò | Email | Mật khẩu |
|---|---|---|
| Admin | admin@fitlife.com | 123456 |
| Trainer | trainer1@fitlife.com | 123456 |
| Trainer 2 | trainer2@fitlife.com | 123456 |
| Member | member1@fitlife.com | 123456 |

## 8. API chính
| Method | Endpoint | Vai trò | Mô tả |
|---|---|---|---|
| GET | /api/health | Public | Health check |
| POST | /api/auth/login | Public | Đăng nhập |
| GET | /api/auth/profile | Authenticated | Xem profile |
| GET | /api/plans | Public | Xem danh sách gói tập |
| POST | /api/memberships/subscribe | Member | Đăng ký gói tập |
| GET | /api/memberships/me | Member | Xem membership của mình |
| GET | /api/memberships | Admin | Xem toàn bộ membership |
| GET | /api/payments/me | Member | Xem thanh toán của mình |
| GET | /api/payments | Admin | Xem toàn bộ thanh toán |
| GET | /api/trainers | Authenticated | Xem danh sách trainer |
| POST | /api/schedules | Member | Đặt lịch |
| GET | /api/schedules/me | Member | Xem lịch của mình |
| GET | /api/schedules/trainer/me | Trainer | Xem lịch của trainer |
| PATCH | /api/schedules/:id/status | Trainer | Cập nhật trạng thái lịch |
| GET | /api/schedules | Admin | Xem toàn bộ lịch |

## 9. Test, lint và CI

```bash
cd backend
npm run lint
npm test
```
Kết quả kiểm thử hiện tại:

- ESLint: Passed
- Test framework: Jest + Supertest
- Total tests: 35 passed
- Coverage: 76.92%
- GitHub Actions: Passed after database setup fix

GitHub Actions workflow nằm tại:
```text
.github/workflows/ci.yml
```

## 10. Git workflow
- main/master: nhánh chính ổn định
- sprint-<number>: nhánh phát triển cho từng sprint
- Pull Request: review trước khi merge
- Commit convention: feat:, fix:, docs:, test:, chore:

## 11. Tài liệu liên quan
- [docs/01_PROJECT_OVERVIEW.md](docs/01_PROJECT_OVERVIEW.md)
- [docs/02_DATABASE_DESIGN.md](docs/02_DATABASE_DESIGN.md)
- [docs/03_USER_ROLES_RBAC.md](docs/03_USER_ROLES_RBAC.md)
- [docs/04_MODULES_AND_USECASES.md](docs/04_MODULES_AND_USECASES.md)
- [docs/05_API_DESIGN.md](docs/05_API_DESIGN.md)
- [docs/06_DATA_MAPPING.md](docs/06_DATA_MAPPING.md)
- [docs/07_BUSINESS_RULES.md](docs/07_BUSINESS_RULES.md)
- [docs/08_BACKEND_GUIDE.md](docs/08_BACKEND_GUIDE.md)
- [docs/09_FRONTEND_GUIDE.md](docs/09_FRONTEND_GUIDE.md)
- [docs/10_TESTING_AND_DEPLOYMENT.md](docs/10_TESTING_AND_DEPLOYMENT.md)
- [docs/11_GIT_WORKFLOW.md](docs/11_GIT_WORKFLOW.md)
- [docs/12_SPRINT_PLAN.md](docs/12_SPRINT_PLAN.md)
- [docs/13_FINAL_TEST_CHECKLIST.md](docs/13_FINAL_TEST_CHECKLIST.md)
- [docs/14_DEMO_SCRIPT.md](docs/14_DEMO_SCRIPT.md)
- [docs/15_REPORT_OUTLINE.md](docs/15_REPORT_OUTLINE.md)
- [docs/16_TEAM_CODE_DISTRIBUTION.md](docs/16_TEAM_CODE_DISTRIBUTION.md)
- [docs/17_SPQM_REPORT.md](docs/17_SPQM_REPORT.md)
- [docs/18_SUBMISSION_CHECKLIST.md](docs/18_SUBMISSION_CHECKLIST.md)
- [docs/19_MANUAL_DELIVERABLES.md](docs/19_MANUAL_DELIVERABLES.md)

## 12. Checklist nộp bài
- [x] README đầy đủ
- [x] Backend có API chạy được
- [x] Frontend web có thể demo
- [x] Test và lint được thiết lập
- [x] Jest/Supertest tests passed: 35 tests
- [x] Coverage đạt 76.92% >= 70%
- [x] GitHub Actions workflow có sẵn
- [x] GitHub Actions PASS
- [ ] Screenshot GitHub Actions PASS
- [ ] Screenshot coverage report
- [ ] Screenshot giao diện web
- [ ] Screenshot SonarQube dashboard nếu triển khai Level 2 quality gate
- [ ] Video demo <= 5 phút
- [ ] Báo cáo Word/PDF nếu giảng viên yêu cầu

## 13. Sprint completion status

| Sprint | Nội dung | Trạng thái |
|---|---|---|
| Sprint 0 | Khởi tạo repo, README và docs | Completed |
| Sprint 1 | Backend foundation, Express, SQLite setup | Completed |
| Sprint 2 | Authentication, JWT, role-based access control | Completed |
| Sprint 3 | Membership plans API | Completed |
| Sprint 4 | Membership subscription and mock payment | Completed |
| Sprint 5 | Trainer and schedule workflow | Completed |
| Sprint 6 | Frontend web UI | Completed |
| Sprint 7 | Testing, ESLint, GitHub Actions CI, SPQM docs | Completed |
| Sprint 8 | Final documentation and submission preparation | In progress |

## 14. Final manual deliverables

Before final submission, the following manual items should be prepared:

- Screenshot of GitHub Actions PASS
- Screenshot of coverage report showing 76.92%
- Screenshots of frontend web pages
- Video demo under 5 minutes
- Google Drive link for demo video
- Final Word/PDF report if required by instructor
- SonarQube/SonarCloud screenshot if Level 2 quality gate is required


