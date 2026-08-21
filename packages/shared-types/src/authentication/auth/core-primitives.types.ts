/**
 * Core Primitive Types Module
 * Fundamental type definitions used across the authentication system
 * These are the building blocks for all authentication-related types
 */

/**
 * Email Address
 * Validated email string
 */
export type Email = string;

/**
 * Password
 * Validated password string (follows security policies)
 */
export type Password = string;

/**
 * User ID
 * Unique identifier for a user
 */
export type UserId = string;

/**
 * Session ID
 * Unique identifier for a session
 */
export type SessionId = string;

/**
 * Timestamp
 * ISO datetime string or Unix timestamp
 */
export type Timestamp = string | number;

/**
 * Authentication Token
 * JWT or similar authentication token
 */
export type Token = string;

/**
 * Refresh Token
 * Token used to obtain new access tokens
 */
export type RefreshToken = string;

/**
 * User Role
 * User role types for authorization
 */
export type UserRole = 'admin' | 'vendor' | 'customer' | 'guest' | 'manager' | 'support';

/**
 * Authentication Status
 * Current status of authentication
 */
export type AuthStatus = 'active' | 'inactive' | 'suspended' | 'banned' | 'pending_verification';

/**
 * Authentication Provider
 * Supported authentication providers
 */
export type AuthProvider = 'local' | 'google' | 'facebook' | 'github' | 'apple' | 'microsoft';

/**
 * Multi-Factor Authentication Method
 * Supported MFA methods
 */
export type MfaMethod = 'authenticator' | 'sms' | 'email' | 'backup-codes' | 'security-keys';

/**
 * Permission
 * System permission types
 */
export type Permission = string;

/**
 * Base ID
 * Generic identifier type
 */
export type ID = string;

/**
 * UUID
 * Universally unique identifier
 */
export type UUID = string;

/**
 * URL
 * Valid URL string
 */
export type URL = string;

/**
 * Phone Number
 * Validated phone number (E.164 format)
 */
export type PhoneNumber = string;

/**
 * Country Code
 * ISO 3166-1 alpha-2 country code
 */
export type CountryCode = string;

/**
 * Currency Code
 * ISO 4217 currency code
 */
export type CurrencyCode = string;

/**
 * Language Code
 * ISO 639-1 language code
 */
export type LanguageCode = string;

/**
 * Timezone
 * IANA timezone string
 */
export type Timezone = string;

/**
 * JSON Object
 * Generic JSON object type
 */
export type JSONObject = Record<string, unknown>;

/**
 * JSON Array
 * Array of JSON values
 */
export type JSONArray = unknown[];

/**
 * JSON Value
 * Any valid JSON value
 */
export type JSONValue = string | number | boolean | null | JSONObject | JSONArray;

/**
 * Sort Direction
 * Sorting order
 */
export type SortDirection = 'asc' | 'desc';

/**
 * Pagination Parameters
 * Common pagination options
 */
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortDirection?: SortDirection;
}

/**
 * Filter Parameters
 * Generic filtering options
 */
export interface FilterParams {
  search?: string;
  fromDate?: Timestamp;
  toDate?: Timestamp;
  status?: string[];
  [key: string]: unknown;
}

/**
 * API Response Base
 * Base structure for all API responses
 */
export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * API Paginated Response
 * Paginated API response wrapper
 */
export interface APIPaginatedResponse<T = unknown> extends APIResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * Metadata
 * Generic metadata type
 */
export interface Metadata {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy?: UserId;
  updatedBy?: UserId;
  version?: number;
}

/**
 * Soft Delete
 * Soft deletion fields
 */
export interface SoftDelete {
  deletedAt?: Timestamp;
  deletedBy?: UserId;
  isDeleted: boolean;
}

/**
 * Audit Trail
 * Audit logging fields
 */
export interface AuditTrail {
  createdAt: Timestamp;
  createdBy: UserId;
  updatedAt: Timestamp;
  updatedBy: UserId;
  lastAccessedAt?: Timestamp;
  accessedBy?: UserId;
}

/**
 * Status Base
 * Base status tracking
 */
export interface StatusBase {
  status: AuthStatus;
  statusChangedAt?: Timestamp;
  statusChangedBy?: UserId;
  statusReason?: string;
}

/**
 * Name
 * Person or entity name
 */
export interface Name {
  firstName: string;
  lastName: string;
  middleName?: string;
  fullName: string;
}

/**
 * Address
 * Physical address
 */
export interface Address {
  street: string;
  city: string;
  state?: string;
  postalCode: string;
  country: CountryCode;
  isPrimary: boolean;
  addressType: 'billing' | 'shipping' | 'both';
}

/**
 * Contact Information
 * User contact details
 */
export interface ContactInfo {
  email: Email;
  phone?: PhoneNumber;
  alternateEmail?: Email;
  alternatePhone?: PhoneNumber;
}

/**
 * Social Media Links
 * Social media profiles
 */
export interface SocialLinks {
  facebook?: URL;
  twitter?: URL;
  instagram?: URL;
  linkedin?: URL;
  youtube?: URL;
  website?: URL;
}

/**
 * Image
 * Image information
 */
export interface Image {
  id: string;
  url: URL;
  alt: string;
  width: number;
  height: number;
  fileSize: number;
  mimeType: string;
}

/**
 * Money
 * Currency amount
 */
export interface Money {
  amount: number;
  currency: CurrencyCode;
  formatted?: string;
}

/**
 * DateTime Range
 * Date and time range
 */
export interface DateTimeRange {
  start: Timestamp;
  end: Timestamp;
}

/**
 * Geo Location
 * Geographic coordinates
 */
export interface GeoLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number;
}

/**
 * IP Address
 * IP address (v4 or v6)
 */
export type IPAddress = string;

/**
 * User Agent
 * Browser/device user agent string
 */
export type UserAgent = string;

/**
 * Device Info
 * Device identification information
 */
export interface DeviceInfo {
  deviceId: string;
  deviceName: string;
  deviceType: 'desktop' | 'mobile' | 'tablet' | 'tv' | 'other';
  os: string;
  osVersion: string;
  browser: string;
  browserVersion: string;
  isMobile: boolean;
  isDesktop: boolean;
  isTablet: boolean;
  screenSize?: string;
  pixelRatio?: number;
  language: string;
  timezone: Timezone;
}

/**
 * Validation Rule
 * Validation rule definition
 */
export interface ValidationRule {
  field: string;
  type: string;
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
  message?: string;
}
