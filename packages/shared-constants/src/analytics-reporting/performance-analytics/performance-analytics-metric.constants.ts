/**
 * @fileoverview Performance analytics metrics and measurements definitions
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Performance analytics metrics
 */
export enum PerformanceAnalyticsMetric {
  /** Page load time in milliseconds */
  PAGE_LOAD_TIME = 'PAGE_LOAD_TIME',
  /** First Contentful Paint in milliseconds */
  FIRST_CONTENTFUL_PAINT = 'FIRST_CONTENTFUL_PAINT',
  /** Largest Contentful Paint in milliseconds */
  LARGEST_CONTENTFUL_PAINT = 'LARGEST_CONTENTFUL_PAINT',
  /** Time to Interactive in milliseconds */
  TIME_TO_INTERACTIVE = 'TIME_TO_INTERACTIVE',
  /** Total Blocking Time in milliseconds */
  TOTAL_BLOCKING_TIME = 'TOTAL_BLOCKING_TIME',
  /** Cumulative Layout Shift score */
  CUMULATIVE_LAYOUT_SHIFT = 'CUMULATIVE_LAYOUT_SHIFT',
  /** Server response time in milliseconds */
  SERVER_RESPONSE_TIME = 'SERVER_RESPONSE_TIME',
  /** API response time in milliseconds */
  API_RESPONSE_TIME = 'API_RESPONSE_TIME',
  /** Database query time in milliseconds */
  DATABASE_QUERY_TIME = 'DATABASE_QUERY_TIME',
  /** Cache hit rate percentage */
  CACHE_HIT_RATE = 'CACHE_HIT_RATE',
  /** Cache miss rate percentage */
  CACHE_MISS_RATE = 'CACHE_MISS_RATE',
  /** Error rate percentage */
  ERROR_RATE = 'ERROR_RATE',
  /** System uptime percentage */
  SYSTEM_UPTIME = 'SYSTEM_UPTIME',
  /** System downtime in minutes */
  SYSTEM_DOWNTIME = 'SYSTEM_DOWNTIME',
  /** CPU usage percentage */
  CPU_USAGE = 'CPU_USAGE',
  /** Memory usage percentage */
  MEMORY_USAGE = 'MEMORY_USAGE',
  /** Disk usage percentage */
  DISK_USAGE = 'DISK_USAGE',
  /** Network throughput in Mbps */
  NETWORK_THROUGHPUT = 'NETWORK_THROUGHPUT',
  /** Network latency in milliseconds */
  NETWORK_LATENCY = 'NETWORK_LATENCY',
  /** Throughput per second */
  THROUGHPUT_PER_SECOND = 'THROUGHPUT_PER_SECOND',
  /** Concurrent users */
  CONCURRENT_USERS = 'CONCURRENT_USERS',
  /** Request queue length */
  REQUEST_QUEUE_LENGTH = 'REQUEST_QUEUE_LENGTH',
  /** Worker utilization percentage */
  WORKER_UTILIZATION = 'WORKER_UTILIZATION',
  /** Session active count */
  SESSION_ACTIVE_COUNT = 'SESSION_ACTIVE_COUNT',
  /** Database connection pool usage */
  DATABASE_CONNECTION_POOL = 'DATABASE_CONNECTION_POOL',
  /** API rate limit usage percentage */
  API_RATE_LIMIT_USAGE = 'API_RATE_LIMIT_USAGE',
  /** CDN hit rate percentage */
  CDN_HIT_RATE = 'CDN_HIT_RATE',
  /** SSL handshake time in milliseconds */
  SSL_HANDSHAKE_TIME = 'SSL_HANDSHAKE_TIME',
  /** HTTP request duration */
  HTTP_REQUEST_DURATION = 'HTTP_REQUEST_DURATION',
  /** DNS resolution time */
  DNS_RESOLUTION_TIME = 'DNS_RESOLUTION_TIME',
  /** TCP connection time */
  TCP_CONNECTION_TIME = 'TCP_CONNECTION_TIME',
  /** TLS handshake time */
  TLS_HANDSHAKE_TIME = 'TLS_HANDSHAKE_TIME',
  /** First byte time */
  FIRST_BYTE_TIME = 'FIRST_BYTE_TIME',
  /** DOM interactive time */
  DOM_INTERACTIVE_TIME = 'DOM_INTERACTIVE_TIME',
  /** DOM content loaded */
  DOM_CONTENT_LOADED = 'DOM_CONTENT_LOADED',
  /** Resource timing */
  RESOURCE_TIMING = 'RESOURCE_TIMING',
}

