
08. Backend Guide
1. Tổng quan

Backend dự kiến sử dụng Node.js và Express để xây dựng REST API cho hệ thống FitLife.

2. Cấu trúc backend dự kiến
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
3. Dependency dự kiến
express
cors
dotenv
sqlite3 hoặc better-sqlite3
bcryptjs
jsonwebtoken
jest
supertest
eslint
nodemon
4. Cách cài đặt dự kiến
cd backend
npm install
5. File môi trường

Tạo file .env từ .env.example:

PORT=3000
JWT_SECRET=fitlife_secret_key
DB_PATH=./src/database/fitlife.sqlite
6. Cách chạy server dự kiến
npm run dev

Hoặc:

npm start
7. Cách init database dự kiến
npm run db:init
8. Cách seed data dự kiến
npm run db:seed

Seed data nên có:

1 admin.
2 trainer.
1 member mẫu.
3 gói tập: Basic, Standard, Premium.
9. Cách chạy test dự kiến
npm test
10. Cách chạy lint dự kiến
npm run lint
11. API health check dự kiến
GET /api/health

Response:

{
  "status": "ok",
  "message": "FitLife API is running"
}
12. Ghi chú

Backend chưa được triển khai ở giai đoạn tài liệu ban đầu. File này sẽ được cập nhật sau khi code backend hoàn thành.
