# SPQM Report

## 1. Quy trình nhóm / SDLC
- Dự án dùng mô hình phát triển theo sprint với các nhánh sprint như sprint-6, sprint-7.
- Phân chia công việc theo module: backend, frontend, docs, QA/testing, CI/CD.
- Mỗi sprint kết thúc với kiểm thử thủ công, kiểm thử tự động tại backend và cập nhật tài liệu.

## 2. Definition of Done
- API chính chạy đúng và có thể gọi từ frontend.
- Test backend chạy thành công qua Jest/Supertest.
- ESLint không báo lỗi.
- README và docs cập nhật đầy đủ.
- Demo account và workflow nghiệp vụ có thể trình bày.

## 3. Backlog và ưu tiên
- P0: auth, plans, membership, payment, trainer, schedule.
- P1: test, CI, docs, demo script.
- P2: nâng cấp quality gate và SonarQube (optional level 2).

## 4. Git workflow
- main/master là nhánh ổn định.
- sprint branch dùng cho từng sprint.
- Pull request dùng để review và merge.
- Commit convention: feat:, fix:, docs:, test:, chore:.

## 5. Quản lý thay đổi
- Các thay đổi quan trọng được ghi rõ trong README và docs.
- Không đổi endpoint hiện có nếu không cần thiết.
- Các sửa đổi mới ưu tiên bảo toàn API đang chạy.

## 6. Metrics đo lường
- Số sprint: 6
- Số chức năng backend chính hoàn thành: 8+
- CI status: workflow GitHub Actions hỗ trợ lint và test
- Coverage: hiện tại có thể theo dõi từ Jest coverage report
- Số lỗi chính đã xử lý: auth, database init, router bảo mật, UI flow

## 7. Tự đánh giá CMMI
- Hiện tại: mức 1 (quy trình cơ bản, có tài liệu và kiểm soát sơ bộ).
- Mức 2/3: có thể mở rộng nếu thêm PR template, quality gate, issue tracking và release checklist.

## 8. Retrospective
- Điểm mạnh: API nghiệp vụ đã hoàn thiện và frontend demo rõ ràng.
- Điểm cần cải thiện: tăng số test nghiệp vụ và mở rộng coverage.

## 9. Kế hoạch cải tiến
- Sprint 7: thêm test cho membership, payments và schedule flow.
- Sprint 8: bổ sung quality gate, SonarQube optional và demo video.