/**
 * Performance metric type classification
 */
export enum PerformanceAnalyticsMetricType {
  /** Web performance metrics */
  WEB_PERFORMANCE = 'WEB_PERFORMANCE',
  /** Server performance metrics */
  SERVER_PERFORMANCE = 'SERVER_PERFORMANCE',
  /** Network performance metrics */
  NETWORK = 'NETWORK',
  /** System performance metrics */
  SYSTEM = 'SYSTEM',
  /** Resource performance metrics */
  RESOURCE = 'RESOURCE',
  /** Database performance metrics */
  DATABASE = 'DATABASE',
  /** API performance metrics */
  API = 'API',
}

/**
 * Performance metric category mapping
 */
export const PERFORMANCE_ANALYTICS_METRIC_CATEGORY_MAP: Record<
  PerformanceAnalyticsMetric,
  PerformanceAnalyticsMetricType
> = {
  [PerformanceAnalyticsMetric.PAGE_LOAD_TIME]: PerformanceAnalyticsMetricType.WEB_PERFORMANCE,
  [PerformanceAnalyticsMetric.FIRST_CONTENTFUL_PAINT]:
    PerformanceAnalyticsMetricType.WEB_PERFORMANCE,
  [PerformanceAnalyticsMetric.LARGEST_CONTENTFUL_PAINT]:
    PerformanceAnalyticsMetricType.WEB_PERFORMANCE,
  [PerformanceAnalyticsMetric.TIME_TO_INTERACTIVE]: PerformanceAnalyticsMetricType.WEB_PERFORMANCE,
  [PerformanceAnalyticsMetric.TOTAL_BLOCKING_TIME]: PerformanceAnalyticsMetricType.WEB_PERFORMANCE,
  [PerformanceAnalyticsMetric.CUMULATIVE_LAYOUT_SHIFT]:
    PerformanceAnalyticsMetricType.WEB_PERFORMANCE,
  [PerformanceAnalyticsMetric.SERVER_RESPONSE_TIME]:
    PerformanceAnalyticsMetricType.SERVER_PERFORMANCE,
  [PerformanceAnalyticsMetric.API_RESPONSE_TIME]: PerformanceAnalyticsMetricType.API,
  [PerformanceAnalyticsMetric.DATABASE_QUERY_TIME]: PerformanceAnalyticsMetricType.DATABASE,
  [PerformanceAnalyticsMetric.CACHE_HIT_RATE]: PerformanceAnalyticsMetricType.SERVER_PERFORMANCE,
  [PerformanceAnalyticsMetric.CACHE_MISS_RATE]: PerformanceAnalyticsMetricType.SERVER_PERFORMANCE,
  [PerformanceAnalyticsMetric.ERROR_RATE]: PerformanceAnalyticsMetricType.SYSTEM,
  [PerformanceAnalyticsMetric.SYSTEM_UPTIME]: PerformanceAnalyticsMetricType.SYSTEM,
  [PerformanceAnalyticsMetric.SYSTEM_DOWNTIME]: PerformanceAnalyticsMetricType.SYSTEM,
  [PerformanceAnalyticsMetric.CPU_USAGE]: PerformanceAnalyticsMetricType.RESOURCE,
  [PerformanceAnalyticsMetric.MEMORY_USAGE]: PerformanceAnalyticsMetricType.RESOURCE,
  [PerformanceAnalyticsMetric.DISK_USAGE]: PerformanceAnalyticsMetricType.RESOURCE,
  [PerformanceAnalyticsMetric.NETWORK_THROUGHPUT]: PerformanceAnalyticsMetricType.NETWORK,
  [PerformanceAnalyticsMetric.NETWORK_LATENCY]: PerformanceAnalyticsMetricType.NETWORK,
  [PerformanceAnalyticsMetric.THROUGHPUT_PER_SECOND]:
    PerformanceAnalyticsMetricType.SERVER_PERFORMANCE,
  [PerformanceAnalyticsMetric.CONCURRENT_USERS]: PerformanceAnalyticsMetricType.SERVER_PERFORMANCE,
  [PerformanceAnalyticsMetric.REQUEST_QUEUE_LENGTH]:
    PerformanceAnalyticsMetricType.SERVER_PERFORMANCE,
  [PerformanceAnalyticsMetric.WORKER_UTILIZATION]: PerformanceAnalyticsMetricType.RESOURCE,
  [PerformanceAnalyticsMetric.SESSION_ACTIVE_COUNT]:
    PerformanceAnalyticsMetricType.SERVER_PERFORMANCE,
  [PerformanceAnalyticsMetric.DATABASE_CONNECTION_POOL]: PerformanceAnalyticsMetricType.DATABASE,
  [PerformanceAnalyticsMetric.API_RATE_LIMIT_USAGE]: PerformanceAnalyticsMetricType.API,
  [PerformanceAnalyticsMetric.CDN_HIT_RATE]: PerformanceAnalyticsMetricType.NETWORK,
  [PerformanceAnalyticsMetric.SSL_HANDSHAKE_TIME]: PerformanceAnalyticsMetricType.NETWORK,
  [PerformanceAnalyticsMetric.HTTP_REQUEST_DURATION]: PerformanceAnalyticsMetricType.NETWORK,
  [PerformanceAnalyticsMetric.DNS_RESOLUTION_TIME]: PerformanceAnalyticsMetricType.NETWORK,
  [PerformanceAnalyticsMetric.TCP_CONNECTION_TIME]: PerformanceAnalyticsMetricType.NETWORK,
  [PerformanceAnalyticsMetric.TLS_HANDSHAKE_TIME]: PerformanceAnalyticsMetricType.NETWORK,
  [PerformanceAnalyticsMetric.FIRST_BYTE_TIME]: PerformanceAnalyticsMetricType.WEB_PERFORMANCE,
  [PerformanceAnalyticsMetric.DOM_INTERACTIVE_TIME]: PerformanceAnalyticsMetricType.WEB_PERFORMANCE,
  [PerformanceAnalyticsMetric.DOM_CONTENT_LOADED]: PerformanceAnalyticsMetricType.WEB_PERFORMANCE,
  [PerformanceAnalyticsMetric.RESOURCE_TIMING]: PerformanceAnalyticsMetricType.WEB_PERFORMANCE,
};

