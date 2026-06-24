document.addEventListener('DOMContentLoaded', async () => {
  const auth = window.FitLifeAuth;
  const api = window.FitLifeAPI;
  const user = auth.getStoredUser();

  if (!user) {
    window.location.href = './login.html';
    return;
  }

  if (user.role !== 'admin') {
    auth.redirectByRole(user.role);
    return;
  }

  document.getElementById('adminName').textContent = `Xin chào, ${user.fullName || 'Admin'}`;
  document.getElementById('adminEmail').textContent = user.email;

  const membershipTableBody = document.getElementById('membershipTableBody');
  const paymentTableBody = document.getElementById('paymentTableBody');
  const scheduleTableBody = document.getElementById('scheduleTableBody');
  const membershipTotal = document.getElementById('membershipTotal');
  const paymentTotal = document.getElementById('paymentTotal');
  const scheduleTotal = document.getElementById('scheduleTotal');

  async function loadMemberships() {
    try {
      const data = await api.get('/memberships');
      const memberships = data.memberships || [];
      membershipTotal.textContent = memberships.length;
      membershipTableBody.innerHTML = memberships.length
        ? memberships.map((item) => `
            <tr>
              <td>${item.user_name}</td>
              <td>${item.plan_name}</td>
              <td>${Number(item.price).toLocaleString()}₫</td>
              <td>${item.start_date}</td>
              <td>${item.end_date}</td>
              <td><span class="badge status-${item.status}">${item.status}</span></td>
            </tr>
          `).join('')
        : '<tr><td colspan="6">Không có membership nào.</td></tr>';
    } catch (error) {
      membershipTableBody.innerHTML = `<tr><td colspan="6" class="message error">${error.message}</td></tr>`;
    }
  }

  async function loadPayments() {
    try {
      const data = await api.get('/payments');
      const payments = data.payments || [];
      paymentTotal.textContent = payments.length;
      paymentTableBody.innerHTML = payments.length
        ? payments.map((item) => `
            <tr>
              <td>${item.user_name}</td>
              <td>${Number(item.amount).toLocaleString()}₫</td>
              <td>${item.payment_method}</td>
              <td><span class="badge status-${item.payment_status}">${item.payment_status}</span></td>
              <td>${item.created_at}</td>
            </tr>
          `).join('')
        : '<tr><td colspan="5">Không có thanh toán nào.</td></tr>';
    } catch (error) {
      paymentTableBody.innerHTML = `<tr><td colspan="5" class="message error">${error.message}</td></tr>`;
    }
  }

  async function loadSchedules() {
    try {
      const data = await api.get('/schedules');
      const schedules = data.schedules || [];
      scheduleTotal.textContent = schedules.length;
      scheduleTableBody.innerHTML = schedules.length
        ? schedules.map((item) => `
            <tr>
              <td>${item.member_name}</td>
              <td>${item.trainer_name}</td>
              <td>${item.schedule_date}</td>
              <td>${item.start_time} - ${item.end_time}</td>
              <td><span class="badge status-${item.status}">${item.status}</span></td>
              <td>${item.note || '-'}</td>
            </tr>
          `).join('')
        : '<tr><td colspan="6">Không có lịch nào.</td></tr>';
    } catch (error) {
      scheduleTableBody.innerHTML = `<tr><td colspan="6" class="message error">${error.message}</td></tr>`;
    }
  }

  await loadMemberships();
  await loadPayments();
  await loadSchedules();
});
