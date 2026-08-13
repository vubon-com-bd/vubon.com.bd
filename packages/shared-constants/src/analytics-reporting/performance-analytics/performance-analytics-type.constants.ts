/**
 * @fileoverview Performance analytics type definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Performance analytics types enum for different performance-related analytics
 */
export enum PerformanceAnalyticsType {
  /** Page load performance analytics */
  PAGE_LOAD_PERFORMANCE = 'PAGE_LOAD_PERFORMANCE',
  /** API performance analytics */
  API_PERFORMANCE = 'API_PERFORMANCE',
  /** Database performance analytics */
  DATABASE_PERFORMANCE = 'DATABASE_PERFORMANCE',
  /** Server performance analytics */
  SERVER_PERFORMANCE = 'SERVER_PERFORMANCE',
  /** Network performance analytics */
  NETWORK_PERFORMANCE = 'NETWORK_PERFORMANCE',
  /** Client performance analytics */
  CLIENT_PERFORMANCE = 'CLIENT_PERFORMANCE',
  /** Cache performance analytics */
  CACHE_PERFORMANCE = 'CACHE_PERFORMANCE',
  /** CDN performance analytics */
  CDN_PERFORMANCE = 'CDN_PERFORMANCE',
  /** DNS performance analytics */
  DNS_PERFORMANCE = 'DNS_PERFORMANCE',
  /** SSL performance analytics */
  SSL_PERFORMANCE = 'SSL_PERFORMANCE',
  /** Auth performance analytics */
  AUTH_PERFORMANCE = 'AUTH_PERFORMANCE',
  /** Session performance analytics */
  SESSION_PERFORMANCE = 'SESSION_PERFORMANCE',
  /** Queue performance analytics */
  QUEUE_PERFORMANCE = 'QUEUE_PERFORMANCE',
  /** Worker performance analytics */
  WORKER_PERFORMANCE = 'WORKER_PERFORMANCE',
  /** Storage performance analytics */
  STORAGE_PERFORMANCE = 'STORAGE_PERFORMANCE',
  /** Backup performance analytics */
  BACKUP_PERFORMANCE = 'BACKUP_PERFORMANCE',
  /** Monitoring performance analytics */
  MONITORING_PERFORMANCE = 'MONITORING_PERFORMANCE',
  /** Logging performance analytics */
  LOGGING_PERFORMANCE = 'LOGGING_PERFORMANCE',
  /** Notification performance analytics */
  NOTIFICATION_PERFORMANCE = 'NOTIFICATION_PERFORMANCE',
  /** Scheduler performance analytics */
  SCHEDULER_PERFORMANCE = 'SCHEDULER_PERFORMANCE',
  /** Memory performance analytics */
  MEMORY_PERFORMANCE = 'MEMORY_PERFORMANCE',
  /** CPU performance analytics */
  CPU_PERFORMANCE = 'CPU_PERFORMANCE',
  /** Disk performance analytics */
  DISK_PERFORMANCE = 'DISK_PERFORMANCE',
  /** Load balancer performance */
  LOAD_BALANCER_PERFORMANCE = 'LOAD_BALANCER_PERFORMANCE',
  /** Gateway performance */
  GATEWAY_PERFORMANCE = 'GATEWAY_PERFORMANCE',
  /** Service mesh performance */
  SERVICE_MESH_PERFORMANCE = 'SERVICE_MESH_PERFORMANCE',
}

/**
 * Performance analytics category for grouping
 */
export enum PerformanceAnalyticsCategory {
  /** Frontend performance */
  FRONTEND = 'FRONTEND',
  /** Backend performance */
  BACKEND = 'BACKEND',
  /** Infrastructure performance */
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  /** Network performance */
  NETWORK = 'NETWORK',
  /** Storage performance */
  STORAGE = 'STORAGE',
  /** System performance */
  SYSTEM = 'SYSTEM',
}

/**
 * Performance analytics category mapping
 */
export const PERFORMANCE_ANALYTICS_TYPE_CATEGORY_MAP: Record<
  PerformanceAnalyticsType,
  PerformanceAnalyticsCategory
