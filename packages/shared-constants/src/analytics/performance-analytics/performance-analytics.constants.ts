/**
 * Performance Analytics Constants
 * Configuration for system and application performance analytics
 */

export const PERFORMANCE_ANALYTICS = {
  // Performance Analytics Types
  TYPES: {
    // System Performance
    SYSTEM: 'system',
    CPU: 'cpu',
    MEMORY: 'memory',
    DISK: 'disk',
    NETWORK: 'network',

    // Application Performance
    APPLICATION: 'application',
    RESPONSE_TIME: 'response_time',
    THROUGHPUT: 'throughput',
    LATENCY: 'latency',

    // Database Performance
    DATABASE: 'database',
    QUERY: 'query',
    CONNECTION: 'connection',
    CACHE: 'cache',

    // API Performance
    API: 'api',
    ENDPOINT: 'endpoint',
    RATE_LIMIT: 'rate_limit',
    ERROR_RATE: 'error_rate',

    // Frontend Performance
    FRONTEND: 'frontend',
    LOAD_TIME: 'load_time',
    RENDER_TIME: 'render_time',
    INTERACTIVE: 'interactive',

    // User Performance
    USER: 'user',
    EXPERIENCE: 'experience',
    SATISFACTION: 'satisfaction',
    ENGAGEMENT: 'engagement',

    // Business Performance
    BUSINESS: 'business',
    REVENUE: 'revenue',
    GROWTH: 'growth',
    EFFICIENCY: 'efficiency',
  } as const,

  // Performance Analytics Status
  STATUS: {
    MONITORING: 'monitoring',
    COLLECTING: 'collecting',
    PROCESSING: 'processing',
    ANALYZING: 'analyzing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    PAUSED: 'paused',
    STOPPED: 'stopped',
  } as const,

  // Performance Analytics Scopes
  SCOPES: {
    SYSTEM: 'system',
    APPLICATION: 'application',
    SERVICE: 'service',
    ENDPOINT: 'endpoint',
    USER: 'user',
    BUSINESS: 'business',
    ALL: 'all',
    COMPARATIVE: 'comparative',
  } as const,

  // Performance Analytics Events
  EVENTS: {
    // System Events
    SYSTEM_START: 'system_start',
    SYSTEM_STOP: 'system_stop',
    SYSTEM_RESTART: 'system_restart',
    SYSTEM_ERROR: 'system_error',
    SYSTEM_WARNING: 'system_warning',

    // Resource Events
    CPU_HIGH: 'cpu_high',
    CPU_LOW: 'cpu_low',
    MEMORY_HIGH: 'memory_high',
    MEMORY_LOW: 'memory_low',
    DISK_FULL: 'disk_full',
    DISK_AVAILABLE: 'disk_available',
    NETWORK_SLOW: 'network_slow',
    NETWORK_FAST: 'network_fast',

    // Application Events
    APP_START: 'app_start',
    APP_STOP: 'app_stop',
    APP_ERROR: 'app_error',
    APP_WARNING: 'app_warning',
    APP_CRASH: 'app_crash',

    // Performance Events
    RESPONSE_SLOW: 'response_slow',
    RESPONSE_FAST: 'response_fast',
    LATENCY_HIGH: 'latency_high',
    LATENCY_LOW: 'latency_low',
    THROUGHPUT_HIGH: 'throughput_high',
    THROUGHPUT_LOW: 'throughput_low',
    ERROR_SPIKE: 'error_spike',
    ERROR_DROP: 'error_drop',

    // Database Events
    QUERY_SLOW: 'query_slow',
    QUERY_FAST: 'query_fast',
    CONNECTION_POOL: 'connection_pool',
    CACHE_HIT: 'cache_hit',
    CACHE_MISS: 'cache_miss',

    // API Events
    API_SLOW: 'api_slow',
    API_FAST: 'api_fast',
    RATE_LIMIT_HIT: 'rate_limit_hit',
    RATE_LIMIT_EXCEEDED: 'rate_limit_exceeded',
    ENDPOINT_ERROR: 'endpoint_error',

    // Frontend Events
    PAGE_LOAD_SLOW: 'page_load_slow',
    PAGE_LOAD_FAST: 'page_load_fast',
    RENDER_SLOW: 'render_slow',
    RENDER_FAST: 'render_fast',
    INTERACTIVE_SLOW: 'interactive_slow',
    INTERACTIVE_FAST: 'interactive_fast',

    // User Events
    USER_SATISFIED: 'user_satisfied',
    USER_UNSATISFIED: 'user_unsatisfied',
    USER_ENGAGED: 'user_engaged',
    USER_DISENGAGED: 'user_disengaged',

    // Business Events
    REVENUE_UP: 'revenue_up',
    REVENUE_DOWN: 'revenue_down',
    GROWTH_UP: 'growth_up',
    GROWTH_DOWN: 'growth_down',
    EFFICIENCY_UP: 'efficiency_up',
    EFFICIENCY_DOWN: 'efficiency_down',
  } as const,

  // Performance Analytics Dimensions
  DIMENSIONS: {
    // System Dimensions
    SYSTEM_ID: 'system_id',
    SYSTEM_NAME: 'system_name',
    SYSTEM_TYPE: 'system_type',
    SYSTEM_ENVIRONMENT: 'system_environment',

    // Resource Dimensions
    CPU_USAGE: 'cpu_usage',
    MEMORY_USAGE: 'memory_usage',
    DISK_USAGE: 'disk_usage',
    NETWORK_USAGE: 'network_usage',

    // Application Dimensions
    APPLICATION_ID: 'application_id',
    APPLICATION_NAME: 'application_name',
    APPLICATION_VERSION: 'application_version',
    APPLICATION_TYPE: 'application_type',

    // API Dimensions
    API_ID: 'api_id',
    API_NAME: 'api_name',
    API_ENDPOINT: 'api_endpoint',
    API_METHOD: 'api_method',

    // Database Dimensions
    DATABASE_ID: 'database_id',
    DATABASE_NAME: 'database_name',
    DATABASE_TYPE: 'database_type',
    QUERY_TYPE: 'query_type',

    // User Dimensions
    USER_ID: 'user_id',
    USER_TYPE: 'user_type',
    USER_SEGMENT: 'user_segment',

    // Time Dimensions
    TIMESTAMP: 'timestamp',
    DATE: 'date',
    HOUR: 'hour',
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    QUARTER: 'quarter',
    YEAR: 'year',

    // Business Dimensions
    BUSINESS_UNIT: 'business_unit',
    DEPARTMENT: 'department',
    TEAM: 'team',
    PRODUCT: 'product',
  } as const,

  // Performance Analytics Metrics
  METRICS: {
    // System Metrics
    CPU_AVG: 'cpu_avg',
    CPU_MAX: 'cpu_max',
    CPU_MIN: 'cpu_min',
    MEMORY_AVG: 'memory_avg',
    MEMORY_MAX: 'memory_max',
    MEMORY_MIN: 'memory_min',
    DISK_AVG: 'disk_avg',
    DISK_MAX: 'disk_max',
    DISK_MIN: 'disk_min',
    NETWORK_AVG: 'network_avg',
    NETWORK_MAX: 'network_max',
    NETWORK_MIN: 'network_min',

    // Response Metrics
    RESPONSE_TIME_AVG: 'response_time_avg',
    RESPONSE_TIME_MAX: 'response_time_max',
    RESPONSE_TIME_MIN: 'response_time_min',
    RESPONSE_TIME_P95: 'response_time_p95',
    RESPONSE_TIME_P99: 'response_time_p99',

    // Throughput Metrics
    THROUGHPUT_AVG: 'throughput_avg',
    THROUGHPUT_MAX: 'throughput_max',
    THROUGHPUT_MIN: 'throughput_min',
    REQUESTS_PER_SECOND: 'requests_per_second',

    // Latency Metrics
    LATENCY_AVG: 'latency_avg',
    LATENCY_MAX: 'latency_max',
    LATENCY_MIN: 'latency_min',
    LATENCY_P95: 'latency_p95',
    LATENCY_P99: 'latency_p99',

    // Error Metrics
    ERROR_RATE: 'error_rate',
    ERROR_COUNT: 'error_count',
    ERROR_PER_SECOND: 'error_per_second',
    FATAL_ERROR_RATE: 'fatal_error_rate',

    // Database Metrics
    QUERY_TIME_AVG: 'query_time_avg',
    QUERY_TIME_MAX: 'query_time_max',
    QUERY_TIME_MIN: 'query_time_min',
    QUERY_COUNT: 'query_count',
    CACHE_HIT_RATE: 'cache_hit_rate',
    CACHE_MISS_RATE: 'cache_miss_rate',

    // API Metrics
    API_RESPONSE_AVG: 'api_response_avg',
    API_RESPONSE_MAX: 'api_response_max',
    API_RESPONSE_MIN: 'api_response_min',
    API_THROUGHPUT: 'api_throughput',
    API_ERROR_RATE: 'api_error_rate',

    // Frontend Metrics
    PAGE_LOAD_AVG: 'page_load_avg',
    PAGE_LOAD_MAX: 'page_load_max',
    PAGE_LOAD_MIN: 'page_load_min',
    RENDER_TIME_AVG: 'render_time_avg',
    RENDER_TIME_MAX: 'render_time_max',
    RENDER_TIME_MIN: 'render_time_min',
    INTERACTIVE_TIME_AVG: 'interactive_time_avg',
    INTERACTIVE_TIME_MAX: 'interactive_time_max',
    INTERACTIVE_TIME_MIN: 'interactive_time_min',
    FIRST_CONTENTFUL_PAINT: 'first_contentful_paint',
    TIME_TO_INTERACTIVE: 'time_to_interactive',

    // User Experience Metrics
    USER_SATISFACTION_SCORE: 'user_satisfaction_score',
    USER_ENGAGEMENT_SCORE: 'user_engagement_score',
    USER_RETENTION_SCORE: 'user_retention_score',

    // Business Metrics
    REVENUE_PER_DAY: 'revenue_per_day',
    REVENUE_PER_WEEK: 'revenue_per_week',
    REVENUE_PER_MONTH: 'revenue_per_month',
    GROWTH_RATE: 'growth_rate',
    EFFICIENCY_SCORE: 'efficiency_score',

    // Comparison Metrics
    YEAR_OVER_YEAR: 'year_over_year',
    QUARTER_OVER_QUARTER: 'quarter_over_quarter',
    MONTH_OVER_MONTH: 'month_over_month',
    WEEK_OVER_WEEK: 'week_over_week',
  } as const,

  // Performance Analytics Segments
  SEGMENTS: {
    // System Segments
    PRODUCTION: 'production',
    STAGING: 'staging',
    DEVELOPMENT: 'development',
    TESTING: 'testing',

    // Performance Segments
    HIGH_PERFORMANCE: 'high_performance',
    MEDIUM_PERFORMANCE: 'medium_performance',
    LOW_PERFORMANCE: 'low_performance',
    OPTIMIZED: 'optimized',

    // User Segments
    SATISFIED: 'satisfied',
    UNSATISFIED: 'unsatisfied',
    ENGAGED: 'engaged',
    DISENGAGED: 'disengaged',

    // Business Segments
    HIGH_VALUE: 'high_value',
    MEDIUM_VALUE: 'medium_value',
    LOW_VALUE: 'low_value',
    GROWING: 'growing',
    DECLINING: 'declining',
  } as const,

  // Performance Analytics Cohorts
  COHORTS: {
    SYSTEM_TYPE: 'system_type',
    APPLICATION_VERSION: 'application_version',
    API_VERSION: 'api_version',
    USER_SEGMENT: 'user_segment',
    BUSINESS_UNIT: 'business_unit',
    TIME_PERIOD: 'time_period',
  } as const,

  // Performance Analytics Granularity
  GRANULARITY: {
    SECOND: 'second',
    MINUTE: 'minute',
    HOUR: 'hour',
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    QUARTER: 'quarter',
    YEAR: 'year',
  } as const,

  // Performance Thresholds
  THRESHOLDS: {
    // CPU Thresholds
    CPU_CRITICAL: 90,
    CPU_WARNING: 70,
    CPU_OK: 50,

    // Memory Thresholds
    MEMORY_CRITICAL: 90,
    MEMORY_WARNING: 70,
    MEMORY_OK: 50,

    // Disk Thresholds
    DISK_CRITICAL: 90,
    DISK_WARNING: 70,
    DISK_OK: 50,

    // Network Thresholds
    NETWORK_CRITICAL: 90,
    NETWORK_WARNING: 70,
    NETWORK_OK: 50,

    // Response Time Thresholds (ms)
    RESPONSE_CRITICAL: 5000,
    RESPONSE_WARNING: 2000,
    RESPONSE_OK: 1000,

    // Latency Thresholds (ms)
    LATENCY_CRITICAL: 1000,
    LATENCY_WARNING: 500,
    LATENCY_OK: 200,

    // Error Rate Thresholds (%)
    ERROR_CRITICAL: 10,
    ERROR_WARNING: 5,
    ERROR_OK: 1,

    // Throughput Thresholds (req/s)
    THROUGHPUT_CRITICAL: 100,
    THROUGHPUT_WARNING: 200,
    THROUGHPUT_OK: 300,
  } as const,
} as const;

