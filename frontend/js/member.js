document.addEventListener('DOMContentLoaded', async () => {
  const auth = window.FitLifeAuth;
  const api = window.FitLifeAPI;
  const user = auth.getStoredUser();

  if (!user) {
    window.location.href = './login.html';
    return;
  }

  if (user.role !== 'member') {
    auth.redirectByRole(user.role);
    return;
  }

  document.getElementById('memberName').textContent = `Xin chào, ${user.fullName || 'Member'}`;
  document.getElementById('memberEmail').textContent = user.email;
  document.getElementById('memberRole').textContent = `Vai trò: ${user.role}`;

  const planList = document.getElementById('planList');
  const membershipList = document.getElementById('membershipList');
  const paymentList = document.getElementById('paymentList');
  const trainerSelect = document.getElementById('trainerSelect');
  const trainerList = document.getElementById('trainerList');
  const scheduleTableBody = document.getElementById('scheduleTableBody');
  const scheduleForm = document.getElementById('scheduleForm');
  const scheduleMessage = document.getElementById('scheduleMessage');
  const membershipCount = document.getElementById('membershipCount');
  const paymentTotal = document.getElementById('paymentTotal');
  const scheduleCount = document.getElementById('scheduleCount');

  function renderMessage(element, text, type = 'info') {
    element.textContent = text;
    element.className = `message ${type}`;
  }

  function createCard(title, description, actions = '') {
    return `<div class="card" style="padding: 0.9rem; background: var(--panel-2);">
      <strong>${title}</strong>
      <p style="margin: .25rem 0 0;">${description}</p>
      ${actions}
    </div>`;
  }

  async function loadPlans() {
    try {
      const data = await api.get('/plans');
      const plans = data.plans || [];
      planList.innerHTML = plans.length
        ? plans.map((plan) => `
            <div class="card" style="padding: 0.9rem; background: var(--panel-2);">
              <div class="nav-wrap" style="padding: 0; align-items: center;">
                <strong>${plan.name}</strong>
                <span class="badge">${Number(plan.price).toLocaleString()}₫</span>
              </div>
              <p style="margin: .3rem 0;">${plan.description || ''}</p>
              <p style="margin: .2rem 0;">Thời hạn: ${plan.duration_days} ngày</p>
              <button class="btn btn-primary" type="button" data-plan-id="${plan.id}">Đăng ký ngay</button>
            </div>
          `).join('')
        : '<p>Không có gói tập nào.</p>';

      planList.querySelectorAll('button[data-plan-id]').forEach((button) => {
        button.addEventListener('click', () => subscribePlan(button.dataset.planId));
      });
    } catch (error) {
      planList.innerHTML = `<p class="message error">${error.message}</p>`;
    }
  }

  async function subscribePlan(planId) {
    try {
      const data = await api.post('/memberships/subscribe', { plan_id: Number(planId) });
      renderMessage(scheduleMessage, data.message || 'Đăng ký thành công', 'success');
      await loadMemberships();
      await loadPayments();
    } catch (error) {
      renderMessage(scheduleMessage, error.message, 'error');
    }
  }

  async function loadMemberships() {
    try {
      const data = await api.get('/memberships/me');
      const memberships = data.memberships || [];
      membershipCount.textContent = memberships.length;
      membershipList.innerHTML = memberships.length
        ? memberships.map((item) => createCard(`Gói ${item.plan_name}`, `Từ ${item.start_date} đến ${item.end_date}`, `<span class="badge status-confirmed">${item.status}</span>`)).join('')
        : '<p>Chưa có membership nào.</p>';
    } catch (error) {
      membershipList.innerHTML = `<p class="message error">${error.message}</p>`;
    }
  }

  async function loadPayments() {
    try {
      const data = await api.get('/payments/me');
      const payments = data.payments || [];
      const total = payments.reduce((sum, item) => sum + Number(item.amount || 0), 0);
      paymentTotal.textContent = `${total.toLocaleString()}₫`;
      paymentList.innerHTML = payments.length
        ? payments.map((item) => createCard(`Thanh toán #${item.id}`, `Số tiền ${Number(item.amount).toLocaleString()}₫`, `<span class="badge status-confirmed">${item.payment_status}</span>`)).join('')
        : '<p>Chưa có thanh toán nào.</p>';
    } catch (error) {
      paymentList.innerHTML = `<p class="message error">${error.message}</p>`;
    }
  }

  async function loadTrainers() {
    try {
      const data = await api.get('/trainers');
      const trainers = data.trainers || [];
      trainerSelect.innerHTML = trainers.map((trainer) => `<option value="${trainer.id}">${trainer.full_name} - ${trainer.specialization}</option>`).join('');
      trainerList.innerHTML = trainers.length
        ? trainers.map((trainer) => createCard(trainer.full_name, `${trainer.specialization} • ${trainer.experience_years} năm kinh nghiệm`, `<p style="margin: .25rem 0 0;">${trainer.bio}</p>`)).join('')
        : '<p>Không có huấn luyện viên nào.</p>';
    } catch (error) {
      trainerList.innerHTML = `<p class="message error">${error.message}</p>`;
    }
  }

  async function loadSchedules() {
    try {
      const data = await api.get('/schedules/me');
      const schedules = data.schedules || [];
      scheduleCount.textContent = schedules.length;
      scheduleTableBody.innerHTML = schedules.length
        ? schedules.map((item) => `
            <tr>
              <td>${item.trainer_name}</td>
              <td>${item.schedule_date}</td>
              <td>${item.start_time} - ${item.end_time}</td>
              <td><span class="badge status-${item.status}">${item.status}</span></td>
              <td>${item.note || '-'}</td>
            </tr>
          `).join('')
        : '<tr><td colspan="5">Chưa có lịch tập nào.</td></tr>';
    } catch (error) {
      scheduleTableBody.innerHTML = `<tr><td colspan="5" class="message error">${error.message}</td></tr>`;
    }
  }

  scheduleForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const payload = {
      trainer_id: Number(trainerSelect.value),
      schedule_date: document.getElementById('scheduleDate').value,
      start_time: document.getElementById('startTime').value,
      end_time: document.getElementById('endTime').value,
      note: document.getElementById('scheduleNote').value
    };

    try {
      await api.post('/schedules', payload);
      renderMessage(scheduleMessage, 'Đặt lịch thành công', 'success');
      scheduleForm.reset();
      await loadSchedules();
    } catch (error) {
      renderMessage(scheduleMessage, error.message, 'error');
    }
  });

  await loadPlans();
  await loadMemberships();
  await loadPayments();
  await loadTrainers();
  await loadSchedules();
});
