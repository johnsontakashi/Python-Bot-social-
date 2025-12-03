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

// ============================================
// Dashboard Management
// ============================================

export async function fetchDashboards() {
  const res = await fetch(`${BASE_URL}/dashboards`);
  return handleResponse(res);
}

export async function createDashboard(dashboard) {
  const res = await fetch(`${BASE_URL}/dashboards`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dashboard),
  });
  return handleResponse(res);
}

export async function fetchDashboard(id) {
  const res = await fetch(`${BASE_URL}/dashboards/${id}`);
  return handleResponse(res);
}

export async function updateDashboard(id, dashboard) {
  const res = await fetch(`${BASE_URL}/dashboards/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dashboard),
  });
  return handleResponse(res);
}

export async function deleteDashboard(id) {
  const res = await fetch(`${BASE_URL}/dashboards/${id}`, { method: 'DELETE' });
  if (res.status === 204) return true;
  if (!res.ok) throw new Error(`Delete failed (${res.status})`);
  return true;
}

// ============================================
// Display Management
// ============================================

export async function fetchDisplays() {
  const res = await fetch(`${BASE_URL}/displays`);
  return handleResponse(res);
}

export async function createDisplay(display) {
  const res = await fetch(`${BASE_URL}/displays`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(display),
  });
  return handleResponse(res);
}

export async function updateDisplay(id, display) {
  const res = await fetch(`${BASE_URL}/displays/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(display),
  });
  return handleResponse(res);
}

export async function deleteDisplay(id) {
  const res = await fetch(`${BASE_URL}/displays/${id}`, { method: 'DELETE' });
  if (res.status === 204) return true;
  if (!res.ok) throw new Error(`Delete failed (${res.status})`);
  return true;
}

export async function fetchDisplayAssignment(displayId) {
  const res = await fetch(`${BASE_URL}/displays/${displayId}/assignment`);
  return handleResponse(res);
}

export async function updateDisplayAssignment(displayId, assignment) {
  const res = await fetch(`${BASE_URL}/displays/${displayId}/assignment`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(assignment),
  });
  return handleResponse(res);
}

// ============================================
// Playlist Management
// ============================================

export async function fetchPlaylists() {
  const res = await fetch(`${BASE_URL}/playlists`);
  return handleResponse(res);
}

export async function createPlaylist(playlist) {
  const res = await fetch(`${BASE_URL}/playlists`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(playlist),
  });
  return handleResponse(res);
}

export async function updatePlaylist(id, playlist) {
  const res = await fetch(`${BASE_URL}/playlists/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(playlist),
  });
  return handleResponse(res);
}

export async function deletePlaylist(id) {
  const res = await fetch(`${BASE_URL}/playlists/${id}`, { method: 'DELETE' });
  if (res.status === 204) return true;
  if (!res.ok) throw new Error(`Delete failed (${res.status})`);
  return true;
}

export async function fetchPlaylistItems(playlistId) {
  const res = await fetch(`${BASE_URL}/playlists/${playlistId}/items`);
  return handleResponse(res);
}

export async function updatePlaylistItems(playlistId, items) {
  const res = await fetch(`${BASE_URL}/playlists/${playlistId}/items`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(items),
  });
  return handleResponse(res);
}

// ============================================
// Display Player
// ============================================

export async function fetchDisplayPlayerPayload(displayId) {
  const res = await fetch(`${BASE_URL}/displays/${displayId}/player`);
  return handleResponse(res);
}