/**
 * Performance metric format type
 */
export enum PerformanceAnalyticsMetricFormat {
  /** Milliseconds */
  MILLISECONDS = 'MILLISECONDS',
  /** Percentage */
  PERCENTAGE = 'PERCENTAGE',
  /** Number */
  NUMBER = 'NUMBER',
  /** Seconds */
  SECONDS = 'SECONDS',
  /** Mbps */
  MBPS = 'MBPS',
  /** Score */
  SCORE = 'SCORE',
  /** Minutes */
  MINUTES = 'MINUTES',
}

/**
 * Performance metric configuration
 */
export interface PerformanceAnalyticsMetricConfig {
  label: string;
  description: string;
  format: PerformanceAnalyticsMetricFormat;
  icon?: string;
  color?: string;
  isReversed: boolean;
  priority: number;
  threshold?: {
    good: number;
    average: number;
    poor: number;
  };
}

export const PERFORMANCE_ANALYTICS_METRIC_CONFIG: Record<
  PerformanceAnalyticsMetric,
  PerformanceAnalyticsMetricConfig
> = {
  [PerformanceAnalyticsMetric.PAGE_LOAD_TIME]: {
    label: 'Page Load Time',
    description: 'Time taken to load the page',
    format: PerformanceAnalyticsMetricFormat.MILLISECONDS,
    icon: 'Globe',
    color: '#3B82F6',
    isReversed: true,
    priority: 1,
    threshold: {
      good: 1000,
      average: 2000,
      poor: 4000,
    },
  },
  [PerformanceAnalyticsMetric.FIRST_CONTENTFUL_PAINT]: {
    label: 'First Contentful Paint',
    description: 'Time to first contentful paint',
    format: PerformanceAnalyticsMetricFormat.MILLISECONDS,
    icon: 'Eye',
    color: '#6366F1',
    isReversed: true,
    priority: 1,
    threshold: {
      good: 800,
      average: 1800,
      poor: 3000,
    },
  },
  [PerformanceAnalyticsMetric.LARGEST_CONTENTFUL_PAINT]: {
    label: 'Largest Contentful Paint',
    description: 'Time to largest contentful paint',
    format: PerformanceAnalyticsMetricFormat.MILLISECONDS,
    icon: 'Image',
    color: '#8B5CF6',
    isReversed: true,
    priority: 1,
    threshold: {
      good: 1200,
      average: 2500,
      poor: 4000,
    },
  },
  [PerformanceAnalyticsMetric.TIME_TO_INTERACTIVE]: {
    label: 'Time to Interactive',
    description: 'Time to become interactive',
    format: PerformanceAnalyticsMetricFormat.MILLISECONDS,
    icon: 'MousePointerClick',
    color: '#10B981',
    isReversed: true,
    priority: 1,
    threshold: {
      good: 1500,
      average: 3000,
      poor: 5000,
    },
  },
  [PerformanceAnalyticsMetric.TOTAL_BLOCKING_TIME]: {
    label: 'Total Blocking Time',
    description: 'Total blocking time before interactive',
    format: PerformanceAnalyticsMetricFormat.MILLISECONDS,
    icon: 'Clock',
    color: '#F59E0B',
    isReversed: true,
    priority: 2,
    threshold: {
      good: 200,
      average: 400,
      poor: 600,
    },
  },
  [PerformanceAnalyticsMetric.CUMULATIVE_LAYOUT_SHIFT]: {
    label: 'Cumulative Layout Shift',
    description: 'Cumulative layout shift score',
    format: PerformanceAnalyticsMetricFormat.SCORE,
    icon: 'Layout',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
    threshold: {
      good: 0.1,
      average: 0.25,
      poor: 0.5,
    },
  },
  [PerformanceAnalyticsMetric.SERVER_RESPONSE_TIME]: {
    label: 'Server Response Time',
    description: 'Time taken by server to respond',
    format: PerformanceAnalyticsMetricFormat.MILLISECONDS,
    icon: 'Server',
    color: '#6366F1',
    isReversed: true,
    priority: 1,
    threshold: {
      good: 200,
      average: 500,
      poor: 1000,
    },
  },
  [PerformanceAnalyticsMetric.API_RESPONSE_TIME]: {
    label: 'API Response Time',
    description: 'Average API endpoint response time',
    format: PerformanceAnalyticsMetricFormat.MILLISECONDS,
    icon: 'Code',
    color: '#8B5CF6',
    isReversed: true,
    priority: 1,
    threshold: {
      good: 100,
      average: 300,
      poor: 600,
    },
  },
  [PerformanceAnalyticsMetric.DATABASE_QUERY_TIME]: {
    label: 'Database Query Time',
    description: 'Average database query execution time',
    format: PerformanceAnalyticsMetricFormat.MILLISECONDS,
    icon: 'Database',
    color: '#10B981',
    isReversed: true,
    priority: 1,
    threshold: {
      good: 50,
      average: 150,
      poor: 300,
    },
  },
  [PerformanceAnalyticsMetric.CACHE_HIT_RATE]: {
    label: 'Cache Hit Rate',
    description: 'Percentage of cache hits',
    format: PerformanceAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Zap',
    color: '#22C55E',
    isReversed: false,
    priority: 2,
    threshold: {
      good: 90,
      average: 80,
      poor: 70,
    },
  },
  [PerformanceAnalyticsMetric.CACHE_MISS_RATE]: {
    label: 'Cache Miss Rate',
    description: 'Percentage of cache misses',
    format: PerformanceAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Zap',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
    threshold: {
      good: 10,
      average: 20,
      poor: 30,
    },
  },
  [PerformanceAnalyticsMetric.ERROR_RATE]: {
    label: 'Error Rate',
    description: 'Percentage of errors',
    format: PerformanceAnalyticsMetricFormat.PERCENTAGE,
    icon: 'AlertCircle',
    color: '#EF4444',
    isReversed: true,
    priority: 1,
    threshold: {
      good: 1,
      average: 3,
      poor: 5,
    },
  },
  [PerformanceAnalyticsMetric.SYSTEM_UPTIME]: {
    label: 'System Uptime',
    description: 'System uptime percentage',
    format: PerformanceAnalyticsMetricFormat.PERCENTAGE,
    icon: 'CheckCircle',
    color: '#22C55E',
    isReversed: false,
    priority: 1,
    threshold: {
      good: 99.99,
      average: 99.9,
      poor: 99,
    },
  },
  [PerformanceAnalyticsMetric.SYSTEM_DOWNTIME]: {
    label: 'System Downtime',
    description: 'Total system downtime in minutes',
    format: PerformanceAnalyticsMetricFormat.MINUTES,
    icon: 'XCircle',
    color: '#EF4444',
    isReversed: true,
    priority: 2,
  },
  [PerformanceAnalyticsMetric.CPU_USAGE]: {
    label: 'CPU Usage',
    description: 'CPU utilization percentage',
    format: PerformanceAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Cpu',
    color: '#F59E0B',
    isReversed: true,
    priority: 2,
    threshold: {
      good: 50,
      average: 70,
      poor: 85,
    },
  },
  [PerformanceAnalyticsMetric.MEMORY_USAGE]: {
    label: 'Memory Usage',
    description: 'Memory utilization percentage',
    format: PerformanceAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Memory',
    color: '#6366F1',
    isReversed: true,
    priority: 2,
    threshold: {
      good: 60,
      average: 75,
      poor: 85,
    },
  },
  [PerformanceAnalyticsMetric.DISK_USAGE]: {
    label: 'Disk Usage',
    description: 'Disk utilization percentage',
    format: PerformanceAnalyticsMetricFormat.PERCENTAGE,
    icon: 'HardDrive',
    color: '#6B7280',
    isReversed: true,
    priority: 2,
    threshold: {
      good: 70,
      average: 80,
      poor: 90,
    },
  },
  [PerformanceAnalyticsMetric.NETWORK_THROUGHPUT]: {
    label: 'Network Throughput',
    description: 'Network throughput in Mbps',
    format: PerformanceAnalyticsMetricFormat.MBPS,
    icon: 'Network',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
  },
  [PerformanceAnalyticsMetric.NETWORK_LATENCY]: {
    label: 'Network Latency',
    description: 'Network latency in milliseconds',
    format: PerformanceAnalyticsMetricFormat.MILLISECONDS,
    icon: 'Network',
    color: '#F59E0B',
    isReversed: true,
    priority: 2,
    threshold: {
      good: 50,
      average: 100,
      poor: 200,
    },
  },
  [PerformanceAnalyticsMetric.THROUGHPUT_PER_SECOND]: {
    label: 'Throughput Per Second',
    description: 'Number of requests per second',
    format: PerformanceAnalyticsMetricFormat.NUMBER,
    icon: 'Activity',
    color: '#10B981',
    isReversed: false,
    priority: 2,
  },
  [PerformanceAnalyticsMetric.CONCURRENT_USERS]: {
    label: 'Concurrent Users',
    description: 'Number of concurrent users',
    format: PerformanceAnalyticsMetricFormat.NUMBER,
    icon: 'Users',
    color: '#8B5CF6',
    isReversed: false,
    priority: 2,
  },
  [PerformanceAnalyticsMetric.REQUEST_QUEUE_LENGTH]: {
    label: 'Request Queue Length',
    description: 'Length of request queue',
    format: PerformanceAnalyticsMetricFormat.NUMBER,
    icon: 'List',
    color: '#F59E0B',
    isReversed: true,
    priority: 2,
  },
  [PerformanceAnalyticsMetric.WORKER_UTILIZATION]: {
    label: 'Worker Utilization',
    description: 'Worker utilization percentage',
    format: PerformanceAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Activity',
    color: '#6366F1',
    isReversed: true,
    priority: 2,
    threshold: {
      good: 60,
      average: 75,
      poor: 85,
    },
  },
  [PerformanceAnalyticsMetric.SESSION_ACTIVE_COUNT]: {
    label: 'Active Sessions',
    description: 'Number of active sessions',
    format: PerformanceAnalyticsMetricFormat.NUMBER,
    icon: 'User',
    color: '#22C55E',
    isReversed: false,
    priority: 2,
  },
  [PerformanceAnalyticsMetric.DATABASE_CONNECTION_POOL]: {
    label: 'Database Connection Pool',
    description: 'Database connection pool usage percentage',
    format: PerformanceAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Database',
    color: '#10B981',
    isReversed: true,
    priority: 2,
    threshold: {
      good: 50,
      average: 70,
      poor: 85,
    },
  },
  [PerformanceAnalyticsMetric.API_RATE_LIMIT_USAGE]: {
    label: 'API Rate Limit Usage',
    description: 'API rate limit usage percentage',
    format: PerformanceAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Code',
    color: '#8B5CF6',
    isReversed: true,
    priority: 2,
    threshold: {
      good: 60,
      average: 75,
      poor: 90,
    },
  },
  [PerformanceAnalyticsMetric.CDN_HIT_RATE]: {
    label: 'CDN Hit Rate',
    description: 'CDN cache hit rate percentage',
    format: PerformanceAnalyticsMetricFormat.PERCENTAGE,
    icon: 'Globe',
    color: '#3B82F6',
    isReversed: false,
    priority: 2,
    threshold: {
      good: 85,
      average: 75,
      poor: 60,
    },
  },
  [PerformanceAnalyticsMetric.SSL_HANDSHAKE_TIME]: {
    label: 'SSL Handshake Time',
    description: 'SSL/TLS handshake time',
    format: PerformanceAnalyticsMetricFormat.MILLISECONDS,
    icon: 'Shield',
    color: '#6366F1',
    isReversed: true,
    priority: 2,
  },
  [PerformanceAnalyticsMetric.HTTP_REQUEST_DURATION]: {
    label: 'HTTP Request Duration',
    description: 'Average HTTP request duration',
    format: PerformanceAnalyticsMetricFormat.MILLISECONDS,
    icon: 'Globe',
    color: '#8B5CF6',
    isReversed: true,
    priority: 2,
  },
  [PerformanceAnalyticsMetric.DNS_RESOLUTION_TIME]: {
    label: 'DNS Resolution Time',
    description: 'DNS resolution time in milliseconds',
    format: PerformanceAnalyticsMetricFormat.MILLISECONDS,
    icon: 'Globe',
    color: '#F59E0B',
    isReversed: true,
    priority: 3,
  },
  [PerformanceAnalyticsMetric.TCP_CONNECTION_TIME]: {
    label: 'TCP Connection Time',
    description: 'TCP connection time in milliseconds',
    format: PerformanceAnalyticsMetricFormat.MILLISECONDS,
    icon: 'Network',
    color: '#10B981',
    isReversed: true,
    priority: 3,
  },
  [PerformanceAnalyticsMetric.TLS_HANDSHAKE_TIME]: {
    label: 'TLS Handshake Time',
    description: 'TLS handshake time in milliseconds',
    format: PerformanceAnalyticsMetricFormat.MILLISECONDS,
    icon: 'Lock',
    color: '#6366F1',
    isReversed: true,
    priority: 3,
  },
  [PerformanceAnalyticsMetric.FIRST_BYTE_TIME]: {
    label: 'First Byte Time',
    description: 'Time to first byte in milliseconds',
    format: PerformanceAnalyticsMetricFormat.MILLISECONDS,
    icon: 'FileText',
    color: '#8B5CF6',
    isReversed: true,
    priority: 2,
  },
  [PerformanceAnalyticsMetric.DOM_INTERACTIVE_TIME]: {
    label: 'DOM Interactive Time',
    description: 'Time to DOM interactive',
    format: PerformanceAnalyticsMetricFormat.MILLISECONDS,
    icon: 'FileText',
    color: '#3B82F6',
    isReversed: true,
    priority: 2,
  },
  [PerformanceAnalyticsMetric.DOM_CONTENT_LOADED]: {
    label: 'DOM Content Loaded',
    description: 'DOM content loaded time',
    format: PerformanceAnalyticsMetricFormat.MILLISECONDS,
    icon: 'FileText',
    color: '#10B981',
    isReversed: true,
    priority: 2,
  },
  [PerformanceAnalyticsMetric.RESOURCE_TIMING]: {
    label: 'Resource Timing',
    description: 'Resource loading timing',
    format: PerformanceAnalyticsMetricFormat.MILLISECONDS,
    icon: 'Package',
    color: '#F59E0B',
    isReversed: true,
    priority: 2,
  },
};