// Performance Analytics Types
export type PerformanceAnalyticsType =
  (typeof PERFORMANCE_ANALYTICS.TYPES)[keyof typeof PERFORMANCE_ANALYTICS.TYPES];

// Performance Analytics Status
export type PerformanceAnalyticsStatus =
  (typeof PERFORMANCE_ANALYTICS.STATUS)[keyof typeof PERFORMANCE_ANALYTICS.STATUS];

// Performance Analytics Scopes
export type PerformanceAnalyticsScope =
  (typeof PERFORMANCE_ANALYTICS.SCOPES)[keyof typeof PERFORMANCE_ANALYTICS.SCOPES];

// Performance Analytics Events
export type PerformanceAnalyticsEvent =
  (typeof PERFORMANCE_ANALYTICS.EVENTS)[keyof typeof PERFORMANCE_ANALYTICS.EVENTS];

// Performance Analytics Dimensions
export type PerformanceAnalyticsDimension =
  (typeof PERFORMANCE_ANALYTICS.DIMENSIONS)[keyof typeof PERFORMANCE_ANALYTICS.DIMENSIONS];

// Performance Analytics Metrics
export type PerformanceAnalyticsMetric =
  (typeof PERFORMANCE_ANALYTICS.METRICS)[keyof typeof PERFORMANCE_ANALYTICS.METRICS];