> = {
  [PerformanceAnalyticsType.PAGE_LOAD_PERFORMANCE]: PerformanceAnalyticsCategory.FRONTEND,
  [PerformanceAnalyticsType.API_PERFORMANCE]: PerformanceAnalyticsCategory.BACKEND,
  [PerformanceAnalyticsType.DATABASE_PERFORMANCE]: PerformanceAnalyticsCategory.BACKEND,
  [PerformanceAnalyticsType.SERVER_PERFORMANCE]: PerformanceAnalyticsCategory.INFRASTRUCTURE,
  [PerformanceAnalyticsType.NETWORK_PERFORMANCE]: PerformanceAnalyticsCategory.NETWORK,
  [PerformanceAnalyticsType.CLIENT_PERFORMANCE]: PerformanceAnalyticsCategory.FRONTEND,
  [PerformanceAnalyticsType.CACHE_PERFORMANCE]: PerformanceAnalyticsCategory.BACKEND,
  [PerformanceAnalyticsType.CDN_PERFORMANCE]: PerformanceAnalyticsCategory.NETWORK,
  [PerformanceAnalyticsType.DNS_PERFORMANCE]: PerformanceAnalyticsCategory.NETWORK,
  [PerformanceAnalyticsType.SSL_PERFORMANCE]: PerformanceAnalyticsCategory.NETWORK,
  [PerformanceAnalyticsType.AUTH_PERFORMANCE]: PerformanceAnalyticsCategory.BACKEND,
  [PerformanceAnalyticsType.SESSION_PERFORMANCE]: PerformanceAnalyticsCategory.BACKEND,
  [PerformanceAnalyticsType.QUEUE_PERFORMANCE]: PerformanceAnalyticsCategory.BACKEND,
  [PerformanceAnalyticsType.WORKER_PERFORMANCE]: PerformanceAnalyticsCategory.BACKEND,
  [PerformanceAnalyticsType.STORAGE_PERFORMANCE]: PerformanceAnalyticsCategory.STORAGE,
  [PerformanceAnalyticsType.BACKUP_PERFORMANCE]: PerformanceAnalyticsCategory.STORAGE,
  [PerformanceAnalyticsType.MONITORING_PERFORMANCE]: PerformanceAnalyticsCategory.SYSTEM,
  [PerformanceAnalyticsType.LOGGING_PERFORMANCE]: PerformanceAnalyticsCategory.SYSTEM,
  [PerformanceAnalyticsType.NOTIFICATION_PERFORMANCE]: PerformanceAnalyticsCategory.SYSTEM,
  [PerformanceAnalyticsType.SCHEDULER_PERFORMANCE]: PerformanceAnalyticsCategory.SYSTEM,
  [PerformanceAnalyticsType.MEMORY_PERFORMANCE]: PerformanceAnalyticsCategory.INFRASTRUCTURE,
  [PerformanceAnalyticsType.CPU_PERFORMANCE]: PerformanceAnalyticsCategory.INFRASTRUCTURE,
  [PerformanceAnalyticsType.DISK_PERFORMANCE]: PerformanceAnalyticsCategory.INFRASTRUCTURE,
  [PerformanceAnalyticsType.LOAD_BALANCER_PERFORMANCE]: PerformanceAnalyticsCategory.INFRASTRUCTURE,
  [PerformanceAnalyticsType.GATEWAY_PERFORMANCE]: PerformanceAnalyticsCategory.INFRASTRUCTURE,
  [PerformanceAnalyticsType.SERVICE_MESH_PERFORMANCE]: PerformanceAnalyticsCategory.INFRASTRUCTURE,
};

/**
 * Performance analytics type configuration
 */
export interface PerformanceAnalyticsTypeConfig {
  label: string;
  description: string;
  icon?: string;
  color?: string;
  priority: number;
  isRealtime: boolean;
  requiresServiceId: boolean;
}

export const PERFORMANCE_ANALYTICS_TYPE_CONFIG: Record<
  PerformanceAnalyticsType,
  PerformanceAnalyticsTypeConfig