/**
 * Get performance metric category
 */
export function getPerformanceMetricCategory(
  metric: PerformanceAnalyticsMetric
): PerformanceAnalyticsMetricType {
  return PERFORMANCE_ANALYTICS_METRIC_CATEGORY_MAP[metric];
}

/**
 * Get performance metric label
 */
export function getPerformanceMetricLabel(metric: PerformanceAnalyticsMetric): string {
  return PERFORMANCE_ANALYTICS_METRIC_CONFIG[metric]?.label || metric;
}

/**
 * Get performance metric description
 */
export function getPerformanceMetricDescription(metric: PerformanceAnalyticsMetric): string {
  return PERFORMANCE_ANALYTICS_METRIC_CONFIG[metric]?.description || '';
}

/**
 * Get performance metric format
 */
export function getPerformanceMetricFormat(
  metric: PerformanceAnalyticsMetric
): PerformanceAnalyticsMetricFormat {
  return (
    PERFORMANCE_ANALYTICS_METRIC_CONFIG[metric]?.format || PerformanceAnalyticsMetricFormat.NUMBER
  );
}

/**
 * Check if performance metric is reversed (lower is better)
 */
export function isPerformanceMetricReversed(metric: PerformanceAnalyticsMetric): boolean {
  return PERFORMANCE_ANALYTICS_METRIC_CONFIG[metric]?.isReversed || false;
}

