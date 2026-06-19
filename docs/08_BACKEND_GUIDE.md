
# 08. Backend Guide

## 1. Tổng quan backend

Backend dự kiến sử dụng Node.js và Express để xây dựng REST API cho hệ thống FitLife. Ở giai đoạn tài liệu ban đầu, phần backend chưa được triển khai thật; tài liệu này chỉ mô tả cấu trúc và quy trình dự kiến để chuẩn bị cho các sprint sau.

## 2. Cấu trúc backend dự kiến

```text
backend/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   ├── database/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── middlewares/
│   └── utils/
├── tests/
├── package.json
├── .env.example
└── README.md
```

## 3. Dependency dự kiến

| Dependency | Mục đích |
|---|---|
| express | Xây dựng REST API |
| cors | Cho phép frontend gọi API |
| dotenv | Đọc biến môi trường từ file `.env` |
| sqlite3 hoặc better-sqlite3 | Tương tác với SQLite |
| bcryptjs | Mã hóa mật khẩu |
| jsonwebtoken | Tạo và xác thực JWT |
| jest | Viết và chạy test |
| supertest | Test API HTTP |
| eslint | Kiểm tra chất lượng code |
| nodemon | Tự động reload khi phát triển |

## 4. Cách cài đặt

```bash
cd backend
npm install
```

## 5. File `.env.example` dự kiến

```env
PORT=3000
JWT_SECRET=fitlife_secret_key
DB_PATH=./src/database/fitlife.sqlite
```

## 6. Cách chạy server

Chạy ở chế độ phát triển:

```bash
npm run dev
```

Chạy ở chế độ thông thường:

```bash
npm start
```

## 7. Cách init database

```bash
npm run db:init
```

Lệnh này dự kiến sẽ khởi tạo file SQLite và tạo các bảng ban đầu.

## 8. Cách seed data

```bash
npm run db:seed
```

Seed data dự kiến sẽ có:

- 1 admin.
- 2 trainer.
- 1 member mẫu.
- 3 gói tập: Basic, Standard, Premium.

## 9. Cách chạy test

```bash
npm test
```

## 10. Cách chạy lint

```bash
npm run lint
```

## 11. API health check dự kiến

```http
GET /api/health
```

Response mẫu:

```json
{
  "status": "ok",
  "message": "FitLife API is running"
}
```

## 12. Ghi chú

- Backend chưa được triển khai ở giai đoạn tài liệu ban đầu.
- Cấu trúc và lệnh trong tài liệu này là dự kiến, có thể được tinh chỉnh khi code backend được tạo trong các sprint sau.
