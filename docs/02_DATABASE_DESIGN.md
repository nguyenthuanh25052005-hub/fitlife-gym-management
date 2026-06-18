
02. Thiết kế cơ sở dữ liệu
1. Tổng quan

Database dự kiến sử dụng SQLite cho Level 1. SQLite phù hợp với đồ án nhỏ vì dễ cài đặt, không cần server riêng và đủ để mô phỏng nghiệp vụ quản lý phòng gym.

2. Danh sách bảng
users
membership_plans
memberships
trainers
workout_schedules
payments
3. Bảng users

Lưu thông tin tài khoản người dùng.

CộtKiểu dữ liệuMô tả
idINTEGER PRIMARY KEY AUTOINCREMENTMã user
full_nameTEXT NOT NULLHọ tên
emailTEXT UNIQUE NOT NULLEmail đăng nhập
password_hashTEXT NOT NULLMật khẩu đã mã hóa
roleTEXT NOT NULLadmin/member/trainer
phoneTEXTSố điện thoại
created_atDATETIMENgày tạo
4. Bảng membership_plans

Lưu danh sách gói tập.

CộtKiểu dữ liệuMô tả
idINTEGER PRIMARY KEY AUTOINCREMENTMã gói
nameTEXT NOT NULLTên gói
priceREAL NOT NULLGiá tiền
duration_daysINTEGER NOT NULLSố ngày sử dụng
descriptionTEXTMô tả
statusTEXT DEFAULT 'active'active/inactive
5. Bảng memberships

Lưu thông tin hội viên đăng ký gói tập.

CộtKiểu dữ liệuMô tả
idINTEGER PRIMARY KEY AUTOINCREMENTMã đăng ký
user_idINTEGER NOT NULLHội viên
plan_idINTEGER NOT NULLGói tập
start_dateDATE NOT NULLNgày bắt đầu
end_dateDATE NOT NULLNgày kết thúc
statusTEXT DEFAULT 'active'active/expired/cancelled
6. Bảng trainers

Lưu thông tin huấn luyện viên.

CộtKiểu dữ liệuMô tả
idINTEGER PRIMARY KEY AUTOINCREMENTMã trainer
user_idINTEGER NOT NULLLiên kết với users
specializationTEXTChuyên môn
experience_yearsINTEGERSố năm kinh nghiệm
bioTEXTGiới thiệu
7. Bảng workout_schedules

Lưu lịch tập giữa member và trainer.

CộtKiểu dữ liệuMô tả
idINTEGER PRIMARY KEY AUTOINCREMENTMã lịch
member_idINTEGER NOT NULLHội viên
trainer_idINTEGER NOT NULLHuấn luyện viên
schedule_dateDATE NOT NULLNgày tập
start_timeTEXT NOT NULLGiờ bắt đầu
end_timeTEXT NOT NULLGiờ kết thúc
statusTEXT DEFAULT 'pending'pending/confirmed/completed/cancelled
noteTEXTGhi chú
8. Bảng payments

Lưu thanh toán mô phỏng.

CộtKiểu dữ liệuMô tả
idINTEGER PRIMARY KEY AUTOINCREMENTMã thanh toán
user_idINTEGER NOT NULLNgười thanh toán
membership_idINTEGER NOT NULLGói đăng ký
amountREAL NOT NULLSố tiền
payment_methodTEXTcash/bank/momo
payment_statusTEXTpaid/pending/failed
created_atDATETIMENgày tạo
9. Quan hệ giữa các bảng
Quan hệMô tả
users 1-n membershipsMột user có thể đăng ký nhiều gói
membership_plans 1-n membershipsMột gói có thể được nhiều user đăng ký
users 1-1 trainersMột trainer là một user có role trainer
users 1-n workout_schedulesMột member có nhiều lịch tập
trainers 1-n workout_schedulesMột trainer có nhiều lịch dạy
memberships 1-1 paymentsMột lần đăng ký tạo một payment mô phỏng
10. Ghi chú

Database này là thiết kế dự kiến cho Level 1. Khi triển khai backend, schema có thể được điều chỉnh nhẹ để phù hợp với code thực tế.
