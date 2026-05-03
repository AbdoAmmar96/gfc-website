import axios from 'axios';
import {
  mockSettings, mockServices, mockSolutions,
  mockPartners, mockProjects, mockTeam, mockBlog,
} from './mockData';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api/v1';
const storageURL = import.meta.env.VITE_STORAGE_URL || '/storage';

export const api = axios.create({
  baseURL,
  headers: { Accept: 'application/json' },
  timeout: 15000,
});

/** Resolve an image path stored in the DB to a full URL */
export const asset = (path) => {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return `${storageURL}/${path}`;
};

/** Helper: simulate API latency for realism in demo mode */
const delay = (ms = 200) => new Promise(r => setTimeout(r, ms));
const mock = (data) => USE_MOCK ? delay().then(() => data) : null;

// === Endpoints ===
export const fetchSettings = () =>
  mock(mockSettings) ?? api.get('/settings').then(r => r.data.data);

export const fetchServices = () =>
  mock(mockServices) ?? api.get('/services').then(r => r.data.data);

export const fetchServicesFeatured = () =>
  mock(mockServices.filter(s => s.is_featured)) ?? api.get('/services/featured').then(r => r.data.data);

export const fetchService = (slug) =>
  mock(mockServices.find(s => s.slug === slug) || null) ?? api.get(`/services/${slug}`).then(r => r.data.data);

export const fetchSolutions = () =>
  mock(mockSolutions) ?? api.get('/solutions').then(r => r.data.data);

export const fetchSolution = (slug) =>
  mock(mockSolutions.find(s => s.slug === slug) || null) ?? api.get(`/solutions/${slug}`).then(r => r.data.data);

export const fetchProjects = () =>
  mock(mockProjects) ?? api.get('/projects').then(r => r.data.data);

export const fetchProjectsFeatured = () =>
  mock(mockProjects.filter(p => p.is_featured)) ?? api.get('/projects/featured').then(r => r.data.data);

export const fetchProject = (slug) =>
  mock(mockProjects.find(p => p.slug === slug) || null) ?? api.get(`/projects/${slug}`).then(r => r.data.data);

export const fetchPartners = () =>
  mock(mockPartners) ?? api.get('/partners').then(r => r.data.data);

export const fetchTeam = () =>
  mock(mockTeam) ?? api.get('/team').then(r => r.data.data);

export const fetchBlog = (page = 1) =>
  mock(mockBlog) ?? api.get(`/blog?page=${page}`).then(r => r.data);

export const fetchPost = (slug) =>
  mock(null) ?? api.get(`/blog/${slug}`).then(r => r.data);

export const submitContact = (payload) => {
  if (USE_MOCK) {
    return delay(800).then(() => ({ message: 'Demo: form submission disabled' }));
  }
  return api.post('/contact', payload).then(r => r.data);
};

/** Resolve a path under public/ (e.g. "/images/logo.png") to one that respects
 *  the build-time base path (e.g. "/gfc-website/images/logo.png" on GitHub Pages). */
export const publicAsset = (path) => {
  const base = import.meta.env.BASE_URL || '/';
  // strip leading slash from path so we don't double up
  return base.replace(/\/$/, '') + (path.startsWith('/') ? path : '/' + path);
};
