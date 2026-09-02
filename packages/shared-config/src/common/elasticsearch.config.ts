/**
 * Elasticsearch Configuration
 * এলাস্টিকসার্চ কনফিগারেশন
 */
export interface ElasticsearchConfig {
  enabled: boolean;
  node: string;
  auth: {
    username: string;
    password: string;
    apiKey: string;
  };
  index: {
    prefix: string;
    shards: number;
    replicas: number;
    refreshInterval: string;
  };
  indices: {
    users: string;
    products: string;
    orders: string;
    logs: string;
    analytics: string;
  };
  mapping: {
    dynamic: boolean;
    dateDetection: boolean;
    numericDetection: boolean;
  };
}

export const createElasticsearchConfig = (): ElasticsearchConfig => ({
  enabled: false,
  node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME || '',
    password: process.env.ELASTICSEARCH_PASSWORD || '',
    apiKey: process.env.ELASTICSEARCH_API_KEY || '',
  },
  index: {
    prefix: 'vubon',
    shards: 1,
    replicas: 1,
    refreshInterval: '1s',
  },
  indices: {
    users: 'users',
    products: 'products',
    orders: 'orders',
    logs: 'logs',
    analytics: 'analytics',
  },
  mapping: {
    dynamic: true,
    dateDetection: true,
    numericDetection: true,
  },
});