// Performance Analytics Segments
export type PerformanceAnalyticsSegment =
  (typeof PERFORMANCE_ANALYTICS.SEGMENTS)[keyof typeof PERFORMANCE_ANALYTICS.SEGMENTS];

// Performance Analytics Cohorts
export type PerformanceAnalyticsCohort =
  (typeof PERFORMANCE_ANALYTICS.COHORTS)[keyof typeof PERFORMANCE_ANALYTICS.COHORTS];

// Performance Analytics Granularity
export type PerformanceAnalyticsGranularity =
  (typeof PERFORMANCE_ANALYTICS.GRANULARITY)[keyof typeof PERFORMANCE_ANALYTICS.GRANULARITY];

// Performance Analytics Thresholds
export type PerformanceAnalyticsThreshold =
  (typeof PERFORMANCE_ANALYTICS.THRESHOLDS)[keyof typeof PERFORMANCE_ANALYTICS.THRESHOLDS];

// Performance Analytics Status Labels
export function getPerformanceAnalyticsStatusLabel(status: PerformanceAnalyticsStatus): string {
  const labels: Record<PerformanceAnalyticsStatus, string> = {
    [PERFORMANCE_ANALYTICS.STATUS.MONITORING]: 'Monitoring',
    [PERFORMANCE_ANALYTICS.STATUS.COLLECTING]: 'Collecting',
    [PERFORMANCE_ANALYTICS.STATUS.PROCESSING]: 'Processing',
    [PERFORMANCE_ANALYTICS.STATUS.ANALYZING]: 'Analyzing',
    [PERFORMANCE_ANALYTICS.STATUS.COMPLETED]: 'Completed',
    [PERFORMANCE_ANALYTICS.STATUS.FAILED]: 'Failed',
    [PERFORMANCE_ANALYTICS.STATUS.PAUSED]: 'Paused',
    [PERFORMANCE_ANALYTICS.STATUS.STOPPED]: 'Stopped',
  };
  return labels[status] || 'Unknown';
}

