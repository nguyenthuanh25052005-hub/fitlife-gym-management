
11. Git Workflow
1. Branch chính

Branch main là branch ổn định, dùng để nộp bài và demo.

Không nên code trực tiếp trên main sau khi dự án đã có cấu trúc.

2. Branch theo tài liệu
docs/project-documentation

Dùng để cập nhật README và docs.

3. Branch theo sprint
sprint-01-backend-foundation
sprint-02-auth-api
sprint-03-membership-plans
sprint-04-subscription-payment
sprint-05-trainer-schedule
sprint-06-frontend-ui
sprint-07-testing-ci
sprint-08-final-documentation
4. Branch theo feature
feature/auth-login
feature/plans-crud
feature/membership-subscribe
feature/schedule-booking
feature/frontend-member-dashboard
feature/admin-dashboard
5. Quy trình làm việc
git checkout main
git pull origin main
git checkout -b feature/module-name

Sau khi sửa code:

git add .
git commit -m "feat: implement module name"
git push origin feature/module-name

Sau đó tạo Pull Request vào main.

6. Quy tắc commit
PrefixÝ nghĩa
featThêm chức năng mới
fixSửa lỗi
docsCập nhật tài liệu
testThêm hoặc sửa test
refactorTối ưu code
choreCấu hình, setup
7. Ví dụ commit
chore: initialize FitLife project structure
docs: add project documentation
feat: implement jwt authentication
feat: add membership plan api
fix: prevent trainer schedule conflict
test: add auth integration tests
chore: configure github actions
8. Quy tắc Pull Request

Trước khi merge:

Code chạy được.
Không lỗi lint.
Test pass.
Không commit file .env.
Có cập nhật docs nếu thêm API.
Không làm hỏng chức năng cũ.
