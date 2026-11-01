import type { TApiModule } from '../utility/type.js';

export const attributeApi: TApiModule = {
  add: {
    endpoint: 'add',
    method: 'POST',
    path: '/products/:productId/attributes',
    payload: () => ({
      name: 'Color',
      type: 'text',
      values: [{ value: 'Red', label: 'Red' }],
    }),
  },
  list: {
    endpoint: 'list',
    method: 'GET',
    path: '/products/:productId/attributes',
  },
  update: {
    endpoint: 'update',
    method: 'PATCH',
    path: '/products/:productId/attributes/:attributeId',
  },
  remove: {
    endpoint: 'remove',
    method: 'DELETE',
    path: '/products/:productId/attributes/:attributeId',
  },
};
