import { Auth2FA } from '../auth/auth-2fa.types';

/**
 * Admin 2FA interface
 *
 * Design notes:
 * - Extends Auth2FA (inherits encryptedSecret, backupCodeHashes — both @internal).
 * - `adminId` only — no Admin summary embed.
 * - `isRequired` = admin must have 2FA enabled (policy flag).
 */
export interface Admin2FA extends Auth2FA {
  adminId: string;
  isRequired: boolean;
}
