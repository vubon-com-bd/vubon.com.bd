/**
 * Order History Types
 * Type definitions for order history based on shared-constants
 * @module OrderHistoryTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants checkout
// ============================================================
import {
  // Order Status
  OrderStatusType,
  // Order Type
  OrderTypeType,
  OrderCategory,
  OrderPriority,
} from '@vubon/shared-constants';

// ============================================================
// Order History Extended Types
// ============================================================

/**
 * Order history filter
 */
export interface OrderHistoryFilter {
  orderIds?: ID[];
  userIds?: ID[];
  actions?: (
    'place' | 'process' | 'ship' | 'deliver' | 'cancel' | 'return' | 'refund' | 'update'
  )[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchTerm?: string;
  orderNumber?: string;
}

/**
 * Order history statistics
 */
export interface OrderHistoryStatistics {
  orderId: ID;
  totalEvents: number;
  uniqueActions: number;
  byAction: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageTimeBetweenEvents: number;
  minTimeBetweenEvents: number;
  maxTimeBetweenEvents: number;
  mostFrequentAction: string;
  eventTimeline: {
    action: string;
    timestamp: Date;
    duration?: number;
  }[];
}

/**
 * Order history summary
 */
export interface OrderHistorySummary {
  period: {
    start: Date;
    end: Date;
  };
  totalEvents: number;
  totalOrders: number;
  uniqueUsers: number;
  byAction: Record<string, number>;
  eventTrend: {
    date: Date;
    action: string;
    count: number;
  }[];
  topActions: {
    action: string;
    count: number;
    label: string;
  }[];
  topOrders: {
    orderId: ID;
    orderNumber: string;
    eventCount: number;
  }[];
}

/**
 * Order history configuration
 */
export interface OrderHistoryConfiguration {
  enabled: boolean;
  trackAllActions: boolean;
  trackChanges: boolean;
  retentionDays: number;
  autoArchive: boolean;
  archiveAfterDays: number;
  notificationOnEvent: boolean;
  notificationOnCancellation: boolean;
  notificationOnReturn: boolean;
  alertConfig?: OrderHistoryAlertConfig;
}

/**
 * Order history alert configuration
 */
export interface OrderHistoryAlertConfig {
  enabled: boolean;
  cancellationAlert: boolean;
  returnAlert: boolean;
  suspiciousActivityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Order history event detail
 */
export interface OrderHistoryEvent extends BaseEntity, Timestamp {
  id: ID;
  orderId: ID;
  userId: ID;
  action: string;
  description?: string;
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

/**
 * Order history validation
 */
export interface OrderHistoryValidation {
  isValid: boolean;
  orderId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Order history export
 */
export interface OrderHistoryExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: OrderHistoryFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Order history timeline
 */
export interface OrderHistoryTimeline {
  orderId: ID;
  orderNumber: string;
  userId: ID;
  events: OrderHistoryEvent[];
  duration: {
    total: number;
    byStatus: Record<OrderStatusType, number>;
  };
  milestones: {
    placedAt?: Date;
    processedAt?: Date;
    shippedAt?: Date;
    deliveredAt?: Date;
    cancelledAt?: Date;
    returnedAt?: Date;
  };
}

/**
 * Order history analysis
 */
export interface OrderHistoryAnalysis {
  period: {
    start: Date;
    end: Date;
  };
  totalOrders: number;
  totalEvents: number;
  averageEventsPerOrder: number;
  eventDistribution: {
    action: string;
    count: number;
    percentage: number;
  }[];
  statusTransitionTime: {
    from: OrderStatusType;
    to: OrderStatusType;
    averageTime: number;
    minTime: number;
    maxTime: number;
  }[];
  cancellationAnalysis: {
    totalCancellations: number;
    cancellationRate: number;
    averageCancellationTime: number;
    topReasons: { reason: string; count: number }[];
  };
  returnAnalysis: {
    totalReturns: number;
    returnRate: number;
    averageReturnTime: number;
    topReasons: { reason: string; count: number }[];
  };
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Order Status
  OrderStatusType,
  // Order Type
  OrderTypeType,
  OrderCategory,
  OrderPriority,
};