// Performance Analytics Event Labels
export function getPerformanceAnalyticsEventLabel(event: PerformanceAnalyticsEvent): string {
  const labels: Record<PerformanceAnalyticsEvent, string> = {
    [PERFORMANCE_ANALYTICS.EVENTS.SYSTEM_START]: 'System Start',
    [PERFORMANCE_ANALYTICS.EVENTS.SYSTEM_STOP]: 'System Stop',
    [PERFORMANCE_ANALYTICS.EVENTS.SYSTEM_RESTART]: 'System Restart',
    [PERFORMANCE_ANALYTICS.EVENTS.SYSTEM_ERROR]: 'System Error',
    [PERFORMANCE_ANALYTICS.EVENTS.SYSTEM_WARNING]: 'System Warning',
    [PERFORMANCE_ANALYTICS.EVENTS.CPU_HIGH]: 'CPU High',
    [PERFORMANCE_ANALYTICS.EVENTS.CPU_LOW]: 'CPU Low',
    [PERFORMANCE_ANALYTICS.EVENTS.MEMORY_HIGH]: 'Memory High',
    [PERFORMANCE_ANALYTICS.EVENTS.MEMORY_LOW]: 'Memory Low',
    [PERFORMANCE_ANALYTICS.EVENTS.DISK_FULL]: 'Disk Full',
    [PERFORMANCE_ANALYTICS.EVENTS.DISK_AVAILABLE]: 'Disk Available',
    [PERFORMANCE_ANALYTICS.EVENTS.NETWORK_SLOW]: 'Network Slow',
    [PERFORMANCE_ANALYTICS.EVENTS.NETWORK_FAST]: 'Network Fast',
    [PERFORMANCE_ANALYTICS.EVENTS.APP_START]: 'App Start',
    [PERFORMANCE_ANALYTICS.EVENTS.APP_STOP]: 'App Stop',
    [PERFORMANCE_ANALYTICS.EVENTS.APP_ERROR]: 'App Error',
    [PERFORMANCE_ANALYTICS.EVENTS.APP_WARNING]: 'App Warning',
    [PERFORMANCE_ANALYTICS.EVENTS.APP_CRASH]: 'App Crash',
    [PERFORMANCE_ANALYTICS.EVENTS.RESPONSE_SLOW]: 'Response Slow',
    [PERFORMANCE_ANALYTICS.EVENTS.RESPONSE_FAST]: 'Response Fast',
    [PERFORMANCE_ANALYTICS.EVENTS.LATENCY_HIGH]: 'Latency High',
    [PERFORMANCE_ANALYTICS.EVENTS.LATENCY_LOW]: 'Latency Low',
    [PERFORMANCE_ANALYTICS.EVENTS.THROUGHPUT_HIGH]: 'Throughput High',
    [PERFORMANCE_ANALYTICS.EVENTS.THROUGHPUT_LOW]: 'Throughput Low',
    [PERFORMANCE_ANALYTICS.EVENTS.ERROR_SPIKE]: 'Error Spike',
    [PERFORMANCE_ANALYTICS.EVENTS.ERROR_DROP]: 'Error Drop',
    [PERFORMANCE_ANALYTICS.EVENTS.QUERY_SLOW]: 'Query Slow',
    [PERFORMANCE_ANALYTICS.EVENTS.QUERY_FAST]: 'Query Fast',
    [PERFORMANCE_ANALYTICS.EVENTS.CONNECTION_POOL]: 'Connection Pool',
    [PERFORMANCE_ANALYTICS.EVENTS.CACHE_HIT]: 'Cache Hit',
    [PERFORMANCE_ANALYTICS.EVENTS.CACHE_MISS]: 'Cache Miss',
    [PERFORMANCE_ANALYTICS.EVENTS.API_SLOW]: 'API Slow',
    [PERFORMANCE_ANALYTICS.EVENTS.API_FAST]: 'API Fast',
    [PERFORMANCE_ANALYTICS.EVENTS.RATE_LIMIT_HIT]: 'Rate Limit Hit',
    [PERFORMANCE_ANALYTICS.EVENTS.RATE_LIMIT_EXCEEDED]: 'Rate Limit Exceeded',
    [PERFORMANCE_ANALYTICS.EVENTS.ENDPOINT_ERROR]: 'Endpoint Error',
    [PERFORMANCE_ANALYTICS.EVENTS.PAGE_LOAD_SLOW]: 'Page Load Slow',
    [PERFORMANCE_ANALYTICS.EVENTS.PAGE_LOAD_FAST]: 'Page Load Fast',
    [PERFORMANCE_ANALYTICS.EVENTS.RENDER_SLOW]: 'Render Slow',
    [PERFORMANCE_ANALYTICS.EVENTS.RENDER_FAST]: 'Render Fast',
    [PERFORMANCE_ANALYTICS.EVENTS.INTERACTIVE_SLOW]: 'Interactive Slow',
    [PERFORMANCE_ANALYTICS.EVENTS.INTERACTIVE_FAST]: 'Interactive Fast',
    [PERFORMANCE_ANALYTICS.EVENTS.USER_SATISFIED]: 'User Satisfied',
    [PERFORMANCE_ANALYTICS.EVENTS.USER_UNSATISFIED]: 'User Unsatisfied',
    [PERFORMANCE_ANALYTICS.EVENTS.USER_ENGAGED]: 'User Engaged',
    [PERFORMANCE_ANALYTICS.EVENTS.USER_DISENGAGED]: 'User Disengaged',
    [PERFORMANCE_ANALYTICS.EVENTS.REVENUE_UP]: 'Revenue Up',
    [PERFORMANCE_ANALYTICS.EVENTS.REVENUE_DOWN]: 'Revenue Down',
    [PERFORMANCE_ANALYTICS.EVENTS.GROWTH_UP]: 'Growth Up',
    [PERFORMANCE_ANALYTICS.EVENTS.GROWTH_DOWN]: 'Growth Down',
    [PERFORMANCE_ANALYTICS.EVENTS.EFFICIENCY_UP]: 'Efficiency Up',
    [PERFORMANCE_ANALYTICS.EVENTS.EFFICIENCY_DOWN]: 'Efficiency Down',
  };
  return labels[event] || 'Unknown';
}

