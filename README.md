
FitLife Gym Management System
1. Giới thiệu dự án

FitLife Gym Management System là đồ án số 05 với chủ đề quản lý phòng gym và lịch tập. Hệ thống được thiết kế nhằm hỗ trợ phòng gym quản lý hội viên, gói tập, huấn luyện viên, lịch tập và thanh toán mô phỏng.

Đây là tài liệu thiết kế ban đầu cho dự án. Các chức năng backend, database, API và frontend sẽ được triển khai dần theo từng sprint.

2. Mục tiêu dự án
Quản lý thông tin hội viên.
Quản lý gói tập.
Quản lý huấn luyện viên.
Cho phép hội viên đăng ký gói tập.
Cho phép hội viên đặt lịch tập với huấn luyện viên.
Cho phép huấn luyện viên xác nhận và cập nhật trạng thái lịch tập.
Cho phép admin quản lý dữ liệu hệ thống.
Áp dụng kiểm thử, Git workflow, CI/CD và tài liệu hóa theo yêu cầu môn học.
3. Công nghệ dự kiến
Thành phầnCông nghệ
BackendNode.js, Express
DatabaseSQLite
APIREST API
AuthenticationJWT, bcryptjs
TestingJest, Supertest
Code QualityESLint
CI/CDGitHub Actions
FrontendHTML, CSS, JavaScript thuần
4. Vai trò người dùng
Vai tròMô tả
AdminQuản lý gói tập, hội viên, trainer, lịch tập, thanh toán
MemberĐăng ký gói tập, đặt lịch tập, xem lịch cá nhân
TrainerXem lịch dạy, xác nhận lịch, cập nhật trạng thái buổi tập
5. Chức năng dự kiến
Admin
Đăng nhập hệ thống.
Quản lý gói tập.
Quản lý hội viên.
Quản lý huấn luyện viên.
Xem danh sách lịch tập.
Xem danh sách thanh toán.
Member
Đăng ký tài khoản.
Đăng nhập.
Xem danh sách gói tập.
Đăng ký gói tập.
Xem danh sách trainer.
Đặt lịch tập.
Xem lịch tập cá nhân.
Xem lịch sử thanh toán.
Trainer
Đăng nhập.
Xem lịch dạy.
Xác nhận lịch tập.
Cập nhật trạng thái buổi tập.
6. Cấu trúc thư mục
fitlife-gym-management/
├── backend/
├── frontend/
├── docs/
├── .github/
│   └── workflows/
├── README.md
└── .gitignore
7. Cách chạy dự kiến
Backend
cd backend
npm install
npm run db:init
npm run db:seed
npm run dev
Frontend

Mở file:

frontend/index.html

hoặc dùng Live Server trong VS Code.

8. Tài khoản demo dự kiến
Vai tròEmailPassword
Adminadmin@fitlife.com123456
Trainertrainer1@fitlife.com123456
Membermember1@fitlife.com123456
9. Tài liệu dự án
01_PROJECT_OVERVIEW
02_DATABASE_DESIGN
03_USER_ROLES_RBAC
04_MODULES_AND_USECASES
05_API_DESIGN
06_DATA_MAPPING
07_BUSINESS_RULES
08_BACKEND_GUIDE
09_FRONTEND_GUIDE
10_TESTING_AND_DEPLOYMENT
11_GIT_WORKFLOW
12_SPRINT_PLAN
13_FINAL_TEST_CHECKLIST
14_DEMO_SCRIPT
15_REPORT_OUTLINE
16_TEAM_CODE_DISTRIBUTION
10. Git workflow

Dự án sử dụng branch theo sprint và feature:

main
docs/project-documentation
sprint-01-backend-foundation
sprint-02-auth-api
sprint-03-membership-plans
sprint-04-subscription-payment
sprint-05-trainer-schedule
sprint-06-frontend-ui
sprint-07-testing-ci
sprint-08-final-documentation

Quy tắc commit:

feat: thêm chức năng mới
fix: sửa lỗi
docs: cập nhật tài liệu
test: thêm hoặc sửa test
refactor: tối ưu code
chore: cấu hình, setup
11. SPQM

Đề tài 05 FitLife có trọng tâm SPQM:

L12: SMART-Q.
L13: Đo lường.

Các mục tiêu chất lượng sẽ được mô tả theo SMART-Q, Definition of Done và các metric như test pass rate, coverage, số lỗi, số commit, số pull request và API response time.

12. Trạng thái hiện tại
Đã khởi tạo repository.
Đã tạo cấu trúc thư mục.
Đã tạo tài liệu thiết kế ban đầu.
Backend, database, API và frontend sẽ được triển khai ở các sprint tiếp theo.
