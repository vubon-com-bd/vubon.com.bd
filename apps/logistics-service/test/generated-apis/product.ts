import type { TApiModule } from '../utility/type.js';

export const productApi: TApiModule = {
  create: {
    endpoint: 'create',
    method: 'POST',
    path: '/products',
    payload: () => ({
      name: 'E2E Product',
      slug: `e2e-product-${Date.now()}`,
      sku: `E2E-SKU-${Date.now()}`,
      type: 'physical',
      categoryId: '00000000-0000-0000-0000-000000000001',
      price: 1000,
      currency: 'BDT',
    }),
  },
  list: {
    endpoint: 'list',
    method: 'GET',
    path: '/products',
  },
  search: {
    endpoint: 'search',
    method: 'GET',
    path: '/products/search',
  },
  featured: {
    endpoint: 'featured',
    method: 'GET',
    path: '/products/featured',
  },
  stats: {
    endpoint: 'stats',
    method: 'GET',
    path: '/products/stats',
  },
  getById: {
    endpoint: 'getById',
    method: 'GET',
    path: '/products/:id',
  },
  getBySlug: {
    endpoint: 'getBySlug',
    method: 'GET',
    path: '/products/by-slug/:slug',
  },
  detail: {
    endpoint: 'detail',
    method: 'GET',
    path: '/products/:id/detail',
  },
  public: {
    endpoint: 'public',
    method: 'GET',
    path: '/products/:id/public',
  },
  related: {
    endpoint: 'related',
    method: 'GET',
    path: '/products/:id/related',
  },
  publish: {
    endpoint: 'publish',
    method: 'POST',
    path: '/products/:id/publish',
  },
  archive: {
    endpoint: 'archive',
    method: 'POST',
    path: '/products/:id/archive',
  },
  duplicate: {
    endpoint: 'duplicate',
    method: 'POST',
    path: '/products/:id/duplicate',
  },
};
