
# 13. Final Test Checklist

## 1. Checklist GitHub

- [ ] Repository ở chế độ public hoặc đã cấp quyền truy cập cho giảng viên.
- [ ] `README.md` đã đầy đủ và dễ đọc.
- [ ] Có thư mục `backend`.
- [ ] Có thư mục `frontend`.
- [ ] Có thư mục `docs`.
- [ ] Có GitHub Actions workflow.
- [ ] Commit message rõ ràng, đúng quy ước.
- [ ] Không commit file `.env`.
- [ ] Không commit `node_modules`.

## 2. Checklist Backend

- [ ] Backend chạy được ở mức cơ bản.
- [ ] Có API health check.
- [ ] Có Auth API.
- [ ] Có Plans API.
- [ ] Có Membership API.
- [ ] Có Trainer API.
- [ ] Có Schedule API.
- [ ] Có Payment API.
- [ ] Có middleware JWT.
- [ ] Có middleware phân quyền.

## 3. Checklist Database

- [ ] Tạo được SQLite database.
- [ ] Có bảng `users`.
- [ ] Có bảng `membership_plans`.
- [ ] Có bảng `memberships`.
- [ ] Có bảng `trainers`.
- [ ] Có bảng `workout_schedules`.
- [ ] Có bảng `payments`.
- [ ] Có seed data demo.

## 4. Checklist Frontend

- [ ] Trang chủ hoạt động.
- [ ] Trang đăng ký hoạt động.
- [ ] Trang đăng nhập hoạt động.
- [ ] Member dashboard hoạt động.
- [ ] Admin dashboard hoạt động.
- [ ] Trainer dashboard hoạt động.
- [ ] Gọi API thành công.
- [ ] Token được lưu và gửi đúng.

## 5. Checklist Testing

- [ ] Jest chạy được.
- [ ] Supertest chạy được.
- [ ] Auth test pass.
- [ ] Plans test pass.
- [ ] Membership test pass.
- [ ] Schedule test pass.
- [ ] Coverage đạt mục tiêu.
- [ ] ESLint không có lỗi nghiêm trọng.

## 6. Checklist Docs

- [ ] Project overview đầy đủ.
- [ ] Database design đầy đủ.
- [ ] RBAC rõ ràng.
- [ ] API design đầy đủ.
- [ ] Sprint plan đầy đủ.
- [ ] Git workflow rõ ràng.
- [ ] Demo script có thể dùng.
- [ ] Team code distribution rõ ràng.

## 7. Checklist SPQM

- [ ] Có SMART-Q goals.
- [ ] Có Definition of Done.
- [ ] Có metric đo lường.
- [ ] Có baseline ban đầu.
- [ ] Có checklist cải tiến.