> = {
  [PerformanceAnalyticsType.PAGE_LOAD_PERFORMANCE]: {
    label: 'Page Load Performance',
    description: 'Performance analytics for page loading',
    icon: 'Globe',
    color: '#3B82F6',
    priority: 1,
    isRealtime: true,
    requiresServiceId: false,
  },
  [PerformanceAnalyticsType.API_PERFORMANCE]: {
    label: 'API Performance',
    description: 'Performance analytics for API endpoints',
    icon: 'Code',
    color: '#8B5CF6',
    priority: 1,
    isRealtime: true,
    requiresServiceId: true,
  },
  [PerformanceAnalyticsType.DATABASE_PERFORMANCE]: {
    label: 'Database Performance',
    description: 'Performance analytics for database operations',
    icon: 'Database',
    color: '#10B981',
    priority: 1,
    isRealtime: true,
    requiresServiceId: true,
  },
  [PerformanceAnalyticsType.SERVER_PERFORMANCE]: {
    label: 'Server Performance',
    description: 'Performance analytics for server infrastructure',
    icon: 'Server',
    color: '#6366F1',
    priority: 1,
    isRealtime: true,
    requiresServiceId: true,
  },
  [PerformanceAnalyticsType.NETWORK_PERFORMANCE]: {
    label: 'Network Performance',
    description: 'Performance analytics for network latency and throughput',
    icon: 'Network',
    color: '#F59E0B',
    priority: 2,
    isRealtime: true,
    requiresServiceId: false,
  },
  [PerformanceAnalyticsType.CLIENT_PERFORMANCE]: {
    label: 'Client Performance',
    description: 'Performance analytics for client-side operations',
    icon: 'Smartphone',
    color: '#22C55E',
    priority: 2,
    isRealtime: true,
    requiresServiceId: false,
  },
  [PerformanceAnalyticsType.CACHE_PERFORMANCE]: {
    label: 'Cache Performance',
    description: 'Performance analytics for caching system',
    icon: 'Zap',
    color: '#F59E0B',
    priority: 2,
    isRealtime: true,
    requiresServiceId: true,
  },
  [PerformanceAnalyticsType.CDN_PERFORMANCE]: {
    label: 'CDN Performance',
    description: 'Performance analytics for CDN delivery',
    icon: 'Globe',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: false,
    requiresServiceId: true,
  },
  [PerformanceAnalyticsType.DNS_PERFORMANCE]: {
    label: 'DNS Performance',
    description: 'Performance analytics for DNS resolution',
    icon: 'Globe',
    color: '#6B7280',
    priority: 3,
    isRealtime: false,
    requiresServiceId: false,
  },
  [PerformanceAnalyticsType.SSL_PERFORMANCE]: {
    label: 'SSL Performance',
    description: 'Performance analytics for SSL/TLS operations',
    icon: 'Shield',
    color: '#10B981',
    priority: 3,
    isRealtime: false,
    requiresServiceId: false,
  },
  [PerformanceAnalyticsType.AUTH_PERFORMANCE]: {
    label: 'Auth Performance',
    description: 'Performance analytics for authentication',
    icon: 'Lock',
    color: '#6366F1',
    priority: 2,
    isRealtime: true,
    requiresServiceId: true,
  },
  [PerformanceAnalyticsType.SESSION_PERFORMANCE]: {
    label: 'Session Performance',
    description: 'Performance analytics for session management',
    icon: 'User',
    color: '#F59E0B',
    priority: 2,
    isRealtime: true,
    requiresServiceId: true,
  },
  [PerformanceAnalyticsType.QUEUE_PERFORMANCE]: {
    label: 'Queue Performance',
    description: 'Performance analytics for message queues',
    icon: 'List',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: true,
    requiresServiceId: true,
  },
  [PerformanceAnalyticsType.WORKER_PERFORMANCE]: {
    label: 'Worker Performance',
    description: 'Performance analytics for background workers',
    icon: 'Activity',
    color: '#10B981',
    priority: 2,
    isRealtime: true,
    requiresServiceId: true,
  },
  [PerformanceAnalyticsType.STORAGE_PERFORMANCE]: {
    label: 'Storage Performance',
    description: 'Performance analytics for storage operations',
    icon: 'HardDrive',
    color: '#6B7280',
    priority: 2,
    isRealtime: false,
    requiresServiceId: true,
  },
  [PerformanceAnalyticsType.BACKUP_PERFORMANCE]: {
    label: 'Backup Performance',
    description: 'Performance analytics for backup operations',
    icon: 'Archive',
    color: '#F59E0B',
    priority: 3,
    isRealtime: false,
    requiresServiceId: true,
  },
  [PerformanceAnalyticsType.MONITORING_PERFORMANCE]: {
    label: 'Monitoring Performance',
    description: 'Performance analytics for monitoring system',
    icon: 'Activity',
    color: '#3B82F6',
    priority: 2,
    isRealtime: true,
    requiresServiceId: false,
  },
  [PerformanceAnalyticsType.LOGGING_PERFORMANCE]: {
    label: 'Logging Performance',
    description: 'Performance analytics for logging system',
    icon: 'FileText',
    color: '#6B7280',
    priority: 3,
    isRealtime: false,
    requiresServiceId: false,
  },
  [PerformanceAnalyticsType.NOTIFICATION_PERFORMANCE]: {
    label: 'Notification Performance',
    description: 'Performance analytics for notification system',
    icon: 'Bell',
    color: '#F472B6',
    priority: 3,
    isRealtime: true,
    requiresServiceId: true,
  },
  [PerformanceAnalyticsType.SCHEDULER_PERFORMANCE]: {
    label: 'Scheduler Performance',
    description: 'Performance analytics for task scheduler',
    icon: 'Clock',
    color: '#F59E0B',
    priority: 3,
    isRealtime: false,
    requiresServiceId: true,
  },
  [PerformanceAnalyticsType.MEMORY_PERFORMANCE]: {
    label: 'Memory Performance',
    description: 'Performance analytics for memory usage',
    icon: 'Memory',
    color: '#EF4444',
    priority: 1,
    isRealtime: true,
    requiresServiceId: true,
  },
  [PerformanceAnalyticsType.CPU_PERFORMANCE]: {
    label: 'CPU Performance',
    description: 'Performance analytics for CPU usage',
    icon: 'Cpu',
    color: '#F59E0B',
    priority: 1,
    isRealtime: true,
    requiresServiceId: true,
  },
  [PerformanceAnalyticsType.DISK_PERFORMANCE]: {
    label: 'Disk Performance',
    description: 'Performance analytics for disk I/O',
    icon: 'HardDrive',
    color: '#6B7280',
    priority: 2,
    isRealtime: true,
    requiresServiceId: true,
  },
  [PerformanceAnalyticsType.LOAD_BALANCER_PERFORMANCE]: {
    label: 'Load Balancer Performance',
    description: 'Performance analytics for load balancer',
    icon: 'Layers',
    color: '#3B82F6',
    priority: 2,
    isRealtime: true,
    requiresServiceId: true,
  },
  [PerformanceAnalyticsType.GATEWAY_PERFORMANCE]: {
    label: 'Gateway Performance',
    description: 'Performance analytics for API gateway',
    icon: 'Layout',
    color: '#8B5CF6',
    priority: 2,
    isRealtime: true,
    requiresServiceId: true,
  },
  [PerformanceAnalyticsType.SERVICE_MESH_PERFORMANCE]: {
    label: 'Service Mesh Performance',
    description: 'Performance analytics for service mesh',
    icon: 'Grid',
    color: '#10B981',
    priority: 2,
    isRealtime: true,
    requiresServiceId: true,
  },
};

