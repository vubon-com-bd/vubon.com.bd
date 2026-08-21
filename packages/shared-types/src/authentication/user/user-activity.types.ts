/**
 * User Activity Types Module
 * User activity tracking and logging types for the e-commerce platform
 * Handles user actions, login history, and activity monitoring
 */

import { UserId, Timestamp } from '../auth/core-primitives.types';

/**
 * Activity Type
 * Types of user activities
 */
export type ActivityType =
  | 'login'
  | 'logout'
  | 'registration'
  | 'profile_update'
  | 'password_change'
  | 'email_change'
  | 'phone_change'
  | 'address_add'
  | 'address_update'
  | 'address_delete'
  | 'order_create'
  | 'order_update'
  | 'order_cancel'
  | 'payment'
  | 'product_view'
  | 'product_search'
  | 'cart_add'
  | 'cart_remove'
  | 'cart_update'
  | 'wishlist_add'
  | 'wishlist_remove'
  | 'review_create'
  | 'review_update'
  | 'review_delete'
  | 'rating'
  | 'share'
  | 'download'
  | 'export'
  | 'import'
  | 'api_call'
  | 'admin_action';

/**
 * Activity Status
 * Status of an activity
 */
export type ActivityStatus = 'success' | 'failure' | 'pending' | 'blocked';

/**
 * Activity Severity
 * Severity level of an activity
 */
export type ActivitySeverity = 'info' | 'low' | 'medium' | 'high' | 'critical';

/**
 * User Activity
 * User activity record
 */
export interface UserActivity {
  id: string;
  userId: UserId;
  type: ActivityType;
  status: ActivityStatus;
  severity: ActivitySeverity;
  description: string;
  timestamp: Timestamp;
  ipAddress?: string;
  userAgent?: string;
  deviceId?: string;
  location?: string;
  duration?: number;
  metadata?: Record<string, unknown>;
}

/**
 * Login Activity
 * Login specific activity
 */
export interface LoginActivity {
  id: string;
  userId: UserId;
  timestamp: Timestamp;
  success: boolean;
  ipAddress: string;
  userAgent: string;
  deviceId?: string;
  location?: string;
  failureReason?: string;
  loginMethod: 'password' | 'social' | 'oauth' | 'sso' | 'api';
  metadata?: Record<string, unknown>;
}

/**
 * Activity Create Request
 * Request to create activity
 */
export interface ActivityCreateRequest {
  userId: UserId;
  type: ActivityType;
  status: ActivityStatus;
  severity?: ActivitySeverity;
  description: string;
  ipAddress?: string;
  userAgent?: string;
  deviceId?: string;
  location?: string;
  duration?: number;
  metadata?: Record<string, unknown>;
}

/**
 * Activity Create Response
 * Response after activity creation
 */
export interface ActivityCreateResponse {
  success: boolean;
  data?: {
    activityId: string;
    userId: UserId;
    type: ActivityType;
    status: ActivityStatus;
    timestamp: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Activity List Request
 * Request to list activities
 */
export interface ActivityListRequest {
  userId: UserId;
  type?: ActivityType[];
  status?: ActivityStatus[];
  severity?: ActivitySeverity[];
  startDate?: Timestamp;
  endDate?: Timestamp;
  limit?: number;
  offset?: number;
  sortBy?: 'timestamp' | 'type' | 'severity';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Activity List Response
 * Response after listing activities
 */
export interface ActivityListResponse {
  success: boolean;
  data?: {
    activities: UserActivity[];
    total: number;
    limit: number;
    offset: number;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Activity Filter
 * Filter criteria for activity queries
 */
export interface ActivityFilter {
  userId?: UserId[];
  type?: ActivityType[];
  status?: ActivityStatus[];
  severity?: ActivitySeverity[];
  dateRange?: {
    start: Timestamp;
    end: Timestamp;
  };
  ipAddress?: string[];
  deviceId?: string[];
  search?: string;
}

/**
 * Activity Statistics
 * Statistical data about activities
 */
export interface ActivityStatistics {
  totalActivities: number;
  byType: Record<ActivityType, number>;
  byStatus: Record<ActivityStatus, number>;
  bySeverity: Record<ActivitySeverity, number>;
  successRate: number;
  failureRate: number;
  averageDuration: number;
  peakActivityTime: string;
  peakActivityCount: number;
  uniqueUsers: number;
  timestamp: Timestamp;
}

/**
 * Activity Response Builder
 * Helper for building activity responses
 */
export interface ActivityResponseBuilder {
  createSuccess(response: ActivityCreateResponse): ActivityCreateResponse;
  listSuccess(response: ActivityListResponse): ActivityListResponse;
  error(code: string, message: string, details?: Record<string, unknown>): ActivityErrorResponse;
}

/**
 * Activity Error Response
 * Error response for activity operations
 */
export interface ActivityErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Activity Constants
 * Activity-related constants
 */
export const ACTIVITY_TYPES = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  REGISTRATION: 'registration',
  PROFILE_UPDATE: 'profile_update',
  PASSWORD_CHANGE: 'password_change',
  EMAIL_CHANGE: 'email_change',
  PHONE_CHANGE: 'phone_change',
  ADDRESS_ADD: 'address_add',
  ADDRESS_UPDATE: 'address_update',
  ADDRESS_DELETE: 'address_delete',
  ORDER_CREATE: 'order_create',
  ORDER_UPDATE: 'order_update',
  ORDER_CANCEL: 'order_cancel',
  PAYMENT: 'payment',
  PRODUCT_VIEW: 'product_view',
  PRODUCT_SEARCH: 'product_search',
  CART_ADD: 'cart_add',
  CART_REMOVE: 'cart_remove',
  CART_UPDATE: 'cart_update',
  WISHLIST_ADD: 'wishlist_add',
  WISHLIST_REMOVE: 'wishlist_remove',
  REVIEW_CREATE: 'review_create',
  REVIEW_UPDATE: 'review_update',
  REVIEW_DELETE: 'review_delete',
  RATING: 'rating',
  SHARE: 'share',
  DOWNLOAD: 'download',
  EXPORT: 'export',
  IMPORT: 'import',
  API_CALL: 'api_call',
  ADMIN_ACTION: 'admin_action',
} as const;

export const ACTIVITY_STATUS = {
  SUCCESS: 'success',
  FAILURE: 'failure',
  PENDING: 'pending',
  BLOCKED: 'blocked',
} as const;

export const ACTIVITY_SEVERITY = {
  INFO: 'info',
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

/**
 * Default Activity Configuration
 */
export const DEFAULT_ACTIVITY_CONFIG = {
  retentionDays: 365,
  batchSize: 1000,
  enableAggregation: true,
  enableAnomalyDetection: true,
  anomalyThreshold: 10,
  enableUserTracking: true,
  enableLocationTracking: true,
  enableDeviceTracking: true,
} as const;

/**
 * Activity Audit Log
 * Audit log for activity operations
 */
export interface ActivityAuditLog {
  id: string;
  userId: UserId;
  operation: 'create' | 'list' | 'delete' | 'archive';
  type: ActivityType;
  status: ActivityStatus;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
  timestamp: Timestamp;
}

/**
 * Activity Anomaly
 * Detected activity anomaly
 */
export interface ActivityAnomaly {
  id: string;
  userId: UserId;
  type: ActivityType;
  description: string;
  severity: ActivitySeverity;
  detectedAt: Timestamp;
  data: Record<string, unknown>;
  resolved: boolean;
  resolvedAt?: Timestamp;
  metadata?: Record<string, unknown>;
}