// Performance Analytics Dimension Labels
export function getPerformanceAnalyticsDimensionLabel(
  dimension: PerformanceAnalyticsDimension
): string {
  const labels: Record<PerformanceAnalyticsDimension, string> = {
    [PERFORMANCE_ANALYTICS.DIMENSIONS.SYSTEM_ID]: 'System ID',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.SYSTEM_NAME]: 'System Name',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.SYSTEM_TYPE]: 'System Type',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.SYSTEM_ENVIRONMENT]: 'System Environment',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.CPU_USAGE]: 'CPU Usage',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.MEMORY_USAGE]: 'Memory Usage',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.DISK_USAGE]: 'Disk Usage',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.NETWORK_USAGE]: 'Network Usage',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.APPLICATION_ID]: 'Application ID',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.APPLICATION_NAME]: 'Application Name',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.APPLICATION_VERSION]: 'Application Version',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.APPLICATION_TYPE]: 'Application Type',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.API_ID]: 'API ID',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.API_NAME]: 'API Name',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.API_ENDPOINT]: 'API Endpoint',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.API_METHOD]: 'API Method',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.DATABASE_ID]: 'Database ID',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.DATABASE_NAME]: 'Database Name',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.DATABASE_TYPE]: 'Database Type',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.QUERY_TYPE]: 'Query Type',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.USER_ID]: 'User ID',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.USER_TYPE]: 'User Type',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.USER_SEGMENT]: 'User Segment',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.TIMESTAMP]: 'Timestamp',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.DATE]: 'Date',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.HOUR]: 'Hour',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.DAY]: 'Day',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.WEEK]: 'Week',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.MONTH]: 'Month',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.QUARTER]: 'Quarter',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.YEAR]: 'Year',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.BUSINESS_UNIT]: 'Business Unit',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.DEPARTMENT]: 'Department',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.TEAM]: 'Team',
    [PERFORMANCE_ANALYTICS.DIMENSIONS.PRODUCT]: 'Product',
  };
  return labels[dimension] || 'Unknown';
}

