(function () {
  function saveSession(token, user) {
    localStorage.setItem('fitlife_token', token);
    localStorage.setItem('fitlife_user', JSON.stringify(user));
  }

  function clearSession() {
    localStorage.removeItem('fitlife_token');
    localStorage.removeItem('fitlife_user');
  }

  function getStoredUser() {
    const raw = localStorage.getItem('fitlife_user');
    return raw ? JSON.parse(raw) : null;
  }

  function isAuthenticated() {
    return Boolean(localStorage.getItem('fitlife_token'));
  }

  function redirectByRole(role) {
    if (role === 'member') {
      window.location.href = './member.html';
    } else if (role === 'trainer') {
      window.location.href = './trainer.html';
    } else if (role === 'admin') {
      window.location.href = './admin.html';
    } else {
      window.location.href = './login.html';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
      logoutButton.addEventListener('click', () => {
        clearSession();
        window.location.href = './login.html';
      });
    }
  });

  window.FitLifeAuth = { saveSession, clearSession, getStoredUser, isAuthenticated, redirectByRole };
})();