/**
 * Get performance metrics by category
 */
export function getPerformanceMetricsByCategory(
  category: PerformanceAnalyticsMetricType
): PerformanceAnalyticsMetric[] {
  return Object.entries(PERFORMANCE_ANALYTICS_METRIC_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([metric]) => metric as PerformanceAnalyticsMetric);
}

/**
 * Format performance metric value
 */
export function formatPerformanceMetricValue(
  metric: PerformanceAnalyticsMetric,
  value: number
): string {
  const format = getPerformanceMetricFormat(metric);

  switch (format) {
    case PerformanceAnalyticsMetricFormat.MILLISECONDS:
      if (value >= 1000) {
        return `${(value / 1000).toFixed(2)}s`;
      }
      return `${Math.round(value)}ms`;
    case PerformanceAnalyticsMetricFormat.PERCENTAGE:
      return `${(value * 100).toFixed(2)}%`;
    case PerformanceAnalyticsMetricFormat.MBPS:
      return `${value.toFixed(2)} Mbps`;
    case PerformanceAnalyticsMetricFormat.MINUTES:
      if (value >= 60) {
        const hours = Math.floor(value / 60);
        const minutes = Math.round(value % 60);
        return `${hours}h ${minutes}m`;
      }
      return `${Math.round(value)}m`;
    case PerformanceAnalyticsMetricFormat.SCORE:
      return value.toFixed(3);
    default:
      return value.toLocaleString();
  }
}

