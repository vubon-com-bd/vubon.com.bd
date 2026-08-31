/**
 * Authentication Biometric Types
 * Types for biometric authentication (fingerprint, face, etc.)
 */

import type { AuthMfaMethod } from '@vubon/shared-constants';
import { AUTH_MFA_METHODS } from '@vubon/shared-constants';
import type { ID, Timestamp } from '../common/core-primitives.types';

// ============================================================
// BIOMETRIC TYPES
// ============================================================

/**
 * Biometric type
 */
export type AuthBiometricType =
  'fingerprint' | 'face' | 'iris' | 'voice' | 'hand_geometry' | 'keystroke' | 'gait' | 'signature';

/**
 * Biometric verification status
 */
export type AuthBiometricStatus = 'enrolled' | 'pending' | 'failed' | 'expired' | 'revoked';

/**
 * Biometric platform
 */
export type AuthBiometricPlatform = 'android' | 'ios' | 'windows' | 'macos' | 'linux' | 'web';

// ============================================================
// BIOMETRIC RECORD
// ============================================================

/**
 * Complete biometric record
 */
export interface AuthBiometricRecord {
  /** Unique identifier */
  id: ID;
  /** User ID */
  userId: ID;
  /** Biometric type */
  type: AuthBiometricType;
  /** Platform used for enrollment */
  platform: AuthBiometricPlatform;
  /** Device ID that enrolled the biometric */
  deviceId: ID;
  /** Biometric status */
  status: AuthBiometricStatus;
  /** Whether this is the primary biometric */
  isPrimary: boolean;
  /** Biometric template (stored securely) */
  templateHash: string;
  /** Biometric metadata */
  metadata?: {
    /** Device model */
    deviceModel?: string;
    /** Operating system version */
    osVersion?: string;
    /** SDK version used */
    sdkVersion?: string;
    /** Additional metadata */
    [key: string]: unknown;
  };
  /** When the biometric was enrolled */
  enrolledAt: Timestamp;
  /** When the biometric was last used */
  lastUsedAt?: Timestamp;
  /** When the biometric expires (if applicable) */
  expiresAt?: Timestamp;
}

// ============================================================
// BIOMETRIC REQUEST
// ============================================================

/**
 * Request to enroll biometric
 */
export interface AuthBiometricEnrollRequest {
  /** Biometric type */
  type: AuthBiometricType;
  /** Platform used for enrollment */
  platform: AuthBiometricPlatform;
  /** Device ID */
  deviceId: ID;
  /** Whether to make this the primary biometric */
  isPrimary?: boolean;
  /** Biometric data (platform-specific) */
  biometricData: unknown;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Request to verify biometric
 */
export interface AuthBiometricVerifyRequest {
  /** Biometric type */
  type: AuthBiometricType;
  /** Biometric data for verification */
  biometricData: unknown;
  /** Device ID */
  deviceId: ID;
  /** Whether to update last used timestamp */
  updateLastUsed?: boolean;
}

// ============================================================
// BIOMETRIC RESPONSE
// ============================================================

/**
 * Response for biometric operations
 */
export interface AuthBiometricResponse {
  /** Whether the operation was successful */
  success: boolean;
  /** Biometric record (for enrollment) */
  record?: AuthBiometricRecord;
  /** Whether verification was successful */
  verified?: boolean;
  /** MFA method associated */
  mfaMethod: AuthMfaMethod;
  /** Error message if failed */
  error?: string;
}

// ============================================================
// BIOMETRIC FILTER
// ============================================================

/**
 * Filter for querying biometric records
 */
export interface AuthBiometricFilter {
  /** Filter by user ID */
  userId?: ID;
  /** Filter by biometric type */
  type?: AuthBiometricType | AuthBiometricType[];
  /** Filter by platform */
  platform?: AuthBiometricPlatform | AuthBiometricPlatform[];
  /** Filter by status */
  status?: AuthBiometricStatus | AuthBiometricStatus[];
  /** Filter by primary biometric */
  primaryOnly?: boolean;
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if biometric is valid
 */
export function isAuthBiometricValid(status: AuthBiometricStatus): boolean {
  return status === 'enrolled' || status === 'pending';
}

/**
 * Check if biometric is active
 */
export function isAuthBiometricActive(status: AuthBiometricStatus): boolean {
  return status === 'enrolled';
}

/**
 * Check if biometric is expired
 */
export function isAuthBiometricExpired(status: AuthBiometricStatus): boolean {
  return status === 'expired';
}

/**
 * Check if biometric is revoked
 */
export function isAuthBiometricRevoked(status: AuthBiometricStatus): boolean {
  return status === 'revoked';
}

/**
 * Get human-readable label for biometric type
 */
export function getAuthBiometricTypeLabel(type: AuthBiometricType): string {
  const labels: Record<AuthBiometricType, string> = {
    fingerprint: 'Fingerprint',
    face: 'Face Recognition',
    iris: 'Iris Scan',
    voice: 'Voice Recognition',
    hand_geometry: 'Hand Geometry',
    keystroke: 'Keystroke Dynamics',
    gait: 'Gait Analysis',
    signature: 'Signature Verification',
  };
  return labels[type] || 'Unknown Type';
}

/**
 * Get human-readable label for biometric status
 */
export function getAuthBiometricStatusLabel(status: AuthBiometricStatus): string {
  const labels: Record<AuthBiometricStatus, string> = {
    enrolled: 'Enrolled',
    pending: 'Pending',
    failed: 'Failed',
    expired: 'Expired',
    revoked: 'Revoked',
  };
  return labels[status] || 'Unknown Status';
}

/**
 * Get MFA method for biometric type
 */
export function getAuthBiometricMfaMethod(_type: AuthBiometricType): AuthMfaMethod {
  // All biometric types use the same MFA method
  return AUTH_MFA_METHODS.BIOMETRIC;
}

/**
 * Check if biometric type is supported
 */
export function isAuthBiometricTypeSupported(type: string): type is AuthBiometricType {
  const supported: AuthBiometricType[] = [
    'fingerprint',
    'face',
    'iris',
    'voice',
    'hand_geometry',
    'keystroke',
    'gait',
    'signature',
  ];
  return supported.includes(type as AuthBiometricType);
}

/**
 * Check if biometric enrollment is complete
 */
export function isAuthBiometricEnrollmentComplete(status: AuthBiometricStatus): boolean {
  return status === 'enrolled' || status === 'failed' || status === 'revoked';
}

/**
 * Get biometric security level
 */
export function getAuthBiometricSecurityLevel(type: AuthBiometricType): number {
  const levels: Record<AuthBiometricType, number> = {
    fingerprint: 8,
    face: 7,
    iris: 10,
    voice: 6,
    hand_geometry: 7,
    keystroke: 5,
    gait: 4,
    signature: 6,
  };
  return levels[type] || 5;
}

/**
 * Validate biometric data (placeholder)
 */
export function validateAuthBiometricData(
  _biometricData: unknown,
  _type: AuthBiometricType
): boolean {
  // This is a placeholder - actual validation depends on the biometric system
  // In production, this would validate the biometric data format
  return true;
}
