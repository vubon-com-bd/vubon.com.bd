import { getEnv } from './env/env.validation';

export const elasticsearchConfig = {
  node: getEnv('ELASTICSEARCH_URL', 'http://localhost:9200'),
  auth: {
    username: getEnv('ELASTICSEARCH_USERNAME', 'elastic'),
    password: getEnv('ELASTICSEARCH_PASSWORD', 'changeme'),
  },
  maxRetries: 3,
  requestTimeout: 30000,
  sniffOnStart: true,
  sniffOnConnectionFault: true,
  indices: {
    products: 'products',
    vendors: 'vendors',
    orders: 'orders',
    users: 'users',
    logs: 'logs',
  },
};
