/**
 * Email Value Object
 * Validates and encapsulates email address
 */

import { BaseValueObject } from './base.vo.js';
import { isValidEmail, normalizeEmail } from '@vubon/auth-shared-utils';

export class Email extends BaseValueObject<string> {
  constructor(email: string) {
    const normalized = normalizeEmail(email);

    if (!isValidEmail(normalized)) {
      throw new Error(`Invalid email address: ${email}`);
    }

    super(normalized);
  }

  /**
   * Get the email domain
   */
  public getDomain(): string {
    const parts = this._value.split('@');
    return parts[1] || '';
  }

  /**
   * Get the email local part (before @)
   */
  public getLocalPart(): string {
    const parts = this._value.split('@');
    return parts[0] || '';
  }

  /**
   * Check if email is from a specific domain
   */
  public isFromDomain(domain: string): boolean {
    return this.getDomain().toLowerCase() === domain.toLowerCase();
  }

  /**
   * Check if email is a business email (not free providers)
   */
  public isBusinessEmail(): boolean {
    const freeProviders = [
      'gmail.com',
      'yahoo.com',
      'outlook.com',
      'hotmail.com',
      'protonmail.com',
      'aol.com',
      'icloud.com',
      'mail.com',
      'gmx.com',
    ];
    const domain = this.getDomain().toLowerCase();
    return !freeProviders.includes(domain);
  }

  /**
   * Mask email for privacy (e.g., "j***@example.com")
   */
  public mask(): string {
    const [local, domain] = this._value.split('@');
    if (!local || !domain) return this._value;

    const masked = local.length > 2 ? local[0] + '***' + local.slice(-1) : local[0] + '***';

    return `${masked}@${domain}`;
  }
}
