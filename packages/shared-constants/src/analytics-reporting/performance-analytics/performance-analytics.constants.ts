/**
 * @fileoverview Performance analytics system core constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Performance thresholds
 */
export interface PerformanceThresholds {
  /** Response time threshold in milliseconds */
  responseTimeThreshold: number;
  /** CPU usage threshold percentage */
  cpuUsageThreshold: number;
  /** Memory usage threshold percentage */
  memoryUsageThreshold: number;
  /** Disk usage threshold percentage */
  diskUsageThreshold: number;
  /** Network latency threshold in milliseconds */
  networkLatencyThreshold: number;
  /** Error rate threshold percentage */
  errorRateThreshold: number;
}

export const DEFAULT_PERFORMANCE_THRESHOLDS: PerformanceThresholds = {
  responseTimeThreshold: 500,
  cpuUsageThreshold: 80,
  memoryUsageThreshold: 85,
  diskUsageThreshold: 90,
  networkLatencyThreshold: 100,
  errorRateThreshold: 5,
};

/**
 * Response time alert settings
 */
export interface ResponseTimeAlertSettings {
  /** Enable response time alerts */
  enableAlerts: boolean;
  /** Warning threshold in milliseconds */
  warningThreshold: number;
  /** Critical threshold in milliseconds */
  criticalThreshold: number;
  /** Alert check interval in seconds */
  checkIntervalSeconds: number;
  /** Minimum samples for alert */
  minSamples: number;
  /** Alert escalation time in minutes */
  escalationMinutes: number;
}

export const DEFAULT_RESPONSE_TIME_ALERT_SETTINGS: ResponseTimeAlertSettings = {
  enableAlerts: true,
  warningThreshold: 300,
  criticalThreshold: 500,
  checkIntervalSeconds: 60,
  minSamples: 5,
  escalationMinutes: 15,
};

/**
 * System uptime targets
 */
export interface SystemUptimeTargets {
  /** Monthly uptime target percentage */
  monthlyTarget: number;
  /** Quarterly uptime target percentage */
  quarterlyTarget: number;
  /** Annual uptime target percentage */
  annualTarget: number;
  /** Uptime measurement window in minutes */
  measurementWindowMinutes: number;
  /** Allowed downtime in minutes per month */
  allowedDowntimeMinutes: number;
  /** Maintenance window in minutes */
  maintenanceWindowMinutes: number;
}

export const DEFAULT_SYSTEM_UPTIME_TARGETS: SystemUptimeTargets = {
  monthlyTarget: 99.9,
  quarterlyTarget: 99.95,
  annualTarget: 99.99,
  measurementWindowMinutes: 1440,
  allowedDowntimeMinutes: 43,
  maintenanceWindowMinutes: 60,
};

/**
 * Error rate thresholds
 */
export interface ErrorRateThresholds {
  /** Error rate warning threshold percentage */
  warningThreshold: number;
  /** Error rate critical threshold percentage */
  criticalThreshold: number;
  /** Error rate alert window in minutes */
  alertWindowMinutes: number;
  /** Minimum requests for error rate calculation */
  minRequests: number;
  /** Error rate calculation period in minutes */
  calculationPeriodMinutes: number;
}

export const DEFAULT_ERROR_RATE_THRESHOLDS: ErrorRateThresholds = {
  warningThreshold: 2,
  criticalThreshold: 5,
  alertWindowMinutes: 5,
  minRequests: 100,
  calculationPeriodMinutes: 15,
};

/**
 * Resource utilization limits
 */
export interface ResourceUtilizationLimits {
  /** CPU limit percentage */
  cpuLimit: number;
  /** Memory limit in MB */
  memoryLimitMB: number;
  /** Disk limit in GB */
  diskLimitGB: number;
  /** Network bandwidth limit in Mbps */
  networkBandwidthLimitMbps: number;
  /** Connection limit */
  connectionLimit: number;
  /** Request per second limit */
  requestsPerSecondLimit: number;
}

