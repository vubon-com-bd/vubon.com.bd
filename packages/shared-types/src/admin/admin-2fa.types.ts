/**
 * Admin 2FA Types
 * Two-factor authentication definitions
 */

import { BaseEntity, ID, Timestamp, Nullable } from '../common/core-primitives.types';

/**
 * 2FA method types
 */
export type Admin2FAMethod =
  'totp' | 'sms' | 'email' | 'backup_code' | 'webauthn' | 'authenticator_app';

/**
 * 2FA status types
 */
export type Admin2FAStatus =
  'enabled' | 'disabled' | 'pending_setup' | 'pending_verification' | 'locked';

/**
 * 2FA verification result
 */
export interface Admin2FAVerificationResult {
  /** Whether verification was successful */
  success: boolean;
  /** Whether verification is complete */
  isComplete: boolean;
  /** Error message if failed */
  errorMessage?: string;
  /** Remaining attempts */
  remainingAttempts?: number;
}

/**
 * Admin 2FA interface
 */
export interface Admin2FA extends BaseEntity {
  /** 2FA ID */
  id: ID;
  /** Admin ID */
  adminId: ID;
  /** 2FA method */
  method: Admin2FAMethod;
  /** 2FA status */
  status: Admin2FAStatus;
  /** Secret key (encrypted) */
  secret: string;
  /** Backup codes (encrypted, JSON array) */
  backupCodes?: Nullable<string>;
  /** Recovery codes (encrypted, JSON array) */
  recoveryCodes?: Nullable<string>;
  /** Phone number (for SMS) */
  phone?: Nullable<string>;
  /** Email (for email) */
  email?: Nullable<string>;
  /** WebAuthn credential ID */
  credentialId?: Nullable<string>;
  /** WebAuthn public key */
  publicKey?: Nullable<string>;
  /** Last verification timestamp */
  lastVerifiedAt?: Nullable<Timestamp>;
  /** Failed attempts count */
  failedAttempts: number;
  /** Max allowed attempts */
  maxAttempts: number;
  /** Is 2FA required for this admin */
  isRequired: boolean;
  /** Is 2FA enabled */
  isEnabled: boolean;
}

/**
 * 2FA setup data
 */
export interface Admin2FASetupData {
  /** Admin ID */
  adminId: ID;
  /** 2FA method */
  method: Admin2FAMethod;
  /** Phone (for SMS) */
  phone?: string;
  /** Email (for email) */
  email?: string;
  /** Is 2FA required */
  isRequired?: boolean;
}

/**
 * 2FA verification data
 */
export interface Admin2FAVerifyData {
  /** 2FA ID */
  id: ID;
  /** Verification code */
  code: string;
  /** Backup code (if using backup) */
  backupCode?: string;
}

/**
 * 2FA filter parameters
 */
export interface Admin2FAFilterParams {
  /** Filter by admin ID */
  adminId?: ID;
  /** Filter by method */
  method?: Admin2FAMethod | Admin2FAMethod[];
  /** Filter by status */
  status?: Admin2FAStatus | Admin2FAStatus[];
  /** Filter by enabled status */
  isEnabled?: boolean;
  /** Filter by required status */
  isRequired?: boolean;
}

/**
 * 2FA statistics
 */
export interface Admin2FAStatistics {
  /** Total 2FA records */
  totalRecords: number;
  /** Enabled records */
  enabledCount: number;
  /** Disabled records */
  disabledCount: number;
  /** Pending setup count */
  pendingSetupCount: number;
  /** Count by method */
  methodCounts: Record<Admin2FAMethod, number>;
  /** Count by status */
  statusCounts: Record<Admin2FAStatus, number>;
  /** Adoption rate */
  adoptionRate: number;
}

/**
 * Get 2FA method label
 */
export function getAdmin2FAMethodLabel(method: Admin2FAMethod): string {
  const labels: Record<Admin2FAMethod, string> = {
    totp: 'Authenticator App (TOTP)',
    sms: 'SMS',
    email: 'Email',
    backup_code: 'Backup Code',
    webauthn: 'WebAuthn (FIDO2)',
    authenticator_app: 'Authenticator App',
  };
  return labels[method] || method;
}

/**
 * Get 2FA status label
 */
export function getAdmin2FAStatusLabel(status: Admin2FAStatus): string {
  const labels: Record<Admin2FAStatus, string> = {
    enabled: 'Enabled',
    disabled: 'Disabled',
    pending_setup: 'Pending Setup',
    pending_verification: 'Pending Verification',
    locked: 'Locked',
  };
  return labels[status] || status;
}

/**
 * Get 2FA status color
 */
export function getAdmin2FAStatusColor(status: Admin2FAStatus): string {
  const colors: Record<Admin2FAStatus, string> = {
    enabled: 'success',
    disabled: 'default',
    pending_setup: 'warning',
    pending_verification: 'warning',
    locked: 'error',
  };
  return colors[status] || 'default';
}

/**
 * Check if 2FA is active
 */
export function isAdmin2FAActive(status: Admin2FAStatus): boolean {
  return status === 'enabled' || status === 'pending_verification';
}

/**
 * Check if 2FA is locked
 */
export function isAdmin2FALocked(status: Admin2FAStatus): boolean {
  return status === 'locked';
}

/**
 * Generate backup codes
 */
export function generateAdmin2FABackupCodes(count: number = 10): string[] {
  const codes: string[] = [];
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (let i = 0; i < count; i++) {
    let code = '';
    for (let j = 0; j < 8; j++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    codes.push(code);
  }
  return codes;
}

/**
 * Verify backup code
 */
export function verifyAdmin2FABackupCode(
  code: string,
  backupCodes: string[]
): { valid: boolean; remainingCodes: string[] } {
  const index = backupCodes.indexOf(code);
  if (index === -1) {
    return { valid: false, remainingCodes: backupCodes };
  }
  const remaining = [...backupCodes];
  remaining.splice(index, 1);
  return { valid: true, remainingCodes: remaining };
}

/**
 * Create 2FA statistics from array
 */
export function createAdmin2FAStatistics(records: Admin2FA[]): Admin2FAStatistics {
  const stats: Admin2FAStatistics = {
    totalRecords: records.length,
    enabledCount: 0,
    disabledCount: 0,
    pendingSetupCount: 0,
    methodCounts: {
      totp: 0,
      sms: 0,
      email: 0,
      backup_code: 0,
      webauthn: 0,
      authenticator_app: 0,
    },
    statusCounts: {
      enabled: 0,
      disabled: 0,
      pending_setup: 0,
      pending_verification: 0,
      locked: 0,
    },
    adoptionRate: 0,
  };

  records.forEach((record) => {
    stats.methodCounts[record.method] = (stats.methodCounts[record.method] || 0) + 1;
    stats.statusCounts[record.status] = (stats.statusCounts[record.status] || 0) + 1;

    if (record.isEnabled) stats.enabledCount++;
    if (record.status === 'disabled') stats.disabledCount++;
    if (record.status === 'pending_setup') stats.pendingSetupCount++;
  });

  const activeRecords = records.filter((r) => r.isEnabled).length;
  stats.adoptionRate = records.length > 0 ? (activeRecords / records.length) * 100 : 0;

  return stats;
}
