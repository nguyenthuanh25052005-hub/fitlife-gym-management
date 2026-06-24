
# 01. Tổng quan dự án

## 1. Tên dự án

FitLife Gym Management System.

## 2. Đề tài

Đề tài số 05: Quản lý phòng gym và lịch tập.

## 3. Bối cảnh

Nhiều phòng gym quy mô nhỏ vẫn quản lý hội viên, gói tập, lịch tập và huấn luyện viên bằng sổ tay, Excel hoặc trao đổi thủ công qua tin nhắn. Cách làm này dễ phát sinh trùng lịch, khó theo dõi trạng thái gói tập, khó tổng hợp thanh toán và khó đo lường chất lượng vận hành.

FitLife đã được thiết kế và triển khai như một hệ thống web thực tế để số hóa quy trình quản lý phòng gym ở mức cơ bản, phù hợp với phạm vi đồ án và có khả năng mở rộng ở các sprint sau.

## 4. Vấn đề cần giải quyết

- Khó quản lý danh sách hội viên và trạng thái tài khoản.
- Khó theo dõi thời hạn gói tập và lịch sử đăng ký.
- Dễ bị trùng lịch giữa hội viên và trainer.
- Khó thống kê thanh toán và doanh thu mô phỏng.
- Admin chưa có cái nhìn tổng quan về hoạt động phòng gym.
- Trainer khó theo dõi lịch dạy cá nhân và trạng thái buổi tập.

## 5. Mục tiêu dự án

- Thiết kế hệ thống quản lý phòng gym theo hướng modular, dễ tách lớp và dễ kiểm thử.
- Xây dựng REST API cho các chức năng chính.
- Sử dụng SQLite cho Level 1 để đơn giản hóa việc cài đặt và demo.
- Áp dụng JWT và bcryptjs cho xác thực, phân quyền và bảo mật mật khẩu.
- Có test bằng Jest và Supertest để kiểm tra API.
- Có linting bằng ESLint và CI/CD bằng GitHub Actions.
- Hoàn thiện bộ tài liệu phân tích, thiết kế, sprint và checklist cho đồ án.

## 6. Đối tượng sử dụng

| Đối tượng | Nhu cầu chính |
|---|---|
| Admin | Quản lý toàn bộ hệ thống, bao gồm gói tập, hội viên, trainer, lịch tập và thanh toán |
| Member | Đăng ký tài khoản, chọn gói tập, đặt lịch với trainer và theo dõi lịch cá nhân |
| Trainer | Xem lịch dạy, xác nhận lịch và cập nhật trạng thái buổi tập |

## 7. Phạm vi Level 1, Level 2, Level 3

### Level 1

Level 1 là phạm vi cốt lõi đã hoàn thành để bảo đảm có thể demo được nghiệp vụ chính.

- Backend Node.js + Express.
- Database SQLite.
- REST API đã triển khai.
- JWT Authentication.
- bcryptjs để mã hóa mật khẩu.
- Jest + Supertest để test API.
- ESLint để kiểm tra chất lượng code.
- GitHub Actions CI cơ bản.
- Frontend HTML/CSS/JavaScript thuần.
- README và tài liệu dự án đầy đủ.

### Level 2

Level 2 là phần mở rộng sau khi Level 1 ổn định, tập trung vào khả năng vận hành và chuẩn hóa quy trình phát triển.

- Tách module rõ hơn theo service/repository/controller.
- Bổ sung quy trình Pull Request chi tiết hơn.
- Tăng coverage test và bổ sung test tình huống biên.
- Cân nhắc chuyển sang database mạnh hơn nếu phạm vi đồ án cần mở rộng.
- Bổ sung tài liệu triển khai và hướng dẫn sử dụng chi tiết hơn.

### Level 3

Level 3 là phần nâng cao mang tính mở rộng, chủ yếu dùng để tham khảo định hướng phát triển lâu dài.

- Tích hợp cache hoặc cơ chế tối ưu truy vấn nếu cần.
- Bổ sung monitoring và cảnh báo.
- Tự động hóa kiểm thử và quality gate chặt hơn.
- Mở rộng phân tích dữ liệu vận hành và đo lường chất lượng hệ thống.

## 8. SPQM của đề tài 05: L12 SMART-Q và L13 đo lường

Theo định hướng SPQM của đề tài 05, FitLife cần thể hiện rõ hai trọng tâm:

- L12: SMART-Q.
- L13: Đo lường và theo dõi chỉ số chất lượng.

### 8.1. SMART-Q hiện có

Mục tiêu chất lượng của dự án đã được mô tả theo SMART-Q, tức là:

- Specific: cụ thể theo từng module và từng sprint.
- Measurable: đo được bằng metric rõ ràng.
- Achievable: phù hợp với thời gian và quy mô đồ án.
- Relevant: bám sát nghiệp vụ quản lý phòng gym.
- Time-bound: có mốc hoàn thành theo sprint.
- Quality-oriented: tập trung vào chất lượng đầu ra, test và khả năng bảo trì.

### 8.2. Đo lường hiện có

Dự án dùng các chỉ số ban đầu để theo dõi tiến độ và chất lượng:

| Metric | Ý nghĩa | Mục tiêu hiện có |
|---|---|---|
| Test pass rate | Tỷ lệ test chạy thành công | 100% khi chốt sprint |
| Coverage | Mức độ bao phủ test | Từ 70% trở lên ở giai đoạn ổn định |
| API response time | Thời gian phản hồi API | Dưới 500ms với dữ liệu nhỏ |
| Bug count | Số lỗi phát hiện | Giảm dần qua từng sprint |
| Fixed bug count | Số lỗi đã sửa | Tăng dần theo tiến độ |
| Commit count | Số commit theo sprint | Có commit rõ ràng cho từng phần |
| Pull request count | Số PR | Có PR cho các phần chính |

### 8.3. Definition of Done hiện có

Một chức năng được xem là hoàn thành khi có đủ các điều kiện sau:

- Có tài liệu mô tả chức năng.
- Có code đúng theo thiết kế đã thống nhất.
- Có test phù hợp với phạm vi chức năng.
- Không vi phạm các quy tắc lint quan trọng.
- Có thể demo được trong luồng sử dụng hiện có.
