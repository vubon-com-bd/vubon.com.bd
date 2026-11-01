import type { TApiModule } from '../utility/type.js';

export const inventoryApi: TApiModule = {
  checkStock: {
    endpoint: 'checkStock',
    method: 'GET',
    path: '/product-inventory/check-stock',
  },
  stats: {
    endpoint: 'stats',
    method: 'GET',
    path: '/product-inventory/stats',
  },
  byProduct: {
    endpoint: 'byProduct',
    method: 'GET',
    path: '/product-inventory/by-product/:productId',
  },
  getById: {
    endpoint: 'getById',
    method: 'GET',
    path: '/product-inventory/:id',
  },
  adjust: {
    endpoint: 'adjust',
    method: 'POST',
    path: '/product-inventory/:id/adjust',
    payload: () => ({ delta: 10, reason: 'restock' }),
  },
  update: {
    endpoint: 'update',
    method: 'POST',
    path: '/product-inventory/:id/update',
    payload: () => ({ delta: 5, reason: 'adjustment' }),
  },
};
