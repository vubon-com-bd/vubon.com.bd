import type { TApiModule } from '../utility/type.js';

export const variantApi: TApiModule = {
  add: {
    endpoint: 'add',
    method: 'POST',
    path: '/product-variants',
    payload: () => ({
      productId: '00000000-0000-0000-0000-000000000001',
      name: 'E2E Variant',
      sku: `E2E-VAR-${Date.now()}`,
      type: 'size',
      options: [{ name: 'size', value: 'M' }],
      price: 1000,
    }),
  },
  list: {
    endpoint: 'list',
    method: 'GET',
    path: '/product-variants',
  },
  stats: {
    endpoint: 'stats',
    method: 'GET',
    path: '/product-variants/stats',
  },
  getById: {
    endpoint: 'getById',
    method: 'GET',
    path: '/product-variants/:id',
  },
};