/**
 * Get performance analytics type label
 */
export function getPerformanceAnalyticsTypeLabel(type: PerformanceAnalyticsType): string {
  return PERFORMANCE_ANALYTICS_TYPE_CONFIG[type]?.label || type;
}

/**
 * Get performance analytics type description
 */
export function getPerformanceAnalyticsTypeDescription(type: PerformanceAnalyticsType): string {
  return PERFORMANCE_ANALYTICS_TYPE_CONFIG[type]?.description || '';
}

/**
 * Get performance analytics type category
 */
export function getPerformanceAnalyticsTypeCategory(
  type: PerformanceAnalyticsType
): PerformanceAnalyticsCategory {
  return PERFORMANCE_ANALYTICS_TYPE_CATEGORY_MAP[type];
}

/**
 * Get performance analytics types by category
 */
export function getPerformanceAnalyticsTypesByCategory(
  category: PerformanceAnalyticsCategory
): PerformanceAnalyticsType[] {
  return Object.entries(PERFORMANCE_ANALYTICS_TYPE_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([type]) => type as PerformanceAnalyticsType);
}

/**
 * Check if performance analytics type requires service ID
 */
export function performanceAnalyticsTypeRequiresServiceId(type: PerformanceAnalyticsType): boolean {
  return PERFORMANCE_ANALYTICS_TYPE_CONFIG[type]?.requiresServiceId || false;
}

