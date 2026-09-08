import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const PERFORMANCE_ANALYTICS = {
  TYPES: {
    ...COMMON_TYPES,
    SYSTEM: 'system',
    APPLICATION: 'application',
    DATABASE: 'database',
    API: 'api',
  },
  METRICS: {
    RESPONSE_TIME: 'response_time',
    THROUGHPUT: 'throughput',
    ERROR_RATE: 'error_rate',
    AVAILABILITY: 'availability',
    CPU_USAGE: 'cpu_usage',
    MEMORY_USAGE: 'memory_usage',
    DISK_USAGE: 'disk_usage',
    NETWORK_USAGE: 'network_usage',
  },
  PERFORMANCE_THRESHOLDS: {
    EXCELLENT: 100,
    GOOD: 80,
    AVERAGE: 60,
    POOR: 40,
    CRITICAL: 20,
  },
} as const;
