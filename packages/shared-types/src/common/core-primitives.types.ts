/**
 * Core Primitives Types
 * Basic types used across all domains
 * Based on shared-constants (HTTP_STATUS, REGEX, CACHE, QUEUE)
 * @module CorePrimitives
 */

import { HTTP_STATUS, REGEX, CACHE, QUEUE } from '@vubon/shared-constants';

/**
 * Base entity interface with common fields
 * All domain entities should extend this
 */
export interface BaseEntity {
  /** Unique identifier (UUID format) */
  id: string;
  /** Creation timestamp */
  createdAt: Date;
  /** Last update timestamp */
  updatedAt: Date;
}

/**
 * Soft delete interface
 * For entities that support soft deletion
 */
export interface SoftDeletable {
  /** Deletion timestamp (null if not deleted) */
  deletedAt: Date | null;
}

/**
 * Timestamp fields for audit purposes
 */
export interface Timestamp {
  /** Creation timestamp */
  createdAt: Date;
  /** Last update timestamp */
  updatedAt: Date;
}

/**
 * Common status types used across the application
 * Based on shared-constants status patterns
 */
export type Status = 'active' | 'inactive' | 'pending' | 'archived' | 'deleted';

/**
 * Priority levels for tasks, tickets, notifications
 */
export type Priority = 'low' | 'medium' | 'high' | 'critical' | 'urgent';

/**
 * Severity levels for errors, incidents, issues
 */
export type Severity = 'info' | 'warning' | 'error' | 'critical' | 'fatal';

/**
 * Level types for logs, activities
 */
export type Level = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

/**
 * Generic metadata type for flexible data storage
 */
export type Metadata = Record<string, unknown>;

/**
 * Options type for configuration objects
 */
export type Options<T = unknown> = Record<string, T>;

/**
 * ID type (UUID or custom ID)
 */
export type ID = string;

/**
 * Slug type for SEO-friendly URLs
 * Uses REGEX.SLUG from shared-constants
 */
export type Slug = string;

/**
 * Email type with validation
 * Uses REGEX.EMAIL from shared-constants
 */
export type Email = string;

/**
 * Phone number type (Bangladesh format)
 * Uses REGEX.PHONE from shared-constants
 * Format: +880XXXXXXXXXX or 01XXXXXXXXX
 */
export type PhoneNumber = string;

/**
 * URL type
 * Uses REGEX.URL from shared-constants
 */
export type URL = string;

/**
 * Currency type (ISO 4217)
 * BDT - Bangladeshi Taka
 */
export type Currency = 'BDT' | 'USD' | 'EUR' | 'GBP';

/**
 * Language type (ISO 639-1)
 */
export type Language = 'bn' | 'en';

/**
 * Timezone type
 * Asia/Dhaka for Bangladesh
 */
export type Timezone = 'Asia/Dhaka' | 'UTC';

/**
 * Nullable wrapper for optional fields
 */
export type Nullable<T> = T | null;

/**
 * Optional wrapper for fields that may be undefined
 */
export type Optional<T> = T | undefined;

/**
 * Deep partial utility for nested objects
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Deep readonly utility for nested objects
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * Non-empty array type
 */
export type NonEmptyArray<T> = [T, ...T[]];

/**
 * Pagination parameters
 */
export interface PaginationParams {
  /** Page number (starting from 1) */
  page: number;
  /** Items per page */
  limit: number;
  /** Sort field */
  sortBy?: string;
  /** Sort order */
  sortOrder?: SortOrder;
}

/**
 * Sort order
 */
export type SortOrder = 'asc' | 'desc';

/**
 * Sort direction type alias
 */
export type SortDirection = SortOrder;

/**
 * Range type for numeric ranges
 */
export interface Range<T = number> {
  min: T;
  max: T;
}

/**
 * Date range type
 */
export interface DateRange {
  startDate: Date;
  endDate: Date;
}

/**
 * ID reference for relationships
 */
export interface Reference {
  id: ID;
  type: string;
}

/**
 * Name with optional additional info
 */
export interface Name {
  firstName: string;
  lastName: string;
  middleName?: string;
}

/**
 * Full name type
 */
export type FullName = string;

/**
 * Address interface (Bangladesh format)
 */
export interface Address {
  street: string;
  area: string;
  city: string;
  state?: string;
  district: string;
  division: string;
  postCode: string;
  country: string;
}

/**
 * Coordinates for location
 */
export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Geo location interface
 */
export interface GeoLocation extends Coordinates {
  address: Address;
}

/**
 * Key-value pair type
 */
export type KeyValue<T = unknown> = {
  key: string;
  value: T;
};

/**
 * Sort field configuration
 */
export interface SortField {
  field: string;
  order: SortOrder;
}

/**
 * Filter condition
 */
export interface FilterCondition {
  field: string;
  operator: FilterOperator;
  value: unknown;
}

/**
 * Filter operators
 */
export type FilterOperator =
  | 'eq'
  | 'ne'
  | 'gt'
  | 'gte'
  | 'lt'
  | 'lte'
  | 'in'
  | 'nin'
  | 'contains'
  | 'startsWith'
  | 'endsWith'
  | 'between'
  | 'regex';

/**
 * Logical operators for combining filters
 */
export type LogicalOperator = 'and' | 'or';

/**
 * Base filter group
 */
export interface FilterGroup {
  operator: LogicalOperator;
  conditions: FilterCondition[];
}

/**
 * Paged response wrapper
 */
export interface PagedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Response metadata
 */
export interface ResponseMetadata {
  timestamp: Date;
  requestId: string;
  duration?: number;
  version?: string;
}

/**
 * Audit log interface
 */
export interface AuditLog {
  id: ID;
  userId: ID;
  action: string;
  resource: string;
  resourceId?: ID;
  changes?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}

/**
 * Session interface
 */
export interface Session {
  id: ID;
  userId: ID;
  token: string;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: DeviceInfo;
}

/**
 * Device information
 */
export interface DeviceInfo {
  type: DeviceType;
  name?: string;
  model?: string;
  os?: string;
  browser?: string;
  version?: string;
}

/**
 * Device type
 */
export type DeviceType = 'desktop' | 'mobile' | 'tablet' | 'tv' | 'wearable' | 'other';

/**
 * Environment type
 */
export type Environment = 'development' | 'staging' | 'production' | 'test';

/**
 * Feature flag interface
 */
export interface FeatureFlag {
  id: ID;
  name: string;
  enabled: boolean;
  description?: string;
  percentage?: number;
  environments?: Environment[];
  metadata?: Metadata;
}

/**
 * Rate limit configuration
 * Uses CACHE and QUEUE from shared-constants
 */
export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  message?: string;
  statusCode?: number;
  /** Cache strategy from shared-constants */
  cacheStrategy?: (typeof CACHE)[keyof typeof CACHE];
  /** Queue strategy from shared-constants */
  queueStrategy?: (typeof QUEUE)[keyof typeof QUEUE];
}

/**
 * HTTP Status codes from shared-constants
 * Re-export for convenience
 */
export { HTTP_STATUS };

/**
 * Regular expressions from shared-constants
 * Re-export for convenience
 */
export { REGEX };

/**
 * Cache strategies from shared-constants
 * Re-export for convenience
 */
export { CACHE };

/**
 * Queue strategies from shared-constants
 * Re-export for convenience
 */
export { QUEUE };
