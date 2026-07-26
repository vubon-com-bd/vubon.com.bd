/**
 * Email Value Object
 * Validates and encapsulates email addresses
 */

import { BaseValueObject } from './base.vo.js';
import { isValidEmail, normalizeEmail } from '@vubon/auth-shared-utils';

export class EmailVo extends BaseValueObject<string> {
  constructor(email: string) {
    const normalized = normalizeEmail(email);

    if (!isValidEmail(normalized)) {
      throw new Error(`Invalid email address: ${email}`);
    }

    super(normalized);
  }

  /**
   * Get the normalized email address
   */
  public get normalized(): string {
    return this._value;
  }

  /**
   * Get the domain part of the email
   * @throws Error if domain is not found
   */
  public get domain(): string {
    const parts = this._value.split('@');
    if (parts.length !== 2 || !parts[1]) {
      throw new Error(`Invalid email format: ${this._value}`);
    }
    return parts[1];
  }

  /**
   * Get the local part of the email
   * @throws Error if local part is not found
   */
  public get localPart(): string {
    const parts = this._value.split('@');
    if (parts.length !== 2 || !parts[0]) {
      throw new Error(`Invalid email format: ${this._value}`);
    }
    return parts[0];
  }

  /**
   * Check if email is from a disposable domain
   */
  public isDisposable(): boolean {
    try {
      const disposableDomains = [
        'tempmail.com',
        'temp-mail.org',
        '10minutemail.com',
        'guerrillamail.com',
        'mailinator.com',
        'throwaway.com',
        'dispostable.com',
        'fakeinbox.com',
        'getnada.com',
        'trashmail.com',
      ];
      return disposableDomains.some((d) => this.domain.includes(d));
    } catch {
      return true;
    }
  }
}