/**
 * Get performance metric priority
 */
export function getPerformanceMetricPriority(metric: PerformanceAnalyticsMetric): number {
  return PERFORMANCE_ANALYTICS_METRIC_CONFIG[metric]?.priority || 3;
}

/**
 * Get high priority performance metrics
 */
export function getHighPriorityPerformanceMetrics(): PerformanceAnalyticsMetric[] {
  return Object.values(PerformanceAnalyticsMetric).filter(
    (metric) => getPerformanceMetricPriority(metric) === 1
  );
}

/**
 * Get performance metric thresholds
 */
export function getPerformanceMetricThreshold(
  metric: PerformanceAnalyticsMetric
): { good: number; average: number; poor: number } | undefined {
  return PERFORMANCE_ANALYTICS_METRIC_CONFIG[metric]?.threshold;
}

/**
 * Evaluate performance metric performance
 */
export function evaluatePerformanceMetricPerformance(
  metric: PerformanceAnalyticsMetric,
  value: number
): 'good' | 'average' | 'poor' {
  const threshold = getPerformanceMetricThreshold(metric);
  if (!threshold) {
    return 'average';
  }

  const isReversed = isPerformanceMetricReversed(metric);

  if (isReversed) {
    if (value <= threshold.good) return 'good';
    if (value <= threshold.average) return 'average';
    return 'poor';
  } else {
    if (value >= threshold.good) return 'good';
    if (value >= threshold.average) return 'average';
    return 'poor';
  }
}