export const DEFAULT_RESOURCE_UTILIZATION_LIMITS: ResourceUtilizationLimits = {
  cpuLimit: 80,
  memoryLimitMB: 4096,
  diskLimitGB: 100,
  networkBandwidthLimitMbps: 1000,
  connectionLimit: 10000,
  requestsPerSecondLimit: 1000,
};

/**
 * Cache hit rate targets
 */
export interface CacheHitRateTargets {
  /** Minimum cache hit rate percentage */
  minimumHitRate: number;
  /** Target cache hit rate percentage */
  targetHitRate: number;
  /** Cache miss alert threshold */
  missAlertThreshold: number;
  /** Cache size limit in MB */
  cacheSizeLimitMB: number;
  /** Cache TTL in seconds */
  defaultTTLSeconds: number;
  /** Cache eviction policy */
  evictionPolicy: 'LRU' | 'LFU' | 'FIFO' | 'TTL';
}

export const DEFAULT_CACHE_HIT_RATE_TARGETS: CacheHitRateTargets = {
  minimumHitRate: 80,
  targetHitRate: 95,
  missAlertThreshold: 20,
  cacheSizeLimitMB: 1024,
  defaultTTLSeconds: 3600,
  evictionPolicy: 'LRU',
};

/**
 * Database query timeout settings
 */
export interface DatabaseQueryTimeoutSettings {
  /** Query timeout in seconds */
  queryTimeoutSeconds: number;
  /** Connection timeout in seconds */
  connectionTimeoutSeconds: number;
  /** Read timeout in seconds */
  readTimeoutSeconds: number;
  /** Write timeout in seconds */
  writeTimeoutSeconds: number;
  /** Transaction timeout in seconds */
  transactionTimeoutSeconds: number;
  /** Slow query threshold in milliseconds */
  slowQueryThresholdMs: number;
  /** Query retry attempts */
  retryAttempts: number;
}

export const DEFAULT_DATABASE_QUERY_TIMEOUT_SETTINGS: DatabaseQueryTimeoutSettings = {
  queryTimeoutSeconds: 30,
  connectionTimeoutSeconds: 10,
  readTimeoutSeconds: 20,
  writeTimeoutSeconds: 25,
  transactionTimeoutSeconds: 60,
  slowQueryThresholdMs: 100,
  retryAttempts: 3,
};

/**
 * API rate limit settings
 */
export interface APIRateLimitSettings {
  /** Default rate limit per minute */
  defaultRateLimitPerMinute: number;
  /** Rate limit per minute for authenticated users */
  authenticatedRateLimitPerMinute: number;
  /** Rate limit per minute for public endpoints */
  publicRateLimitPerMinute: number;
  /** Burst limit per minute */
  burstLimitPerMinute: number;
  /** Rate limit enforcement window in seconds */
  enforcementWindowSeconds: number;
  /** Rate limit cooldown in seconds */
  cooldownSeconds: number;
}

export const DEFAULT_API_RATE_LIMIT_SETTINGS: APIRateLimitSettings = {
  defaultRateLimitPerMinute: 100,
  authenticatedRateLimitPerMinute: 1000,
  publicRateLimitPerMinute: 50,
  burstLimitPerMinute: 200,
  enforcementWindowSeconds: 60,
  cooldownSeconds: 30,
};

/**
 * Server capacity planning settings
 */
export interface ServerCapacityPlanningSettings {
  /** CPU utilization threshold for scaling */
  cpuScaleThreshold: number;
  /** Memory utilization threshold for scaling */
  memoryScaleThreshold: number;
  /** Request per second threshold for scaling */
  requestsPerSecondScaleThreshold: number;
  /** Minimum instances */
  minInstances: number;
  /** Maximum instances */
  maxInstances: number;
  /** Scale up cooldown in minutes */
  scaleUpCooldownMinutes: number;
  /** Scale down cooldown in minutes */
  scaleDownCooldownMinutes: number;
}

export const DEFAULT_SERVER_CAPACITY_PLANNING_SETTINGS: ServerCapacityPlanningSettings = {
  cpuScaleThreshold: 70,
  memoryScaleThreshold: 75,
  requestsPerSecondScaleThreshold: 800,
  minInstances: 2,
  maxInstances: 10,
  scaleUpCooldownMinutes: 5,
  scaleDownCooldownMinutes: 15,
};

