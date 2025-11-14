import axios from 'axios';
import type { Domain, Metric } from '../types';

// Use /api for production (proxied via vercel.json) or localhost for dev
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const domainApi = {
  getAll: () => api.get<Domain[]>('/domains'),
  create: (url: string) => api.post<Domain>('/domains', { url }),
};

export const metricsApi = {
  getByDomainId: (domainId: string) => api.get<Metric[]>(`/metrics/${domainId}`),
  runTest: (domainId: string) => api.post<Metric>('/metrics/run', { domainId }),
};