/**
 * Performance dashboard metrics
 */
export const PERFORMANCE_DASHBOARD_METRICS: PerformanceAnalyticsMetric[] = [
  PerformanceAnalyticsMetric.PAGE_LOAD_TIME,
  PerformanceAnalyticsMetric.FIRST_CONTENTFUL_PAINT,
  PerformanceAnalyticsMetric.LARGEST_CONTENTFUL_PAINT,
  PerformanceAnalyticsMetric.SERVER_RESPONSE_TIME,
  PerformanceAnalyticsMetric.API_RESPONSE_TIME,
  PerformanceAnalyticsMetric.DATABASE_QUERY_TIME,
  PerformanceAnalyticsMetric.ERROR_RATE,
  PerformanceAnalyticsMetric.SYSTEM_UPTIME,
  PerformanceAnalyticsMetric.CPU_USAGE,
  PerformanceAnalyticsMetric.MEMORY_USAGE,
];

/**
 * Web performance metrics
 */
export const WEB_PERFORMANCE_METRICS: PerformanceAnalyticsMetric[] = [
  PerformanceAnalyticsMetric.PAGE_LOAD_TIME,
  PerformanceAnalyticsMetric.FIRST_CONTENTFUL_PAINT,
  PerformanceAnalyticsMetric.LARGEST_CONTENTFUL_PAINT,
  PerformanceAnalyticsMetric.TIME_TO_INTERACTIVE,
  PerformanceAnalyticsMetric.TOTAL_BLOCKING_TIME,
  PerformanceAnalyticsMetric.CUMULATIVE_LAYOUT_SHIFT,
  PerformanceAnalyticsMetric.DOM_INTERACTIVE_TIME,
  PerformanceAnalyticsMetric.DOM_CONTENT_LOADED,
];

