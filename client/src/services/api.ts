import axios from 'axios';
import type { Domain, Metric } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4500/api/v1';

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
  getByDomain: (domain: string) => api.get<Metric[]>(`/metrics/${encodeURIComponent(domain)}`),
  runTest: (domain: string) => api.post<Metric>('/metrics/run', { domain }),
};
