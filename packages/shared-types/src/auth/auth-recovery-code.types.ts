/**
 * Authentication Recovery Code Types
 * Recovery code management for MFA and account recovery
 */

import type { MfaMethod, MfaStatus } from '@vubon/shared-constants';

import type { ID, Timestamp } from '../common/core-primitives.types';
import type { AuthUser } from './auth.types';

/**
 * Recovery Code
 * Complete recovery code information
 */
export interface RecoveryCode {
  /** Unique identifier for the recovery code */
  id: ID;
  /** User ID associated with this recovery code */
  userId: ID;
  /** MFA method this recovery code is for */
  mfaMethod: MfaMethod;
  /** Hashed recovery code value */
  codeHash: string;
  /** Recovery code status */
  status: RecoveryCodeStatus;
  /** When recovery code was generated */
  generatedAt: Timestamp;
  /** When recovery code was used */
  usedAt?: Timestamp;
  /** When recovery code expires */
  expiresAt?: Timestamp;
}

/**
 * Recovery Code Status
 * Status of a recovery code
 */
export const RECOVERY_CODE_STATUS = {
  /** Code is active and can be used */
  ACTIVE: 'active',
  /** Code has been used */
  USED: 'used',
  /** Code has expired */
  EXPIRED: 'expired',
  /** Code has been revoked */
  REVOKED: 'revoked',
} as const;

export type RecoveryCodeStatus = (typeof RECOVERY_CODE_STATUS)[keyof typeof RECOVERY_CODE_STATUS];

/**
 * Recovery Code Generate Request
 * Request to generate recovery codes
 */
export interface RecoveryCodeGenerateRequest {
  /** User ID */
  userId: ID;
  /** MFA method */
  mfaMethod: MfaMethod;
  /** Number of codes to generate */
  count?: number;
  /** Recovery code length */
  length?: number;
  /** Expiry in seconds (optional) */
  expiresIn?: number;
}

/**
 * Recovery Code Generate Result
 * Result of recovery code generation
 */
export interface RecoveryCodeGenerateResult {
  /** User ID */
  userId: ID;
  /** MFA method */
  mfaMethod: MfaMethod;
  /** Generated recovery codes (plain text - show once) */
  codes: string[];
  /** Hashed recovery codes (stored) */
  hashedCodes: string[];
  /** Number of codes generated */
  count: number;
  /** Expiry timestamp */
  expiresAt: Timestamp;
  /** Warning message (if any) */
  warning?: string;
}

/**
 * Recovery Code Verify Request
 * Request to verify a recovery code
 */
export interface RecoveryCodeVerifyRequest {
  /** User ID */
  userId: ID;
  /** Recovery code (plain text) */
  code: string;
  /** MFA method (optional) */
  mfaMethod?: MfaMethod;
}

/**
 * Recovery Code Verify Result
 * Result of recovery code verification
 */
export interface RecoveryCodeVerifyResult {
  /** Is code valid */
  isValid: boolean;
  /** User data (if valid) */
  user?: AuthUser;
  /** Recovery code data (if valid) */
  recoveryCode?: RecoveryCode;
  /** MFA status after verification */
  mfaStatus?: MfaStatus;
  /** Access token (if verification completed) */
  accessToken?: string;
  /** Refresh token (if verification completed) */
  refreshToken?: string;
  /** Token expiry in seconds */
  expiresIn?: number;
  /** Error message (if invalid) */
  error?: string;
  /** Remaining attempts (if locked) */
  remainingAttempts?: number;
}

/**
 * Recovery Code List
 * List of recovery codes for a user
 */
export interface RecoveryCodeList {
  /** User ID */
  userId: ID;
  /** MFA method */
  mfaMethod: MfaMethod;
  /** List of recovery codes (hashed) */
  codes: RecoveryCode[];
  /** Total number of codes */
  total: number;
  /** Number of used codes */
  used: number;
  /** Number of remaining codes */
  remaining: number;
}

/**
 * Recovery Code Revoke Request
 * Request to revoke recovery codes
 */
export interface RecoveryCodeRevokeRequest {
  /** User ID */
  userId: ID;
  /** Specific code ID to revoke (optional) */
  codeId?: ID;
  /** Revoke all codes for this user */
  revokeAll?: boolean;
  /** MFA method (optional) */
  mfaMethod?: MfaMethod;
}

/**
 * Recovery Code Revoke Result
 * Result of recovery code revocation
 */
export interface RecoveryCodeRevokeResult {
  /** Number of codes revoked */
  revokedCount: number;
  /** User ID */
  userId: ID;
  /** MFA method (if specified) */
  mfaMethod?: MfaMethod;
  /** Revocation timestamp */
  revokedAt: Timestamp;
  /** Message */
  message: string;
}

/**
 * Recovery Code Statistics
 * Recovery code usage statistics
 */
export interface RecoveryCodeStatistics {
  /** Total codes generated */
  totalGenerated: number;
  /** Total codes used */
  totalUsed: number;
  /** Total codes expired */
  totalExpired: number;
  /** Total codes revoked */
  totalRevoked: number;
  /** Active codes */
  totalActive: number;
  /** Usage by MFA method */
  byMethod: Record<
    MfaMethod,
    {
      generated: number;
      used: number;
      expired: number;
    }
  >;
  /** Average time to use (seconds) */
  averageTimeToUse: number;
  /** Success rate */
  successRate: number;
  /** Timestamp of statistics */
  timestamp: Timestamp;
}

/**
 * Recovery Code Backup
 * Backup of recovery codes for user
 */
export interface RecoveryCodeBackup {
  /** User ID */
  userId: ID;
  /** Backup ID */
  backupId: ID;
  /** Backup of recovery codes (encrypted) */
  codes: string[];
  /** When backup was created */
  createdAt: Timestamp;
  /** Backup encryption metadata */
  encryption: {
    algorithm: string;
    iv: string;
    salt: string;
  };
}

/**
 * Recovery Code Session
 * Active recovery session
 */
export interface RecoveryCodeSession {
  /** Session ID */
  id: ID;
  /** User ID */
  userId: ID;
  /** MFA method being recovered */
  mfaMethod: MfaMethod;
  /** Recovery session status */
  status: 'pending' | 'verified' | 'expired';
  /** Number of attempts */
  attempts: number;
  /** Max attempts allowed */
  maxAttempts: number;
  /** Session start timestamp */
  startedAt: Timestamp;
  /** Session expiry timestamp */
  expiresAt: Timestamp;
}

/**
 * Recovery Code Email Request
 * Request to email recovery codes
 */
export interface RecoveryCodeEmailRequest {
  /** User ID */
  userId: ID;
  /** Email address */
  email: string;
  /** Custom message */
  message?: string;
  /** Include instructions */
  includeInstructions?: boolean;
}

/**
 * Recovery Code Email Result
 * Result of emailing recovery codes
 */
export interface RecoveryCodeEmailResult {
  /** Is email sent */
  sent: boolean;
  /** Recipient email */
  email: string;
  /** Sent timestamp */
  sentAt: Timestamp;
  /** Message */
  message: string;
}
