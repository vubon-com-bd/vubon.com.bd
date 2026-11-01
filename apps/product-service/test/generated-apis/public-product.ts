import type { TApiModule } from '../utility/type.js';

export const publicProductApi: TApiModule = {
  featured: {
    endpoint: 'featured',
    method: 'GET',
    path: '/public/products/featured',
  },
  search: {
    endpoint: 'search',
    method: 'GET',
    path: '/public/products/search',
  },
  getById: {
    endpoint: 'getById',
    method: 'GET',
    path: '/public/products/:id',
  },
};
