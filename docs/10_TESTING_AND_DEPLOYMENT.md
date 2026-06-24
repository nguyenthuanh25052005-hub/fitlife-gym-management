
# 10. Testing and Deployment

## 1. Tổng quan

Dự án FitLife hiện có áp dụng kiểm thử và CI/CD cơ bản để đảm bảo chất lượng mã nguồn, độ ổn định API và tính nhất quán của quá trình phát triển.

## 2. Công cụ kiểm thử và kiểm tra chất lượng

| Công cụ | Mục đích |
|---|---|
| Jest | Viết và chạy unit test |
| Supertest | Kiểm thử REST API |
| ESLint | Kiểm tra chất lượng code |
| GitHub Actions | Tự động chạy test và lint |

## 3. Test cases hiện có

### Auth

| Test case | Kỳ vọng |
|---|---|
| Register thành công | Tạo user mới với role mặc định là member |
| Register email trùng | Trả lỗi phù hợp, không tạo user mới |
| Login thành công | Trả token JWT và thông tin user |
| Login sai password | Trả lỗi xác thực |
| GET `/auth/me` với token hợp lệ | Trả đúng thông tin người dùng hiện tại |

### Plans

| Test case | Kỳ vọng |
|---|---|
| Xem danh sách gói | Trả danh sách plan đang hoạt động |
| Admin tạo gói | Tạo plan thành công |
| Member không được tạo gói | Trả lỗi phân quyền |

### Membership

| Test case | Kỳ vọng |
|---|---|
| Member đăng ký gói | Tạo membership và payment mô phỏng |
| Không đăng ký gói inactive | Trả lỗi hợp lệ |

### Schedule

| Test case | Kỳ vọng |
|---|---|
| Member đặt lịch | Tạo schedule trạng thái `pending` |
| Không cho đặt lịch trùng trainer | Trả lỗi trùng lịch |
| Trainer xác nhận lịch | Chuyển trạng thái sang `confirmed` |

## 4. Lệnh chạy test

```bash
cd backend
npm test
```

## 5. Lệnh chạy lint

```bash
cd backend
npm run lint
```

## 6. Coverage mục tiêu

| Metric | Mục tiêu |
|---|---|
| Coverage | >= 70% |
| Test pass rate | 100% |

## 7. GitHub Actions workflow hiện có

File workflow hiện có:

```text
.github/workflows/ci.yml
```

Luồng chạy hiện có:

| Bước | Mô tả |
|---|---|
| Checkout | Lấy mã nguồn từ repository |
| Setup Node | Cài đặt phiên bản Node.js phù hợp |
| Install dependencies | Chạy `npm install` |
| Lint | Chạy `npm run lint` |
| Test | Chạy `npm test` |

## 8. Deployment

Ở giai đoạn tài liệu ban đầu, Level 1 chưa bắt buộc deploy thật. Nếu cần triển khai thử nghiệm, có thể cân nhắc:

- Render cho backend.
- Railway cho backend.
- Vercel cho frontend static.
- GitHub Pages nếu frontend tách riêng.

## 9. SPQM metrics

| Metric | Mục tiêu |
|---|---|
| Test pass rate | 100% |
| Coverage | >= 70% |
| API response time | < 500ms |
| Bug count | Giảm dần qua sprint |
| Commit count | Có commit theo sprint |
| PR count | Có PR cho module chính |
| Issue count | Có issue tracking nếu cần |
