/**
 * Authentication Device Types
 * Device management, tracking, and security data types
 */

import type {
  DeviceType,
  DevicePlatform,
  DeviceStatus,
  DeviceTrustLevel,
} from '@vubon/shared-constants';

import type { ID, Timestamp } from '../common/core-primitives.types';
import type { AuthUser } from './auth.types';

/**
 * Device Data
 * Complete device information
 */
export interface DeviceData {
  /** Unique device identifier */
  id: ID;
  /** User ID associated with the device */
  userId: ID;
  /** User data (optional, for populated responses) */
  user?: AuthUser;
  /** Device name (user-defined) */
  deviceName: string;
  /** Device type */
  deviceType: DeviceType;
  /** Device platform */
  platform: DevicePlatform;
  /** Device model (optional) */
  model?: string;
  /** Device operating system version */
  osVersion?: string;
  /** Device browser (optional) */
  browser?: string;
  /** Device status */
  status: DeviceStatus;
  /** Device trust level */
  trustLevel: DeviceTrustLevel;
  /** Device fingerprint (for identification) */
  fingerprint?: string;
  /** Push notification token (if applicable) */
  pushToken?: string;
  /** IP address of last use */
  lastIpAddress?: string;
  /** User agent of last use */
  lastUserAgent?: string;
  /** When device was first registered */
  registeredAt: Timestamp;
  /** When device was last used */
  lastUsedAt: Timestamp;
  /** When device trust expires */
  trustExpiresAt?: Timestamp;
  /** Is device verified */
  isVerified: boolean;
  /** Is device active */
  isActive: boolean;
  /** Is device trusted */
  isTrusted: boolean;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Device Registration Request
 * Request to register a new device
 */
export interface DeviceRegistrationRequest {
  /** User ID */
  userId: ID;
  /** Device name */
  deviceName: string;
  /** Device type */
  deviceType: DeviceType;
  /** Device platform */
  platform: DevicePlatform;
  /** Device model (optional) */
  model?: string;
  /** OS version (optional) */
  osVersion?: string;
  /** Push notification token (optional) */
  pushToken?: string;
  /** Device fingerprint (optional) */
  fingerprint?: string;
}

/**
 * Device Update Request
 * Request to update device information
 */
export interface DeviceUpdateRequest {
  /** Device ID */
  deviceId: ID;
  /** User ID */
  userId: ID;
  /** New device name (optional) */
  deviceName?: string;
  /** New device status (optional) */
  status?: DeviceStatus;
  /** New trust level (optional) */
  trustLevel?: DeviceTrustLevel;
  /** New push token (optional) */
  pushToken?: string;
  /** Additional metadata (optional) */
  metadata?: Record<string, unknown>;
}

/**
 * Device Verification Request
 * Request to verify a device
 */
export interface DeviceVerificationRequest {
  /** Device ID */
  deviceId: ID;
  /** User ID */
  userId: ID;
  /** Verification code */
  code: string;
  /** Trust device after verification */
  trustDevice?: boolean;
}

/**
 * Device Verification Result
 * Result of device verification
 */
export interface DeviceVerificationResult {
  /** Is verification successful */
  success: boolean;
  /** User data (if verification completed) */
  user?: AuthUser;
  /** Device data (if successful) */
  device?: DeviceData;
  /** New trust level */
  trustLevel: DeviceTrustLevel;
  /** Trust expiry timestamp */
  trustExpiresAt?: Timestamp;
  /** Message */
  message: string;
}

/**
 * Device Trust Request
 * Request to trust/untrust a device
 */
export interface DeviceTrustRequest {
  /** Device ID */
  deviceId: ID;
  /** User ID */
  userId: ID;
  /** Trust action */
  action: 'trust' | 'untrust';
  /** Trust duration in days (optional) */
  durationDays?: number;
}

/**
 * Device Trust Result
 * Result of device trust operation
 */
export interface DeviceTrustResult {
  /** Is operation successful */
  success: boolean;
  /** User data (if operation completed) */
  user?: AuthUser;
  /** Device data */
  device?: DeviceData;
  /** New trust level */
  trustLevel: DeviceTrustLevel;
  /** Trust expiry timestamp */
  trustExpiresAt?: Timestamp;
  /** Message */
  message: string;
}

/**
 * Device List Response
 * Response for listing user devices
 */
export interface DeviceListResponse {
  /** List of devices */
  devices: DeviceData[];
  /** Total count */
  total: number;
  /** Active count */
  activeCount: number;
  /** Trusted count */
  trustedCount: number;
  /** Current device ID (if applicable) */
  currentDeviceId?: ID;
  /** User data (if populated) */
  user?: AuthUser;
}

/**
 * Device Filter
 * Filter for querying devices
 */
export interface DeviceFilter {
  /** Filter by user ID */
  userId?: ID;
  /** Filter by device type */
  deviceType?: DeviceType;
  /** Filter by platform */
  platform?: DevicePlatform;
  /** Filter by status */
  status?: DeviceStatus;
  /** Filter by trust level */
  trustLevel?: DeviceTrustLevel;
  /** Filter by active status */
  isActive?: boolean;
  /** Filter by trusted status */
  isTrusted?: boolean;
  /** Filter by search term */
  searchTerm?: string;
}

/**
 * Device Statistics
 * Device usage statistics
 */
export interface DeviceStatistics {
  /** Total devices */
  totalDevices: number;
  /** Active devices */
  activeDevices: number;
  /** Inactive devices */
  inactiveDevices: number;
  /** Blocked devices */
  blockedDevices: number;
  /** Pending devices */
  pendingDevices: number;
  /** Devices by type */
  byType: Record<DeviceType, number>;
  /** Devices by platform */
  byPlatform: Record<DevicePlatform, number>;
  /** Devices by trust level */
  byTrustLevel: Record<DeviceTrustLevel, number>;
  /** Average devices per user */
  averagePerUser: number;
  /** Most common device type */
  mostCommonType: DeviceType;
  /** Most common platform */
  mostCommonPlatform: DevicePlatform;
  /** Timestamp of statistics */
  timestamp: Timestamp;
}

/**
 * Device Fingerprint
 * Device fingerprint data for identification
 */
export interface DeviceFingerprint {
  /** Fingerprint hash */
  hash: string;
  /** Components used to generate fingerprint */
  components: {
    userAgent?: string;
    screenResolution?: string;
    colorDepth?: string;
    timezone?: string;
    language?: string;
    platform?: string;
    canvas?: string;
    webgl?: string;
    fonts?: string[];
  };
  /** When fingerprint was generated */
  generatedAt: Timestamp;
  /** Fingerprint confidence score (0-100) */
  confidence: number;
}

/**
 * Device Session
 * Active device session data
 */
export interface DeviceSession {
  /** Session ID */
  id: ID;
  /** Device ID */
  deviceId: ID;
  /** User ID */
  userId: ID;
  /** User data (optional) */
  user?: AuthUser;
  /** Session status */
  status: 'active' | 'expired' | 'terminated';
  /** Session start timestamp */
  startedAt: Timestamp;
  /** Session expiry timestamp */
  expiresAt: Timestamp;
  /** Last activity timestamp */
  lastActivityAt: Timestamp;
  /** IP address */
  ipAddress: string;
  /** User agent */
  userAgent: string;
  /** Is session active */
  isActive: boolean;
}

/**
 * Device Activity
 * Device activity log entry
 */
export interface DeviceActivity {
  /** Activity ID */
  id: ID;
  /** Device ID */
  deviceId: ID;
  /** User ID */
  userId: ID;
  /** User data (optional) */
  user?: AuthUser;
  /** Activity type */
  type: 'login' | 'logout' | 'refresh' | 'action' | 'error';
  /** Activity description */
  description: string;
  /** IP address */
  ipAddress: string;
  /** User agent */
  userAgent: string;
  /** Activity timestamp */
  timestamp: Timestamp;
  /** Additional data */
  data?: Record<string, unknown>;
}

/**
 * Device Configuration Values
 * Device management configuration
 */
export interface DeviceConfigValues {
  maxDevicesPerUser: number;
  maxUntrustedDevices: number;
  trustDurationDays: number;
  sessionDurationDays: number;
  rememberMeDurationDays: number;
  inactiveCleanupDays: number;
  maxVerificationAttempts: number;
  fingerprintTtlDays: number;
  allowNewDevicesWithoutVerification: boolean;
  requireMfaForNewDevices: boolean;
  trustAfterSuccessfulLogins: number;
}
