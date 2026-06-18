
06. Data Mapping
1. Tổng quan

File này mô tả mapping dự kiến giữa form frontend, API payload và database fields.

2. Register Form
Frontend fieldAPI fieldDatabase field
fullNamefull_nameusers.full_name
emailemailusers.email
passwordpasswordusers.password_hash
phonephoneusers.phone

Ghi chú: password sẽ được hash bằng bcryptjs trước khi lưu vào database.

3. Login Form
Frontend fieldAPI fieldDatabase field
emailemailusers.email
passwordpasswordusers.password_hash

Backend kiểm tra password bằng bcryptjs và trả JWT nếu hợp lệ.

4. Plan Form
Frontend fieldAPI fieldDatabase field
namenamemembership_plans.name
pricepricemembership_plans.price
durationDaysduration_daysmembership_plans.duration_days
descriptiondescriptionmembership_plans.description
statusstatusmembership_plans.status
5. Subscribe Form
Frontend fieldAPI fieldDatabase field
planIdplan_idmemberships.plan_id
paymentMethodpayment_methodpayments.payment_method

Backend tự tạo:

memberships.user_id từ token.
memberships.start_date.
memberships.end_date.
payments.amount từ plan.price.
payments.payment_status.
6. Schedule Form
Frontend fieldAPI fieldDatabase field
trainerIdtrainer_idworkout_schedules.trainer_id
scheduleDateschedule_dateworkout_schedules.schedule_date
startTimestart_timeworkout_schedules.start_time
endTimeend_timeworkout_schedules.end_time
notenoteworkout_schedules.note

Backend tự tạo:

member_id từ token.
status mặc định là pending.
7. Schedule Status Form
Frontend fieldAPI fieldDatabase field
statusstatusworkout_schedules.status

Status hợp lệ:

pending
confirmed
completed
cancelled
