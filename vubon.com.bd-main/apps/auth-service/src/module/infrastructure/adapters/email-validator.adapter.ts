/**
 * Email Validator Adapter
 * Implements IEmailValidator port using shared-utils
 */

import { Injectable } from '@nestjs/common';
import { IEmailValidator } from '@domain/ports/email-validator.port.js';
import {
  isValidEmail,
  normalizeEmail,
  isDisposableEmail,
  validateEmailWithDetails,
} from '@vubon/auth-shared-utils';

@Injectable()
export class EmailValidatorAdapter implements IEmailValidator {
  isValid(email: string): boolean {
    return isValidEmail(email);
  }

  isDisposable(email: string): boolean {
    return isDisposableEmail(email);
  }

  normalize(email: string): string {
    return normalizeEmail(email);
  }

  validateWithDetails(email: string): {
    isValid: boolean;
    normalized?: string;
    isDisposable?: boolean;
    errors?: string[];
  } {
    return validateEmailWithDetails(email);
  }

  isBusinessEmail(email: string): boolean {
    if (!email) return false;

    const normalized = this.normalize(email);
    const domain = this.extractDomain(normalized);

    if (!domain) return false;

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
      'yandex.com',
      'zoho.com',
      'tutanota.com',
      'fastmail.com',
    ];

    return !freeProviders.includes(domain.toLowerCase());
  }

  extractDomain(email: string): string {
    if (!email) return '';
    const parts = email.split('@');
    if (parts.length === 2) {
      return parts[1] || '';
    }
    return '';
  }

  extractLocalPart(email: string): string {
    if (!email) return '';
    const parts = email.split('@');
    if (parts.length === 2) {
      return parts[0] || '';
    }
    return '';
  }

  isFromDomain(email: string, domain: string): boolean {
    if (!email || !domain) return false;
    const emailDomain = this.extractDomain(email);
    return emailDomain.toLowerCase() === domain.toLowerCase();
  }

  maskEmail(email: string): string {
    if (!email) return '';

    const [local, domain] = email.split('@');
    if (!local || !domain) return email;

    let maskedLocal: string;
    if (local.length <= 2) {
      maskedLocal = local[0] + '***';
    } else {
      maskedLocal = local[0] + '***' + local.slice(-1);
    }

    return `${maskedLocal}@${domain}`;
  }

  isRoleBasedEmail(email: string): boolean {
    if (!email) return false;

    const local = this.extractLocalPart(email).toLowerCase();
    const roleBasedPrefixes = [
      'admin',
      'support',
      'info',
      'contact',
      'hello',
      'team',
      'sales',
      'help',
      'service',
      'noreply',
      'no-reply',
    ];

    return roleBasedPrefixes.some((prefix) => local.startsWith(prefix));
  }
}