/**
 * Server performance metrics
 */
export const SERVER_PERFORMANCE_METRICS: PerformanceAnalyticsMetric[] = [
  PerformanceAnalyticsMetric.SERVER_RESPONSE_TIME,
  PerformanceAnalyticsMetric.API_RESPONSE_TIME,
  PerformanceAnalyticsMetric.DATABASE_QUERY_TIME,
  PerformanceAnalyticsMetric.CACHE_HIT_RATE,
  PerformanceAnalyticsMetric.THROUGHPUT_PER_SECOND,
  PerformanceAnalyticsMetric.CONCURRENT_USERS,
  PerformanceAnalyticsMetric.REQUEST_QUEUE_LENGTH,
];

/**
 * Infrastructure performance metrics
 */
export const INFRASTRUCTURE_PERFORMANCE_METRICS: PerformanceAnalyticsMetric[] = [
  PerformanceAnalyticsMetric.CPU_USAGE,
  PerformanceAnalyticsMetric.MEMORY_USAGE,
  PerformanceAnalyticsMetric.DISK_USAGE,
  PerformanceAnalyticsMetric.NETWORK_THROUGHPUT,
  PerformanceAnalyticsMetric.NETWORK_LATENCY,
  PerformanceAnalyticsMetric.WORKER_UTILIZATION,
  PerformanceAnalyticsMetric.DATABASE_CONNECTION_POOL,
];
