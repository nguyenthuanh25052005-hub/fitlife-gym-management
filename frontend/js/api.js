(function () {
  const API_BASE_URL = 'http://127.0.0.1:3000/api';

  async function request(path, options = {}) {
    const token = localStorage.getItem('fitlife_token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    };

    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  }

  function get(path) {
    return request(path, { method: 'GET' });
  }

  function post(path, body) {
    return request(path, { method: 'POST', body: JSON.stringify(body || {}) });
  }

  function patch(path, body) {
    return request(path, { method: 'PATCH', body: JSON.stringify(body || {}) });
  }

  window.FitLifeAPI = { get, post, patch, request };
})();
