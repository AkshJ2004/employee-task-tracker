// src/api/api.js
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const getHeaders = (auth = true) => {
  const headers = { "Content-Type": "application/json" };
  if (auth) {
    const token = localStorage.getItem("token");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

async function safeFetch(url, options = {}) {
  try {
    const res = await fetch(url, options);
    // If server responded with non-JSON (500 html), try to return text
    const contentType = res.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const payload = isJson ? await res.json() : await res.text();
    if (!res.ok) {
      // normalize server errors
      return { error: payload?.message || payload || `HTTP ${res.status}` };
    }
    return payload;
  } catch (err) {
    // network / CORS / blocked by browser / DNS etc.
    return { error: err.message || "Network error" };
  }
}

// Auth
export const apiLogin = async (email, password) => {
  return safeFetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: getHeaders(false),
    body: JSON.stringify({ email, password }),
  });
};

// Employees
export const apiGetEmployees = async () =>
  safeFetch(`${API_BASE}/employees`, { headers: getHeaders(true) });

// Tasks
export const apiGetTasks = async (query = {}) => {
  const params = new URLSearchParams(query).toString();
  return safeFetch(`${API_BASE}/tasks${params ? `?${params}` : ""}`, {
    headers: getHeaders(true),
  });
};

export const apiCreateTask = async (data) =>
  safeFetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: getHeaders(true),
    body: JSON.stringify(data),
  });

export const apiUpdateTask = async (id, data) =>
  safeFetch(`${API_BASE}/tasks/${id}`, {
    method: "PUT",
    headers: getHeaders(true),
    body: JSON.stringify(data),
  });
