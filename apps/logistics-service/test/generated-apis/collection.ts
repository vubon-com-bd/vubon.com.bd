import type { TApiModule } from '../utility/type.js';

export const collectionApi: TApiModule = {
  create: {
    endpoint: 'create',
    method: 'POST',
    path: '/product-collections',
    payload: () => ({
      name: 'E2E Collection',
      slug: `e2e-collection-${Date.now()}`,
      type: 'manual',
    }),
  },
  list: {
    endpoint: 'list',
    method: 'GET',
    path: '/product-collections',
  },
  stats: {
    endpoint: 'stats',
    method: 'GET',
    path: '/product-collections/stats',
  },
  bySlug: {
    endpoint: 'bySlug',
    method: 'GET',
    path: '/product-collections/by-slug/:slug',
  },
  getById: {
    endpoint: 'getById',
    method: 'GET',
    path: '/product-collections/:id',
  },
  update: {
    endpoint: 'update',
    method: 'PATCH',
    path: '/product-collections/:id',
  },
  remove: {
    endpoint: 'remove',
    method: 'DELETE',
    path: '/product-collections/:id',
  },
  addProduct: {
    endpoint: 'addProduct',
    method: 'POST',
    path: '/product-collections/:id/products/:productId',
  },
  removeProduct: {
    endpoint: 'removeProduct',
    method: 'DELETE',
    path: '/product-collections/:id/products/:productId',
  },
};
