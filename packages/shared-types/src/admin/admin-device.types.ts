import { AuthDevice } from '../auth/auth-device.types';

/**
 * Admin device interface
 *
 * Design notes:
 * - Extends AuthDevice (inherits name, model, os, browser, isTrusted).
 * - `adminId` only — no Admin summary embed.
 */
export interface AdminDevice extends AuthDevice {
  adminId: string;
  isActive: boolean;
}
