import type { TApiModule } from '../utility/type.js';

export const pricingApi: TApiModule = {
  stats: {
    endpoint: 'stats',
    method: 'GET',
    path: '/product-pricing/stats',
  },
  byProduct: {
    endpoint: 'byProduct',
    method: 'GET',
    path: '/product-pricing/by-product/:productId',
  },
  publicByProduct: {
    endpoint: 'publicByProduct',
    method: 'GET',
    path: '/product-pricing/by-product/:productId/public',
  },
  calculate: {
    endpoint: 'calculate',
    method: 'POST',
    path: '/product-pricing/calculate',
    payload: () => ({
      productId: '00000000-0000-0000-0000-000000000001',
      quantity: 1,
    }),
  },
  getById: {
    endpoint: 'getById',
    method: 'GET',
    path: '/product-pricing/:id',
  },
  updatePrice: {
    endpoint: 'updatePrice',
    method: 'PATCH',
    path: '/product-pricing/by-product/:productId',
    payload: () => ({ sellingPrice: 1200 }),
  },
};
