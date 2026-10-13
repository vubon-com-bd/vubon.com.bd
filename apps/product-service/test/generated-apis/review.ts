import type { TApiModule } from '../utility/type.js';

export const reviewApi: TApiModule = {
  submit: {
    endpoint: 'submit',
    method: 'POST',
    path: '/product-reviews',
    payload: () => ({
      productId: '00000000-0000-0000-0000-000000000001',
      rating: 5,
      title: 'E2E review',
      comment: 'This is an E2E test review comment.',
    }),
  },
  list: {
    endpoint: 'list',
    method: 'GET',
    path: '/product-reviews',
  },
  stats: {
    endpoint: 'stats',
    method: 'GET',
    path: '/product-reviews/stats/:productId',
  },
  getById: {
    endpoint: 'getById',
    method: 'GET',
    path: '/product-reviews/:id',
  },
  update: {
    endpoint: 'update',
    method: 'PATCH',
    path: '/product-reviews/:id',
  },
  remove: {
    endpoint: 'remove',
    method: 'DELETE',
    path: '/product-reviews/:id',
  },
  approve: {
    endpoint: 'approve',
    method: 'POST',
    path: '/product-reviews/:id/approve',
  },
  reject: {
    endpoint: 'reject',
    method: 'POST',
    path: '/product-reviews/:id/reject',
    payload: () => ({ reason: 'Inappropriate content' }),
  },
  markHelpful: {
    endpoint: 'markHelpful',
    method: 'POST',
    path: '/product-reviews/:id/helpful',
  },
};