// Performance Analytics Segment Labels
export function getPerformanceAnalyticsSegmentLabel(segment: PerformanceAnalyticsSegment): string {
  const labels: Record<PerformanceAnalyticsSegment, string> = {
    [PERFORMANCE_ANALYTICS.SEGMENTS.PRODUCTION]: 'Production',
    [PERFORMANCE_ANALYTICS.SEGMENTS.STAGING]: 'Staging',
    [PERFORMANCE_ANALYTICS.SEGMENTS.DEVELOPMENT]: 'Development',
    [PERFORMANCE_ANALYTICS.SEGMENTS.TESTING]: 'Testing',
    [PERFORMANCE_ANALYTICS.SEGMENTS.HIGH_PERFORMANCE]: 'High Performance',
    [PERFORMANCE_ANALYTICS.SEGMENTS.MEDIUM_PERFORMANCE]: 'Medium Performance',
    [PERFORMANCE_ANALYTICS.SEGMENTS.LOW_PERFORMANCE]: 'Low Performance',
    [PERFORMANCE_ANALYTICS.SEGMENTS.OPTIMIZED]: 'Optimized',
    [PERFORMANCE_ANALYTICS.SEGMENTS.SATISFIED]: 'Satisfied',
    [PERFORMANCE_ANALYTICS.SEGMENTS.UNSATISFIED]: 'Unsatisfied',
    [PERFORMANCE_ANALYTICS.SEGMENTS.ENGAGED]: 'Engaged',
    [PERFORMANCE_ANALYTICS.SEGMENTS.DISENGAGED]: 'Disengaged',
    [PERFORMANCE_ANALYTICS.SEGMENTS.HIGH_VALUE]: 'High Value',
    [PERFORMANCE_ANALYTICS.SEGMENTS.MEDIUM_VALUE]: 'Medium Value',
    [PERFORMANCE_ANALYTICS.SEGMENTS.LOW_VALUE]: 'Low Value',
    [PERFORMANCE_ANALYTICS.SEGMENTS.GROWING]: 'Growing',
    [PERFORMANCE_ANALYTICS.SEGMENTS.DECLINING]: 'Declining',
  };
  return labels[segment] || 'Unknown';
}

