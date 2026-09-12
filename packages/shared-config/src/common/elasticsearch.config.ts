import { getOptionalEnv } from './env/env.validation';

export const elasticsearchConfig = {
  node: getOptionalEnv('ELASTICSEARCH_URL', 'http://localhost:9200'),
  auth: {
    username: getOptionalEnv('ELASTICSEARCH_USERNAME', 'elastic'),
    password: getOptionalEnv('ELASTICSEARCH_PASSWORD', ''),
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
} as const;