/**
 * Check if performance analytics type is real-time
 */
export function isPerformanceAnalyticsTypeRealtime(type: PerformanceAnalyticsType): boolean {
  return PERFORMANCE_ANALYTICS_TYPE_CONFIG[type]?.isRealtime || false;
}

/**
 * Get performance analytics type priority
 */
export function getPerformanceAnalyticsTypePriority(type: PerformanceAnalyticsType): number {
  return PERFORMANCE_ANALYTICS_TYPE_CONFIG[type]?.priority || 3;
}

/**
 * Performance analytics type status
 */
export enum PerformanceAnalyticsTypeStatus {
  /** Active and collecting data */
  ACTIVE = 'ACTIVE',
  /** Inactive and not collecting data */
  INACTIVE = 'INACTIVE',
  /** Paused temporarily */
  PAUSED = 'PAUSED',
  /** Under maintenance */
  MAINTENANCE = 'MAINTENANCE',
  /** Deprecated and will be removed */
  DEPRECATED = 'DEPRECATED',
}

/**
 * Default status for performance analytics types
 */
export const PERFORMANCE_ANALYTICS_TYPE_DEFAULT_STATUS: Record<
  PerformanceAnalyticsType,
  PerformanceAnalyticsTypeStatus
> = {
  [PerformanceAnalyticsType.PAGE_LOAD_PERFORMANCE]: PerformanceAnalyticsTypeStatus.ACTIVE,
  [PerformanceAnalyticsType.API_PERFORMANCE]: PerformanceAnalyticsTypeStatus.ACTIVE,
  [PerformanceAnalyticsType.DATABASE_PERFORMANCE]: PerformanceAnalyticsTypeStatus.ACTIVE,
  [PerformanceAnalyticsType.SERVER_PERFORMANCE]: PerformanceAnalyticsTypeStatus.ACTIVE,
  [PerformanceAnalyticsType.NETWORK_PERFORMANCE]: PerformanceAnalyticsTypeStatus.ACTIVE,
  [PerformanceAnalyticsType.CLIENT_PERFORMANCE]: PerformanceAnalyticsTypeStatus.ACTIVE,
  [PerformanceAnalyticsType.CACHE_PERFORMANCE]: PerformanceAnalyticsTypeStatus.ACTIVE,
  [PerformanceAnalyticsType.CDN_PERFORMANCE]: PerformanceAnalyticsTypeStatus.ACTIVE,
  [PerformanceAnalyticsType.DNS_PERFORMANCE]: PerformanceAnalyticsTypeStatus.ACTIVE,
  [PerformanceAnalyticsType.SSL_PERFORMANCE]: PerformanceAnalyticsTypeStatus.ACTIVE,
  [PerformanceAnalyticsType.AUTH_PERFORMANCE]: PerformanceAnalyticsTypeStatus.ACTIVE,
  [PerformanceAnalyticsType.SESSION_PERFORMANCE]: PerformanceAnalyticsTypeStatus.ACTIVE,
  [PerformanceAnalyticsType.QUEUE_PERFORMANCE]: PerformanceAnalyticsTypeStatus.ACTIVE,
  [PerformanceAnalyticsType.WORKER_PERFORMANCE]: PerformanceAnalyticsTypeStatus.ACTIVE,
  [PerformanceAnalyticsType.STORAGE_PERFORMANCE]: PerformanceAnalyticsTypeStatus.ACTIVE,
  [PerformanceAnalyticsType.BACKUP_PERFORMANCE]: PerformanceAnalyticsTypeStatus.ACTIVE,
  [PerformanceAnalyticsType.MONITORING_PERFORMANCE]: PerformanceAnalyticsTypeStatus.ACTIVE,
  [PerformanceAnalyticsType.LOGGING_PERFORMANCE]: PerformanceAnalyticsTypeStatus.ACTIVE,
  [PerformanceAnalyticsType.NOTIFICATION_PERFORMANCE]: PerformanceAnalyticsTypeStatus.ACTIVE,
  [PerformanceAnalyticsType.SCHEDULER_PERFORMANCE]: PerformanceAnalyticsTypeStatus.ACTIVE,
  [PerformanceAnalyticsType.MEMORY_PERFORMANCE]: PerformanceAnalyticsTypeStatus.ACTIVE,
  [PerformanceAnalyticsType.CPU_PERFORMANCE]: PerformanceAnalyticsTypeStatus.ACTIVE,
  [PerformanceAnalyticsType.DISK_PERFORMANCE]: PerformanceAnalyticsTypeStatus.ACTIVE,
  [PerformanceAnalyticsType.LOAD_BALANCER_PERFORMANCE]: PerformanceAnalyticsTypeStatus.ACTIVE,
  [PerformanceAnalyticsType.GATEWAY_PERFORMANCE]: PerformanceAnalyticsTypeStatus.ACTIVE,
  [PerformanceAnalyticsType.SERVICE_MESH_PERFORMANCE]: PerformanceAnalyticsTypeStatus.ACTIVE,
};

