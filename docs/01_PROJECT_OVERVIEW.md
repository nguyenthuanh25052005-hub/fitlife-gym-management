
01. Tổng quan dự án
1. Tên dự án

FitLife Gym Management System.

2. Đề tài

Đề tài số 05: Quản lý phòng gym và lịch tập.

3. Bối cảnh

Nhiều phòng gym nhỏ vẫn quản lý hội viên, gói tập, lịch tập và huấn luyện viên bằng sổ tay, Excel hoặc tin nhắn cá nhân. Cách làm này dễ gây trùng lịch, khó theo dõi thời hạn gói tập, khó thống kê thanh toán và khó kiểm soát chất lượng dịch vụ.

FitLife được thiết kế như một hệ thống web cơ bản giúp số hóa quy trình quản lý phòng gym.

4. Vấn đề cần giải quyết
Khó quản lý danh sách hội viên.
Khó theo dõi thời hạn gói tập.
Dễ bị trùng lịch giữa hội viên và trainer.
Khó tổng hợp thanh toán.
Admin không có cái nhìn tổng quan về hoạt động phòng gym.
Trainer khó theo dõi lịch dạy cá nhân.
5. Mục tiêu dự án
Xây dựng hệ thống quản lý phòng gym cơ bản.
Thiết kế REST API cho các chức năng chính.
Thiết kế database SQLite phù hợp với đề tài.
Xây dựng frontend HTML/CSS/JavaScript để thao tác với hệ thống.
Áp dụng JWT để đăng nhập và phân quyền.
Có test bằng Jest và Supertest.
Có CI/CD bằng GitHub Actions.
Có tài liệu README, API, database, sprint và checklist.
6. Đối tượng sử dụng
Đối tượngNhu cầu
AdminQuản lý toàn bộ hệ thống
MemberĐăng ký gói tập, đặt lịch tập
TrainerXem lịch dạy, xác nhận lịch
7. Phạm vi Level 1

Level 1 là phạm vi chính cần hoàn thành trước:

Backend Node.js + Express.
Database SQLite.
REST API.
JWT Authentication.
bcryptjs để mã hóa mật khẩu.
Jest + Supertest để test API.
ESLint để kiểm tra chất lượng code.
GitHub Actions CI cơ bản.
Frontend HTML/CSS/JavaScript thuần.
README và tài liệu dự án đầy đủ.
8. Phạm vi Level 2

Level 2 là phần mở rộng sau khi Level 1 ổn định:

PostgreSQL.
Docker Compose.
SonarQube.
Integration test.
Quy trình Pull Request rõ ràng hơn.
Coverage cao hơn.
9. Phạm vi Level 3

Level 3 là phần nâng cao:

Microservices.
Redis cache.
Load test bằng k6.
Monitoring bằng Prometheus và Grafana.
Quality gate tự động chặn pipeline.
Đo lường DORA metrics.
10. SPQM của đề tài

Theo slide đề tài 05, trọng tâm SPQM gồm:

L12: SMART-Q.
L13: Đo lường.

Dự án cần thể hiện:

Mục tiêu chất lượng theo SMART-Q.
Definition of Done cho từng sprint.
Checklist kiểm thử.
Baseline đo lường ban đầu.
Metric theo dõi chất lượng.
11. Metric đo lường dự kiến
MetricÝ nghĩaMục tiêu
Test pass rateTỷ lệ test chạy thành công100%
CoverageMức độ bao phủ test>= 70%
API response timeThời gian phản hồi API< 500ms với dữ liệu nhỏ
Bug countSố lỗi phát hiệnGiảm qua từng sprint
Fixed bug countSố lỗi đã sửaTăng theo sprint
Commit countSố commitCó commit rõ ràng theo sprint
Pull request countSố PRCó PR cho các phần chính
