document.addEventListener('DOMContentLoaded', async () => {
  const auth = window.FitLifeAuth;
  const api = window.FitLifeAPI;
  const user = auth.getStoredUser();

  if (!user) {
    window.location.href = './login.html';
    return;
  }

  if (user.role !== 'trainer') {
    auth.redirectByRole(user.role);
    return;
  }

  document.getElementById('trainerName').textContent = `Xin chào, ${user.fullName || 'Trainer'}`;
  document.getElementById('trainerEmail').textContent = user.email;

  const tableBody = document.getElementById('trainerScheduleTableBody');
  const trainerMessage = document.getElementById('trainerMessage');
  const scheduleToday = document.getElementById('scheduleToday');

  function renderMessage(text, type = 'info') {
    trainerMessage.textContent = text;
    trainerMessage.className = `message ${type}`;
  }

  async function loadSchedules() {
    try {
      const data = await api.get('/schedules/trainer/me');
      const schedules = data.schedules || [];
      scheduleToday.textContent = schedules.length;
      tableBody.innerHTML = schedules.length
        ? schedules.map((item) => `
            <tr>
              <td>${item.member_name}</td>
              <td>${item.schedule_date}</td>
              <td>${item.start_time} - ${item.end_time}</td>
              <td><span class="badge status-${item.status}">${item.status}</span></td>
              <td>${item.note || '-'}</td>
              <td>
                <div class="stack" style="min-width: 200px;">
                  <button class="btn btn-primary" data-action="confirmed" data-id="${item.id}">Xác nhận</button>
                  <button class="btn btn-secondary" data-action="completed" data-id="${item.id}">Hoàn thành</button>
                  <button class="btn" style="background: var(--danger); color: white;" data-action="cancelled" data-id="${item.id}">Hủy</button>
                </div>
              </td>
            </tr>
          `).join('')
        : '<tr><td colspan="6">Chưa có lịch nào.</td></tr>';

      tableBody.querySelectorAll('button[data-id]').forEach((button) => {
        button.addEventListener('click', () => updateStatus(button.dataset.id, button.dataset.action));
      });
    } catch (error) {
      tableBody.innerHTML = `<tr><td colspan="6" class="message error">${error.message}</td></tr>`;
    }
  }

  async function updateStatus(scheduleId, status) {
    try {
      await api.patch(`/schedules/${scheduleId}/status`, { status });
      renderMessage('Cập nhật trạng thái thành công', 'success');
      await loadSchedules();
    } catch (error) {
      renderMessage(error.message, 'error');
    }
  }

  await loadSchedules();
});
