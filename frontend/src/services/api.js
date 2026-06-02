const API_BASE = '/api/v1';
async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, { headers: { 'Content-Type': 'application/json', ...options.headers }, ...options });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
export function getAttackScenarios() { return request('/attack-scenarios'); }
export function getSecurityTests() { return request('/security-tests'); }
export function getSecurityTest(id) { return request(`/security-tests/${id}`); }
export function runSecurityTest(payload) { return request('/security-tests/run', { method: 'POST', body: JSON.stringify(payload) }); }
export function getModels() { return request('/models'); }
