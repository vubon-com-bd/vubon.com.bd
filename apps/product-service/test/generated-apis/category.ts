import type { TApiModule } from '../utility/type.js';

export const categoryApi: TApiModule = {
  create: {
    endpoint: 'create',
    method: 'POST',
    path: '/categories',
    payload: () => ({
      name: 'E2E Category',
      slug: `e2e-category-${Date.now()}`,
    }),
  },
  list: {
    endpoint: 'list',
    method: 'GET',
    path: '/categories',
  },
  tree: {
    endpoint: 'tree',
    method: 'GET',
    path: '/categories/tree',
  },
  roots: {
    endpoint: 'roots',
    method: 'GET',
    path: '/categories/roots',
  },
  stats: {
    endpoint: 'stats',
    method: 'GET',
    path: '/categories/stats',
  },
  bySlug: {
    endpoint: 'bySlug',
    method: 'GET',
    path: '/categories/by-slug/:slug',
  },
  getById: {
    endpoint: 'getById',
    method: 'GET',
    path: '/categories/:id',
  },
  update: {
    endpoint: 'update',
    method: 'PATCH',
    path: '/categories/:id',
  },
  remove: {
    endpoint: 'remove',
    method: 'DELETE',
    path: '/categories/:id',
  },
  move: {
    endpoint: 'move',
    method: 'POST',
    path: '/categories/:id/move',
    payload: () => ({ newParentId: null }),
  },
};
