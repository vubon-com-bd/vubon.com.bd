import type { TApiModule } from '../utility/type.js';

export const healthApi: TApiModule = {
  check: {
    endpoint: 'check',
    method: 'GET',
    path: '/health',
  },
};
