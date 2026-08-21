/**
 * Authentication Settings Types Module
 * Authentication system settings and configuration types
 * Handles system settings, feature flags, and configuration management
 */

import { authentication } from '@vubon/shared-constants';
import { UserId, Timestamp } from './core-primitives.types';

// Import settings constants from shared-constants
const {
  AUTH_APP_NAME,
  AUTH_DEFAULT_TIMEOUT,
  AUTH_SUPPORTED_LANGUAGES,
  AUTH_DEFAULT_LANGUAGE,
  AUTH_DATE_FORMAT,
  AUTH_TIMEZONE,
} = authentication;

/**
 * Auth Settings
 * Authentication system settings
 */
export interface AuthSettings {
  appName: string;
  defaultTimeout: number;
  supportedLanguages: string[];
  defaultLanguage: string;
  dateFormat: string;
  timezone: string;
  sessionTimeout: number;
  maxLoginAttempts: number;
  lockoutDuration: number;
  requireEmailVerification: boolean;
  requirePhoneVerification: boolean;
  enableMFA: boolean;
  enableSocialLogin: boolean;
  enableOAuth: boolean;
  enableSSO: boolean;
  enableBiometric: boolean;
  enableDeviceTracking: boolean;
  enableAccountLockout: boolean;
  enableRegistration: boolean;
  enablePasswordReset: boolean;
  enableRememberMe: boolean;
  updatedAt: Timestamp;
  updatedBy?: UserId;
  metadata?: Record<string, unknown>;
}

/**
 * Settings Update Request
 * Request to update settings
 */
export interface SettingsUpdateRequest {
  appName?: string;
  defaultTimeout?: number;
  supportedLanguages?: string[];
  defaultLanguage?: string;
  dateFormat?: string;
  timezone?: string;
  sessionTimeout?: number;
  maxLoginAttempts?: number;
  lockoutDuration?: number;
  requireEmailVerification?: boolean;
  requirePhoneVerification?: boolean;
  enableMFA?: boolean;
  enableSocialLogin?: boolean;
  enableOAuth?: boolean;
  enableSSO?: boolean;
  enableBiometric?: boolean;
  enableDeviceTracking?: boolean;
  enableAccountLockout?: boolean;
  enableRegistration?: boolean;
  enablePasswordReset?: boolean;
  enableRememberMe?: boolean;
  updatedBy?: UserId;
  metadata?: Record<string, unknown>;
}

/**
 * Settings Update Response
 * Response after settings update
 */
export interface SettingsUpdateResponse {
  success: boolean;
  data?: {
    settings: AuthSettings;
    updatedFields: string[];
    updatedAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Feature Flag
 * Feature flag configuration
 */
export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  rolloutPercentage: number;
  targetRoles?: string[];
  targetUsers?: UserId[];
  conditions?: Record<string, unknown>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * Feature Flag Check Request
 * Request to check feature flag
 */
export interface FeatureFlagCheckRequest {
  userId: UserId;
  featureName: string;
  context?: Record<string, unknown>;
}

/**
 * Feature Flag Check Response
 * Response after feature flag check
 */
export interface FeatureFlagCheckResponse {
  enabled: boolean;
  reason?: string;
  metadata?: Record<string, unknown>;
  timestamp: Timestamp;
}

/**
 * Feature Flag Update Request
 * Request to update feature flag
 */
export interface FeatureFlagUpdateRequest {
  featureName: string;
  enabled: boolean;
  rolloutPercentage?: number;
  targetRoles?: string[];
  targetUsers?: UserId[];
  conditions?: Record<string, unknown>;
  updatedBy: UserId;
}

/**
 * Feature Flag Update Response
 * Response after feature flag update
 */
export interface FeatureFlagUpdateResponse {
  success: boolean;
  data?: {
    featureName: string;
    enabled: boolean;
    updatedAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Configuration
 * Generic configuration
 */
export interface Configuration {
  id: string;
  key: string;
  value: unknown;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  description?: string;
  isSecret: boolean;
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  updatedBy?: UserId;
  metadata?: Record<string, unknown>;
}

/**
 * Configuration Update Request
 * Request to update configuration
 */
export interface ConfigurationUpdateRequest {
  key: string;
  value: unknown;
  updatedBy: UserId;
  description?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Configuration Update Response
 * Response after configuration update
 */
export interface ConfigurationUpdateResponse {
  success: boolean;
  data?: {
    key: string;
    value: unknown;
    updatedAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Settings Filter
 * Filter criteria for settings queries
 */
export interface SettingsFilter {
  key?: string[];
  isActive?: boolean;
  isSecret?: boolean;
  dateRange?: {
    start: Timestamp;
    end: Timestamp;
  };
}

/**
 * Settings Response Builder
 * Helper for building settings responses
 */
export interface SettingsResponseBuilder {
  updateSuccess(response: SettingsUpdateResponse): SettingsUpdateResponse;
  featureCheckSuccess(response: FeatureFlagCheckResponse): FeatureFlagCheckResponse;
  featureUpdateSuccess(response: FeatureFlagUpdateResponse): FeatureFlagUpdateResponse;
  configSuccess(response: ConfigurationUpdateResponse): ConfigurationUpdateResponse;
  error(code: string, message: string, details?: Record<string, unknown>): SettingsErrorResponse;
}

/**
 * Settings Error Response
 * Error response for settings operations
 */
export interface SettingsErrorResponse {
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
 * Settings Constants
 * Settings-related constants (re-exported from shared-constants)
 */
export const AUTH_SETTINGS = {
  appName: AUTH_APP_NAME,
  defaultTimeout: AUTH_DEFAULT_TIMEOUT,
  supportedLanguages: AUTH_SUPPORTED_LANGUAGES,
  defaultLanguage: AUTH_DEFAULT_LANGUAGE,
  dateFormat: AUTH_DATE_FORMAT,
  timezone: AUTH_TIMEZONE,
} as const;

/**
 * Default Settings Configuration
 */
export const DEFAULT_SETTINGS_CONFIG = {
  sessionTimeout: 3600, // 1 hour
  maxLoginAttempts: 5,
  lockoutDuration: 900, // 15 minutes
  requireEmailVerification: true,
  requirePhoneVerification: false,
  enableMFA: false,
  enableSocialLogin: true,
  enableOAuth: true,
  enableSSO: false,
  enableBiometric: false,
  enableDeviceTracking: true,
  enableAccountLockout: true,
  enableRegistration: true,
  enablePasswordReset: true,
  enableRememberMe: true,
} as const;

/**
 * Settings Audit Log
 * Audit log for settings operations
 */
export interface SettingsAuditLog {
  id: string;
  userId: UserId;
  operation: 'update' | 'create' | 'delete' | 'feature_update' | 'config_update';
  resource: string;
  oldValue?: unknown;
  newValue?: unknown;
  success: boolean;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
  timestamp: Timestamp;
}
