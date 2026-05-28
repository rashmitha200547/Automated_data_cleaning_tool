import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

// ── Auth ─────────────────────────────────────────────────────────────
export const checkAuth = async () => {
  const { data } = await API.get('/auth/me');
  return data;
};

export const logoutUser = async () => {
  const { data } = await API.post('/auth/logout');
  return data;
};

export const signupUser = async (email, password, displayName) => {
  const { data } = await API.post('/auth/signup', { email, password, displayName });
  return data;
};

export const loginUser = async (email, password) => {
  const { data } = await API.post('/auth/login', { email, password });
  return data;
};

// ── Files ────────────────────────────────────────────────────────────
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const { data } = await API.post('/api/upload', formData);
  return data;
};

// ── Cleaning ─────────────────────────────────────────────────────────
export const startCleaning = async (sessionId, mode) => {
  const { data } = await API.post('/api/cleaning/start', { sessionId, mode });
  return data;
};

export const resumeCleaning = async (sessionId, action, overrides = {}) => {
  const { data } = await API.post('/api/cleaning/resume', {
    sessionId,
    action,
    overrides,
  });
  return data;
};

export const getCleaningStatus = async (sessionId) => {
  const { data } = await API.get(`/api/cleaning/status/${sessionId}`);
  return data;
};

export const undoStep = async (sessionId) => {
  const { data } = await API.post('/api/cleaning/undo', { sessionId });
  return data;
};

export const redoStep = async (sessionId) => {
  const { data } = await API.post('/api/cleaning/redo', { sessionId });
  return data;
};

// ── Preview ──────────────────────────────────────────────────────────
export const getPreview = async (sessionId, version = 'current', page = 1, pageSize = 50) => {
  const { data } = await API.get(`/api/cleaning/preview/${sessionId}`, {
    params: { version, page, page_size: pageSize },
  });
  return data;
};

// ── Chat ─────────────────────────────────────────────────────────────
export const sendChatMessage = async (sessionId, message) => {
  const { data } = await API.post('/api/cleaning/chat', { sessionId, message });
  return data;
};

// ── Export ────────────────────────────────────────────────────────────
export const getAnalytics = async (sessionId) => {
  const { data } = await API.get(`/api/cleaning/analytics/${sessionId}`);
  return data;
};

export const exportDataset = async (sessionId, format) => {
  const response = await API.get(`/api/export/dataset/${sessionId}`, {
    params: { format },
    responseType: 'blob',
  });
  return response.data;
};

export const exportPipeline = async (sessionId) => {
  const { data } = await API.get(`/api/export/pipeline/${sessionId}`);
  return data;
};

export const exportReport = async (sessionId) => {
  const response = await API.get(`/api/export/report/${sessionId}`, {
    responseType: 'blob',
  });
  return response.data;
};

// ── Pipelines ────────────────────────────────────────────────────────
export const savePipeline = async (name, description, steps) => {
  const { data } = await API.post('/api/pipeline', { name, description, steps });
  return data;
};

export const listPipelines = async () => {
  const { data } = await API.get('/api/pipeline');
  return data;
};

export const getPipeline = async (pipelineId) => {
  const { data } = await API.get(`/api/pipeline/${pipelineId}`);
  return data;
};

export const deletePipeline = async (pipelineId) => {
  await API.delete(`/api/pipeline/${pipelineId}`);
};
