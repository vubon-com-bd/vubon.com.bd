import type { TApiModule } from '../utility/type.js';

export const brandApi: TApiModule = {
  create: {
    endpoint: 'create',
    method: 'POST',
    path: '/brands',
    payload: () => ({
      name: 'E2E Brand',
      slug: `e2e-brand-${Date.now()}`,
    }),
  },
  list: {
    endpoint: 'list',
    method: 'GET',
    path: '/brands',
  },
  stats: {
    endpoint: 'stats',
    method: 'GET',
    path: '/brands/stats',
  },
  bySlug: {
    endpoint: 'bySlug',
    method: 'GET',
    path: '/brands/by-slug/:slug',
  },
  getById: {
    endpoint: 'getById',
    method: 'GET',
    path: '/brands/:id',
  },
  update: {
    endpoint: 'update',
    method: 'PATCH',
    path: '/brands/:id',
  },
  remove: {
    endpoint: 'remove',
    method: 'DELETE',
    path: '/brands/:id',
  },
};