/**
 * Get performance analytics type status
 */
export function getPerformanceAnalyticsTypeStatus(
  type: PerformanceAnalyticsType
): PerformanceAnalyticsTypeStatus {
  return PERFORMANCE_ANALYTICS_TYPE_DEFAULT_STATUS[type] || PerformanceAnalyticsTypeStatus.INACTIVE;
}

/**
 * Set performance analytics type status
 */
export function setPerformanceAnalyticsTypeStatus(
  type: PerformanceAnalyticsType,
  status: PerformanceAnalyticsTypeStatus
): void {
  PERFORMANCE_ANALYTICS_TYPE_DEFAULT_STATUS[type] = status;
}

/**
 * Performance analytics priority levels
 */
export const PERFORMANCE_ANALYTICS_PRIORITY_LEVELS = {
  /** Critical priority - essential analytics */
  CRITICAL: 1,
  /** High priority - important analytics */
  HIGH: 2,
  /** Medium priority - useful analytics */
  MEDIUM: 3,
  /** Low priority - nice to have */
  LOW: 4,
} as const;

/**
 * Get performance analytics types by priority
 */
export function getPerformanceAnalyticsTypesByPriority(
  priority: number
): PerformanceAnalyticsType[] {
  return Object.entries(PERFORMANCE_ANALYTICS_TYPE_CONFIG)
    .filter(([_, config]) => config.priority === priority)
    .map(([type]) => type as PerformanceAnalyticsType);
}

/**
 * Get critical performance analytics types
 */
export function getCriticalPerformanceAnalyticsTypes(): PerformanceAnalyticsType[] {
  return getPerformanceAnalyticsTypesByPriority(PERFORMANCE_ANALYTICS_PRIORITY_LEVELS.CRITICAL);
}

/**
 * Performance analytics sub-categories
 */
export enum PerformanceAnalyticsSubCategory {
  /** Application performance */
  APPLICATION = 'APPLICATION',
  /** Infrastructure performance */
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  /** Network performance */
  NETWORK = 'NETWORK',
  /** Data performance */
  DATA = 'DATA',
  /** System performance */
  SYSTEM = 'SYSTEM',
  /** Service performance */
  SERVICE = 'SERVICE',
}

/**
 * Mapping of performance analytics types to sub-categories
 */
export const PERFORMANCE_ANALYTICS_TYPE_SUB_CATEGORY_MAP: Record<
  PerformanceAnalyticsType,
  PerformanceAnalyticsSubCategory