/**
 * Load balancing settings
 */
export interface LoadBalancingSettings {
  /** Load balancing algorithm */
  algorithm: 'ROUND_ROBIN' | 'LEAST_CONNECTIONS' | 'WEIGHTED' | 'RANDOM' | 'HEALTH_CHECK';
  /** Health check interval in seconds */
  healthCheckIntervalSeconds: number;
  /** Health check timeout in seconds */
  healthCheckTimeoutSeconds: number;
  /** Unhealthy threshold */
  unhealthyThreshold: number;
  /** Healthy threshold */
  healthyThreshold: number;
  /** Session stickiness */
  sessionStickiness: boolean;
  /** SSL termination */
  sslTermination: boolean;
}

export const DEFAULT_LOAD_BALANCING_SETTINGS: LoadBalancingSettings = {
  algorithm: 'ROUND_ROBIN',
  healthCheckIntervalSeconds: 30,
  healthCheckTimeoutSeconds: 5,
  unhealthyThreshold: 3,
  healthyThreshold: 2,
  sessionStickiness: true,
  sslTermination: true,
};

/**
 * Performance analytics configuration
 */
export const PERFORMANCE_ANALYTICS_CONFIG = {
  /** Maximum performance records to process */
  MAX_RECORDS: 100000,
  /** Performance analytics cache TTL in seconds */
  CACHE_TTL_SECONDS: 60,
  /** Performance query timeout in seconds */
  QUERY_TIMEOUT_SECONDS: 15,
  /** Maximum performance in report */
  MAX_PERFORMANCE_IN_REPORT: 10000,
  /** Performance data export limit */
  EXPORT_LIMIT: 50000,
  /** Performance analytics version */
  VERSION: '1.0.0',
} as const;

/**
 * Performance event types
 */
export enum PerformanceEventType {
  /** System startup */
  SYSTEM_STARTUP = 'SYSTEM_STARTUP',
  /** System shutdown */
  SYSTEM_SHUTDOWN = 'SYSTEM_SHUTDOWN',
  /** Performance degradation */
  PERFORMANCE_DEGRADATION = 'PERFORMANCE_DEGRADATION',
  /** Performance recovery */
  PERFORMANCE_RECOVERY = 'PERFORMANCE_RECOVERY',
  /** Resource alert */
  RESOURCE_ALERT = 'RESOURCE_ALERT',
  /** Service unavailable */
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
}

/**
 * Performance event configuration
 */
export const PERFORMANCE_EVENT_CONFIG: Record<
  PerformanceEventType,
  { label: string; description: string; isCritical: boolean }
> = {
  [PerformanceEventType.SYSTEM_STARTUP]: {
    label: 'System Startup',
    description: 'System has started up',
    isCritical: true,
  },
  [PerformanceEventType.SYSTEM_SHUTDOWN]: {
    label: 'System Shutdown',
    description: 'System is shutting down',
    isCritical: true,
  },
  [PerformanceEventType.PERFORMANCE_DEGRADATION]: {
    label: 'Performance Degradation',
    description: 'System performance has degraded',
    isCritical: true,
  },
  [PerformanceEventType.PERFORMANCE_RECOVERY]: {
    label: 'Performance Recovery',
    description: 'System performance has recovered',
    isCritical: true,
  },
  [PerformanceEventType.RESOURCE_ALERT]: {
    label: 'Resource Alert',
    description: 'Resource utilization has exceeded threshold',
    isCritical: true,
  },
  [PerformanceEventType.SERVICE_UNAVAILABLE]: {
    label: 'Service Unavailable',
    description: 'Service is unavailable',
    isCritical: true,
  },
};

/**
 * Performance functions
 */
export function getPerformanceEventLabel(event: PerformanceEventType): string {
  return PERFORMANCE_EVENT_CONFIG[event]?.label || event;
}

export function isPerformanceEventCritical(event: PerformanceEventType): boolean {
  return PERFORMANCE_EVENT_CONFIG[event]?.isCritical || false;
}
