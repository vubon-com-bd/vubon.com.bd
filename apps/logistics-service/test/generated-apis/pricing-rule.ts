import type { TApiModule } from '../utility/type.js';

export const pricingRuleApi: TApiModule = {
  create: {
    endpoint: 'create',
    method: 'POST',
    path: '/product-pricing-rules',
    payload: () => ({
      name: 'E2E Rule',
      type: 'fixed',
      conditions: { minQuantity: 10 },
      priceAdjustment: 5,
      isPercent: true,
    }),
  },
  list: {
    endpoint: 'list',
    method: 'GET',
    path: '/product-pricing-rules',
  },
  listActive: {
    endpoint: 'listActive',
    method: 'GET',
    path: '/product-pricing-rules/active',
  },
  getById: {
    endpoint: 'getById',
    method: 'GET',
    path: '/product-pricing-rules/:id',
  },
  update: {
    endpoint: 'update',
    method: 'PATCH',
    path: '/product-pricing-rules/:id',
  },
  remove: {
    endpoint: 'remove',
    method: 'DELETE',
    path: '/product-pricing-rules/:id',
  },
};