> = {
  [PerformanceAnalyticsType.PAGE_LOAD_PERFORMANCE]: PerformanceAnalyticsSubCategory.APPLICATION,
  [PerformanceAnalyticsType.API_PERFORMANCE]: PerformanceAnalyticsSubCategory.APPLICATION,
  [PerformanceAnalyticsType.CLIENT_PERFORMANCE]: PerformanceAnalyticsSubCategory.APPLICATION,
  [PerformanceAnalyticsType.CACHE_PERFORMANCE]: PerformanceAnalyticsSubCategory.APPLICATION,
  [PerformanceAnalyticsType.AUTH_PERFORMANCE]: PerformanceAnalyticsSubCategory.APPLICATION,
  [PerformanceAnalyticsType.SESSION_PERFORMANCE]: PerformanceAnalyticsSubCategory.APPLICATION,
  [PerformanceAnalyticsType.SERVER_PERFORMANCE]: PerformanceAnalyticsSubCategory.INFRASTRUCTURE,
  [PerformanceAnalyticsType.MEMORY_PERFORMANCE]: PerformanceAnalyticsSubCategory.INFRASTRUCTURE,
  [PerformanceAnalyticsType.CPU_PERFORMANCE]: PerformanceAnalyticsSubCategory.INFRASTRUCTURE,
  [PerformanceAnalyticsType.DISK_PERFORMANCE]: PerformanceAnalyticsSubCategory.INFRASTRUCTURE,
  [PerformanceAnalyticsType.LOAD_BALANCER_PERFORMANCE]:
    PerformanceAnalyticsSubCategory.INFRASTRUCTURE,
  [PerformanceAnalyticsType.GATEWAY_PERFORMANCE]: PerformanceAnalyticsSubCategory.INFRASTRUCTURE,
  [PerformanceAnalyticsType.SERVICE_MESH_PERFORMANCE]:
    PerformanceAnalyticsSubCategory.INFRASTRUCTURE,
  [PerformanceAnalyticsType.NETWORK_PERFORMANCE]: PerformanceAnalyticsSubCategory.NETWORK,
  [PerformanceAnalyticsType.CDN_PERFORMANCE]: PerformanceAnalyticsSubCategory.NETWORK,
  [PerformanceAnalyticsType.DNS_PERFORMANCE]: PerformanceAnalyticsSubCategory.NETWORK,
  [PerformanceAnalyticsType.SSL_PERFORMANCE]: PerformanceAnalyticsSubCategory.NETWORK,
  [PerformanceAnalyticsType.DATABASE_PERFORMANCE]: PerformanceAnalyticsSubCategory.DATA,
  [PerformanceAnalyticsType.STORAGE_PERFORMANCE]: PerformanceAnalyticsSubCategory.DATA,
  [PerformanceAnalyticsType.BACKUP_PERFORMANCE]: PerformanceAnalyticsSubCategory.DATA,
  [PerformanceAnalyticsType.QUEUE_PERFORMANCE]: PerformanceAnalyticsSubCategory.SYSTEM,
  [PerformanceAnalyticsType.WORKER_PERFORMANCE]: PerformanceAnalyticsSubCategory.SYSTEM,
  [PerformanceAnalyticsType.MONITORING_PERFORMANCE]: PerformanceAnalyticsSubCategory.SYSTEM,
  [PerformanceAnalyticsType.LOGGING_PERFORMANCE]: PerformanceAnalyticsSubCategory.SYSTEM,
  [PerformanceAnalyticsType.NOTIFICATION_PERFORMANCE]: PerformanceAnalyticsSubCategory.SERVICE,
  [PerformanceAnalyticsType.SCHEDULER_PERFORMANCE]: PerformanceAnalyticsSubCategory.SERVICE,
};

/**
 * Get performance analytics type sub-category
 */
export function getPerformanceAnalyticsTypeSubCategory(
  type: PerformanceAnalyticsType
): PerformanceAnalyticsSubCategory {
  return PERFORMANCE_ANALYTICS_TYPE_SUB_CATEGORY_MAP[type];
}

/**
 * Get performance analytics types by sub-category
 */
export function getPerformanceAnalyticsTypesBySubCategory(
  subCategory: PerformanceAnalyticsSubCategory
): PerformanceAnalyticsType[] {
  return Object.entries(PERFORMANCE_ANALYTICS_TYPE_SUB_CATEGORY_MAP)
    .filter(([_, subCat]) => subCat === subCategory)
    .map(([type]) => type as PerformanceAnalyticsType);
}