// Performance Analytics Cohort Labels
export function getPerformanceAnalyticsCohortLabel(cohort: PerformanceAnalyticsCohort): string {
  const labels: Record<PerformanceAnalyticsCohort, string> = {
    [PERFORMANCE_ANALYTICS.COHORTS.SYSTEM_TYPE]: 'System Type',
    [PERFORMANCE_ANALYTICS.COHORTS.APPLICATION_VERSION]: 'Application Version',
    [PERFORMANCE_ANALYTICS.COHORTS.API_VERSION]: 'API Version',
    [PERFORMANCE_ANALYTICS.COHORTS.USER_SEGMENT]: 'User Segment',
    [PERFORMANCE_ANALYTICS.COHORTS.BUSINESS_UNIT]: 'Business Unit',
    [PERFORMANCE_ANALYTICS.COHORTS.TIME_PERIOD]: 'Time Period',
  };
  return labels[cohort] || 'Unknown';
}

// Performance Analytics Granularity Labels
export function getPerformanceAnalyticsGranularityLabel(
  granularity: PerformanceAnalyticsGranularity
): string {
  const labels: Record<PerformanceAnalyticsGranularity, string> = {
    [PERFORMANCE_ANALYTICS.GRANULARITY.SECOND]: 'Second',
    [PERFORMANCE_ANALYTICS.GRANULARITY.MINUTE]: 'Minute',
    [PERFORMANCE_ANALYTICS.GRANULARITY.HOUR]: 'Hour',
    [PERFORMANCE_ANALYTICS.GRANULARITY.DAY]: 'Day',
    [PERFORMANCE_ANALYTICS.GRANULARITY.WEEK]: 'Week',
    [PERFORMANCE_ANALYTICS.GRANULARITY.MONTH]: 'Month',
    [PERFORMANCE_ANALYTICS.GRANULARITY.QUARTER]: 'Quarter',
    [PERFORMANCE_ANALYTICS.GRANULARITY.YEAR]: 'Year',
  };
  return labels[granularity] || 'Unknown';
}

// Check if performance analytics is active
export function isPerformanceAnalyticsActive(status: PerformanceAnalyticsStatus): boolean {
  const activeStatuses: PerformanceAnalyticsStatus[] = [
    PERFORMANCE_ANALYTICS.STATUS.MONITORING,
    PERFORMANCE_ANALYTICS.STATUS.COLLECTING,
    PERFORMANCE_ANALYTICS.STATUS.PROCESSING,
    PERFORMANCE_ANALYTICS.STATUS.ANALYZING,
  ];
  return activeStatuses.includes(status);
}

// Check if performance analytics is completed
export function isPerformanceAnalyticsCompleted(status: PerformanceAnalyticsStatus): boolean {
  return status === PERFORMANCE_ANALYTICS.STATUS.COMPLETED;
}

// Check if performance analytics has failed
export function isPerformanceAnalyticsFailed(status: PerformanceAnalyticsStatus): boolean {
  return status === PERFORMANCE_ANALYTICS.STATUS.FAILED;
}

