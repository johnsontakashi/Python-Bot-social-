// Centralized API client for Flask backend
// Adjust BASE_URL via environment variable at build time if needed
const BASE_URL = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed (${res.status})`);
  }
  return res.json();
}

export async function fetchActivities(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/activities${query ? `?${query}` : ''}`);
  return handleResponse(res);
}

export async function fetchAggregates() {
  const res = await fetch(`${BASE_URL}/activities/aggregate`);
  return handleResponse(res);
}

export async function ingestActivities(list) {
  const res = await fetch(`${BASE_URL}/activities`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(list),
  });
  return handleResponse(res);
}

export async function deleteActivity(id) {
  const res = await fetch(`${BASE_URL}/activities/${id}`, { method: 'DELETE' });
  if (res.status === 204) return true;
  if (!res.ok) throw new Error(`Delete failed (${res.status})`);
  return true;
}

export async function exportActivities(format = 'jsonl') {
  const res = await fetch(`${BASE_URL}/activities/export?format=${format}`);
  if (!res.ok) throw new Error(`Export failed (${res.status})`);
  if (format === 'jsonl') return res.text();
  return res.blob();
}
