/**
 * Authentication Biometric Types
 * Biometric authentication data types
 */

import type { ID, Timestamp } from '../common/core-primitives.types';
import type { AuthUser } from './auth.types';

/**
 * Biometric Data
 * Complete biometric authentication data
 */
export interface BiometricData {
  /** Unique identifier */
  id: ID;
  /** User ID */
  userId: ID;
  /** Biometric type (fingerprint, face, iris, voice, etc.) */
  biometricType: BiometricType;
  /** Biometric status */
  status: BiometricStatus;
  /** Biometric credential ID (from device) */
  credentialId: string;
  /** Biometric public key (for verification) */
  publicKey?: string;
  /** Biometric device ID */
  deviceId: ID;
  /** Device name */
  deviceName: string;
  /** Biometric registration timestamp */
  registeredAt: Timestamp;
  /** Last used timestamp */
  lastUsedAt?: Timestamp;
  /** Biometric expiry timestamp */
  expiresAt?: Timestamp;
  /** Is biometric active */
  isActive: boolean;
  /** Is biometric verified */
  isVerified: boolean;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Biometric Type
 * Types of biometric authentication
 */
export const BIOMETRIC_TYPES = {
  /** Fingerprint recognition */
  FINGERPRINT: 'fingerprint',
  /** Facial recognition */
  FACE: 'face',
  /** Iris recognition */
  IRIS: 'iris',
  /** Voice recognition */
  VOICE: 'voice',
  /** Palm print recognition */
  PALM: 'palm',
  /** Retina recognition */
  RETINA: 'retina',
  /** Hand geometry */
  HAND_GEOMETRY: 'hand_geometry',
  /** Signature recognition */
  SIGNATURE: 'signature',
  /** Gait recognition */
  GAIT: 'gait',
  /** Ear recognition */
  EAR: 'ear',
} as const;

export type BiometricType = (typeof BIOMETRIC_TYPES)[keyof typeof BIOMETRIC_TYPES];

/**
 * Biometric Status
 * Status of biometric authentication
 */
export const BIOMETRIC_STATUS = {
  /** Biometric is active and ready */
  ACTIVE: 'active',
  /** Biometric is inactive */
  INACTIVE: 'inactive',
  /** Biometric is pending verification */
  PENDING: 'pending',
  /** Biometric is verified */
  VERIFIED: 'verified',
  /** Biometric is blocked */
  BLOCKED: 'blocked',
  /** Biometric has expired */
  EXPIRED: 'expired',
  /** Biometric failed verification */
  FAILED: 'failed',
} as const;

export type BiometricStatus = (typeof BIOMETRIC_STATUS)[keyof typeof BIOMETRIC_STATUS];

/**
 * Biometric Registration Request
 * Request to register biometric authentication
 */
export interface BiometricRegistrationRequest {
  /** User ID */
  userId: ID;
  /** Biometric type */
  biometricType: BiometricType;
  /** Device ID */
  deviceId: ID;
  /** Device name */
  deviceName: string;
  /** Biometric credential ID */
  credentialId: string;
  /** Biometric public key (optional) */
  publicKey?: string;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Biometric Verification Request
 * Request to verify biometric authentication
 */
export interface BiometricVerificationRequest {
  /** User ID */
  userId: ID;
  /** Biometric credential ID */
  credentialId: string;
  /** Biometric signature or token */
  biometricSignature: string;
  /** Device ID (optional) */
  deviceId?: ID;
}

/**
 * Biometric Verification Result
 * Result of biometric verification
 */
export interface BiometricVerificationResult {
  /** Is verification successful */
  success: boolean;
  /** User data (if successful) */
  user?: AuthUser;
  /** Biometric data (if successful) */
  biometricData?: BiometricData;
  /** Access token (if verification completed) */
  accessToken?: string;
  /** Refresh token (if verification completed) */
  refreshToken?: string;
  /** Token expiry in seconds */
  expiresIn?: number;
  /** Error message (if failed) */
  error?: string;
  /** Confidence score (0-100) */
  confidenceScore?: number;
}

/**
 * Biometric Delete Request
 * Request to delete biometric authentication
 */
export interface BiometricDeleteRequest {
  /** User ID */
  userId: ID;
  /** Biometric ID (optional, deletes all if not provided) */
  biometricId?: ID;
  /** Device ID (optional) */
  deviceId?: ID;
}

/**
 * Biometric Delete Result
 * Result of biometric deletion
 */
export interface BiometricDeleteResult {
  /** Is deletion successful */
  success: boolean;
  /** Number of biometrics deleted */
  deletedCount: number;
  /** Message */
  message: string;
}

/**
 * Biometric List
 * List of biometric authentications for a user
 */
export interface BiometricList {
  /** User ID */
  userId: ID;
  /** List of biometric data */
  biometrics: BiometricData[];
  /** Total count */
  total: number;
  /** Active count */
  activeCount: number;
  /** Verified count */
  verifiedCount: number;
}

/**
 * Biometric Statistics
 * Biometric usage statistics
 */
export interface BiometricStatistics {
  /** Total biometric registrations */
  totalRegistrations: number;
  /** Active biometrics */
  activeBiometrics: number;
  /** Verified biometrics */
  verifiedBiometrics: number;
  /** Blocked biometrics */
  blockedBiometrics: number;
  /** Registrations by type */
  byType: Record<BiometricType, number>;
  /** Verification success rate */
  successRate: number;
  /** Average verification time in seconds */
  averageVerificationTime: number;
  /** Failed verifications */
  failedVerifications: number;
  /** Timestamp of statistics */
  timestamp: Timestamp;
}

/**
 * Biometric Session
 * Active biometric session data
 */
export interface BiometricSession {
  /** Session ID */
  id: ID;
  /** User ID */
  userId: ID;
  /** Biometric ID */
  biometricId: ID;
  /** Session status */
  status: 'pending' | 'verified' | 'failed' | 'expired';
  /** Session start timestamp */
  startedAt: Timestamp;
  /** Session expiry timestamp */
  expiresAt: Timestamp;
  /** Number of attempts */
  attempts: number;
  /** Max attempts allowed */
  maxAttempts: number;
  /** Device ID */
  deviceId?: ID;
}

/**
 * Biometric Challenge
 * Challenge-response for biometric verification
 */
export interface BiometricChallenge {
  /** Challenge ID */
  id: ID;
  /** Challenge data (random bytes) */
  challenge: string;
  /** User ID */
  userId: ID;
  /** Biometric ID */
  biometricId: ID;
  /** Challenge creation timestamp */
  createdAt: Timestamp;
  /** Challenge expiry timestamp */
  expiresAt: Timestamp;
  /** Is challenge used */
  isUsed: boolean;
}

/**
 * Biometric Device
 * Device with biometric capability
 */
export interface BiometricDevice {
  /** Device ID */
  deviceId: ID;
  /** Device name */
  deviceName: string;
  /** Device type */
  deviceType: string;
  /** Supported biometric types */
  supportedTypes: BiometricType[];
  /** Is device trusted */
  isTrusted: boolean;
  /** Last used timestamp */
  lastUsedAt?: Timestamp;
  /** Device metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Biometric Settings
 * User's biometric settings
 */
export interface BiometricSettings {
  /** User ID */
  userId: ID;
  /** Is biometric enabled */
  isEnabled: boolean;
  /** Allowed biometric types */
  allowedTypes: BiometricType[];
  /** Default biometric type */
  defaultType?: BiometricType;
  /** Max verification attempts */
  maxAttempts: number;
  /** Lockout duration in seconds */
  lockoutDuration: number;
  /** Session timeout in seconds */
  sessionTimeout: number;
}

/**
 * Biometric Configuration Values
 * System-wide biometric configuration
 */
export interface BiometricConfig {
  /** Max biometrics per user */
  maxBiometricsPerUser: number;
  /** Max verification attempts */
  maxVerificationAttempts: number;
  /** Lockout duration in seconds */
  lockoutDuration: number;
  /** Session timeout in seconds */
  sessionTimeout: number;
  /** Challenge expiry in seconds */
  challengeExpiry: number;
  /** Minimum confidence score */
  minConfidenceScore: number;
  /** Enable biometric authentication */
  isEnabled: boolean;
}
