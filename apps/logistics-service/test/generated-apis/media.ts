import type { TApiModule } from '../utility/type.js';

export const mediaApi: TApiModule = {
  list: {
    endpoint: 'list',
    method: 'GET',
    path: '/products/:productId/media',
  },
  add: {
    endpoint: 'add',
    method: 'POST',
    path: '/products/:productId/media',
    payload: () => ({
      items: [
        {
          url: 'https://example.com/image.jpg',
          type: 'image',
          order: 0,
          isPrimary: true,
        },
      ],
    }),
  },
  remove: {
    endpoint: 'remove',
    method: 'DELETE',
    path: '/products/:productId/media/:mediaUrl',
  },
};
