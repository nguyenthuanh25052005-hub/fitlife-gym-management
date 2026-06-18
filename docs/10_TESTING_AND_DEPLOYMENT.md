
10. Testing and Deployment
1. Tổng quan

Dự án dự kiến áp dụng kiểm thử và CI/CD cơ bản để đảm bảo chất lượng mã nguồn.

2. Công cụ kiểm thử
Công cụMục đích
JestUnit test
SupertestIntegration test REST API
ESLintKiểm tra chất lượng code
GitHub ActionsChạy test/lint tự động
3. Test dự kiến

Các module cần test:

Auth API.
Plans API.
Membership API.
Schedule API.
Payment API.
4. Test cases dự kiến
NhómTest case
AuthRegister thành công
AuthKhông cho register email trùng
AuthLogin thành công
AuthLogin sai password
AuthGET /auth/me với token hợp lệ
PlansXem danh sách gói
PlansAdmin tạo gói
PlansMember không được tạo gói
MembershipMember đăng ký gói
MembershipKhông đăng ký gói inactive
ScheduleMember đặt lịch
ScheduleKhông cho đặt lịch trùng trainer
ScheduleTrainer xác nhận lịch
5. Lệnh chạy test dự kiến
cd backend
npm test
6. Lệnh chạy lint dự kiến
cd backend
npm run lint
7. Coverage mục tiêu

Mục tiêu Level 1:

Coverage >= 70%
Test pass rate = 100%
8. GitHub Actions dự kiến

File:

.github/workflows/ci.yml

Workflow dự kiến:

checkout
setup node
npm install
npm run lint
npm test
9. Deployment

Level 1 chưa bắt buộc deploy thật. Nếu triển khai, có thể dùng:

Render.
Railway.
Vercel cho frontend static.
GitHub Pages cho frontend nếu tách riêng.
10. SPQM metrics
MetricMục tiêu
Test pass rate100%
Coverage>= 70%
API response time< 500ms
Bug countGiảm qua sprint
Commit countCó commit theo sprint
PR countCó PR cho module chính
Issue countCó issue tracking nếu cần
