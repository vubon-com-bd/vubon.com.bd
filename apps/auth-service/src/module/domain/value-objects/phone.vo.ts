/**
 * Phone Value Object
 * Validates and encapsulates phone number
 */

import { BaseValueObject } from './base.vo.js';
import { PHONE_REGEX } from '@vubon/auth-shared-constants';

export class Phone extends BaseValueObject<string> {
  constructor(phone: string) {
    const normalized = phone.trim();

    if (!normalized) {
      throw new Error('Phone number is required');
    }

    if (!PHONE_REGEX.test(normalized)) {
      throw new Error('Invalid Bangladeshi phone number format. Expected: 01XXXXXXXXX');
    }

    super(normalized);
  }

  /**
   * Get phone number in different formats
   */
  public getFormatted(): string {
    const phone = this._value;
    // Format as +880-1X-XXXXXXXX
    if (phone.startsWith('01')) {
      const operator = phone.substring(0, 3);
      const rest = phone.substring(3);
      return `+880-${operator.substring(1)}-${rest}`;
    }
    return phone;
  }

  /**
   * Get phone number without country code
   */
  public getLocal(): string {
    return this._value;
  }

  /**
   * Get phone number with international format
   */
  public getInternational(): string {
    return `+880${this._value.substring(1)}`;
  }

  /**
   * Get phone operator code (first 3 digits)
   */
  public getOperatorCode(): string {
    return this._value.substring(0, 3);
  }

  /**
   * Check if phone number is valid for specific operator
   */
  public isOperator(operator: string): boolean {
    const operators = {
      gp: ['017', '013'],
      robi: ['018', '016'],
      banglalink: ['019', '014'],
      teletalk: ['015'],
    };

    const prefix = this._value.substring(0, 3);
    const codes = operators[operator.toLowerCase() as keyof typeof operators] || [];
    return codes.includes(prefix);
  }

  /**
   * Mask phone number for privacy
   */
  public mask(): string {
    const phone = this._value;
    return `${phone.substring(0, 3)}****${phone.substring(7)}`;
  }
}