// Check if event is system event
export function isPerformanceAnalyticsSystemEvent(event: PerformanceAnalyticsEvent): boolean {
  const systemEvents: PerformanceAnalyticsEvent[] = [
    PERFORMANCE_ANALYTICS.EVENTS.SYSTEM_START,
    PERFORMANCE_ANALYTICS.EVENTS.SYSTEM_STOP,
    PERFORMANCE_ANALYTICS.EVENTS.SYSTEM_RESTART,
    PERFORMANCE_ANALYTICS.EVENTS.SYSTEM_ERROR,
    PERFORMANCE_ANALYTICS.EVENTS.SYSTEM_WARNING,
  ];
  return systemEvents.includes(event);
}

// Check if event is resource event
export function isPerformanceAnalyticsResourceEvent(event: PerformanceAnalyticsEvent): boolean {
  const resourceEvents: PerformanceAnalyticsEvent[] = [
    PERFORMANCE_ANALYTICS.EVENTS.CPU_HIGH,
    PERFORMANCE_ANALYTICS.EVENTS.CPU_LOW,
    PERFORMANCE_ANALYTICS.EVENTS.MEMORY_HIGH,
    PERFORMANCE_ANALYTICS.EVENTS.MEMORY_LOW,
    PERFORMANCE_ANALYTICS.EVENTS.DISK_FULL,
    PERFORMANCE_ANALYTICS.EVENTS.DISK_AVAILABLE,
    PERFORMANCE_ANALYTICS.EVENTS.NETWORK_SLOW,
    PERFORMANCE_ANALYTICS.EVENTS.NETWORK_FAST,
  ];
  return resourceEvents.includes(event);
}

// Check if event is application event
export function isPerformanceAnalyticsApplicationEvent(event: PerformanceAnalyticsEvent): boolean {
  const applicationEvents: PerformanceAnalyticsEvent[] = [
    PERFORMANCE_ANALYTICS.EVENTS.APP_START,
    PERFORMANCE_ANALYTICS.EVENTS.APP_STOP,
    PERFORMANCE_ANALYTICS.EVENTS.APP_ERROR,
    PERFORMANCE_ANALYTICS.EVENTS.APP_WARNING,
    PERFORMANCE_ANALYTICS.EVENTS.APP_CRASH,
  ];
  return applicationEvents.includes(event);
}

// Check if event is performance event
export function isPerformanceAnalyticsPerformanceEvent(event: PerformanceAnalyticsEvent): boolean {
  const performanceEvents: PerformanceAnalyticsEvent[] = [
    PERFORMANCE_ANALYTICS.EVENTS.RESPONSE_SLOW,
    PERFORMANCE_ANALYTICS.EVENTS.RESPONSE_FAST,
    PERFORMANCE_ANALYTICS.EVENTS.LATENCY_HIGH,
    PERFORMANCE_ANALYTICS.EVENTS.LATENCY_LOW,
    PERFORMANCE_ANALYTICS.EVENTS.THROUGHPUT_HIGH,
    PERFORMANCE_ANALYTICS.EVENTS.THROUGHPUT_LOW,
    PERFORMANCE_ANALYTICS.EVENTS.ERROR_SPIKE,
    PERFORMANCE_ANALYTICS.EVENTS.ERROR_DROP,
  ];
  return performanceEvents.includes(event);
}

// Get threshold status
export function getPerformanceAnalyticsThresholdStatus(
  value: number,
  critical: number,
  warning: number
): string {
  if (value >= critical) return 'critical';
  if (value >= warning) return 'warning';
  return 'ok';
}

// Get response time threshold
export function getPerformanceAnalyticsResponseThreshold(responseTime: number): string {
  const thresholds = PERFORMANCE_ANALYTICS.THRESHOLDS;
  if (responseTime >= thresholds.RESPONSE_CRITICAL) return 'critical';
  if (responseTime >= thresholds.RESPONSE_WARNING) return 'warning';
  return 'ok';
}

// Get latency threshold
export function getPerformanceAnalyticsLatencyThreshold(latency: number): string {
  const thresholds = PERFORMANCE_ANALYTICS.THRESHOLDS;
  if (latency >= thresholds.LATENCY_CRITICAL) return 'critical';
  if (latency >= thresholds.LATENCY_WARNING) return 'warning';
  return 'ok';
}

// Get error rate threshold
export function getPerformanceAnalyticsErrorThreshold(errorRate: number): string {
  const thresholds = PERFORMANCE_ANALYTICS.THRESHOLDS;
  if (errorRate >= thresholds.ERROR_CRITICAL) return 'critical';
  if (errorRate >= thresholds.ERROR_WARNING) return 'warning';
  return 'ok';
}
