import { AuthBiometric } from '../auth/auth-biometric.types';

/**
 * Admin biometric interface
 *
 * Design notes:
 * - Extends AuthBiometric (inherits publicKey, credentialId — sensitive).
 * - `adminId` only — no Admin summary embed.
 * - `isRequired` = admin must enroll biometric (policy flag).
 */
export interface AdminBiometric extends AuthBiometric {
  adminId: string;
  isRequired: boolean;
}
