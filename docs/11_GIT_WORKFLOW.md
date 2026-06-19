
# 11. Git Workflow

## 1. Branch chính

| Branch | Vai trò |
|---|---|
| `main` | Branch ổn định, dùng để nộp bài và demo |

Sau khi dự án đã vào nhịp làm việc, không nên code trực tiếp trên `main`.

## 2. Branch theo tài liệu

| Branch | Mục đích |
|---|---|
| `docs/project-documentation` | Dùng để cập nhật README và docs |

## 3. Branch theo sprint

| Branch | Mục đích |
|---|---|
| `sprint-01-backend-foundation` | Sprint 1: Backend Foundation |
| `sprint-02-auth-api` | Sprint 2: Authentication |
| `sprint-03-membership-plans` | Sprint 3: Membership Plans |
| `sprint-04-subscription-payment` | Sprint 4: Membership and Payment |
| `sprint-05-trainer-schedule` | Sprint 5: Trainer and Schedule |
| `sprint-06-frontend-ui` | Sprint 6: Frontend UI |
| `sprint-07-testing-ci` | Sprint 7: Testing and CI |
| `sprint-08-final-documentation` | Sprint 8: Final Documentation |

## 4. Branch theo feature

| Branch | Mục đích |
|---|---|
| `feature/auth-login` | Chức năng đăng nhập |
| `feature/plans-crud` | Quản lý gói tập |
| `feature/membership-subscribe` | Đăng ký gói tập |
| `feature/schedule-booking` | Đặt lịch trainer |
| `feature/frontend-member-dashboard` | Dashboard cho member |
| `feature/admin-dashboard` | Dashboard cho admin |

## 5. Quy trình làm việc Git

| Bước | Mô tả |
|---|---|
| 1 | Cập nhật `main` từ remote |
| 2 | Tạo branch từ `main` theo sprint hoặc feature |
| 3 | Thực hiện thay đổi trong branch riêng |
| 4 | Commit theo quy ước |
| 5 | Push branch lên GitHub |
| 6 | Tạo Pull Request vào `main` |
| 7 | Rà soát code, test, lint và docs trước khi merge |

Ví dụ lệnh làm việc:

```bash
git checkout main
git pull origin main
git checkout -b feature/module-name

git add .
git commit -m "feat: implement module name"
git push origin feature/module-name
```

## 6. Quy tắc commit

| Prefix | Ý nghĩa |
|---|---|
| `feat` | Thêm chức năng mới |
| `fix` | Sửa lỗi |
| `docs` | Cập nhật tài liệu |
| `test` | Thêm hoặc sửa test |
| `refactor` | Tối ưu code |
| `chore` | Cấu hình, setup |

## 7. Ví dụ commit

| Commit | Ý nghĩa |
|---|---|
| `chore: initialize FitLife project structure` | Khởi tạo cấu trúc dự án |
| `docs: add project documentation` | Thêm tài liệu dự án |
| `feat: implement jwt authentication` | Xây dựng xác thực JWT |
| `feat: add membership plan api` | Thêm API plan |
| `fix: prevent trainer schedule conflict` | Sửa lỗi trùng lịch trainer |
| `test: add auth integration tests` | Thêm test Auth |
| `chore: configure github actions` | Cấu hình GitHub Actions |

## 8. Quy tắc Pull Request

Trước khi merge vào `main`, PR cần thỏa các điều kiện sau:

| Điều kiện | Mô tả |
|---|---|
| Code chạy được | Không bị lỗi cơ bản khi chạy |
| Không lỗi lint | ESLint không báo lỗi nghiêm trọng |
| Test pass | Bộ test chính phải pass |
| Không commit file nhạy cảm | Không commit `.env`, `node_modules` và các file sinh ra cục bộ |
| Có cập nhật docs nếu cần | Nếu thêm API/chức năng thì docs phải được cập nhật |
| Không phá vỡ chức năng cũ | Thay đổi mới không làm hỏng luồng đang có |
