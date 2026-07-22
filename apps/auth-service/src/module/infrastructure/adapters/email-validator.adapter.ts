/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-argument */
/**
 * Email validator adapter implementation
 * Implements the EmailValidator port using shared utilities
 */

import { Injectable } from '@nestjs/common';
import {
  isValidEmail,
  normalizeEmail,
  getEmailDomain,
  getEmailLocalPart,
  isEmailFromDomain,
  isEmailFromAllowedDomains,
  obfuscateEmail,
  isEmailWithPlusAlias,
  stripEmailPlusAlias,
  isDisposableEmail,
  isEducationalEmail,
} from '@vubon/auth-shared-utils';

import type {
  EmailValidator,
  EmailValidationResult,
  EmailValidationDetails,
  EmailValidatorConfig,
} from '../../../domain/ports/email-validator.port';

@Injectable()
export class EmailValidatorAdapter implements EmailValidator {
  private config: EmailValidatorConfig;

  constructor() {
    this.config = {
      allowDisposable: false,
      allowEducational: true,
      allowedDomains: [],
      blockedDomains: [],
      disposableDomains: [
        'tempmail.com',
        'throwaway.com',
        'guerrillamail.com',
        'mailinator.com',
        '10minutemail.com',
        'temp-mail.org',
        'disposable.com',
        'spamgourmet.com',
        'yopmail.com',
        'mailnator.com',
        'fakeinbox.com',
        'trashmail.com',
        'spambox.com',
        'tempemail.com',
        'maildrop.com',
        'minutemail.com',
        'getnada.com',
        'mailcatch.com',
        'spamex.com',
        'mytrashmail.com',
      ],
      maxLength: 255,
      autoNormalize: true,
      dnsValidation: false,
    };
  }

  isValid(email: string): boolean {
    if (!email || typeof email !== 'string') {
      return false;
    }

    const emailToValidate = this.config.autoNormalize ? this.normalize(email) : email.trim();

    return isValidEmail(emailToValidate);
  }

  isDisposable(email: string): boolean {
    if (!this.isValid(email)) {
      return false;
    }

    const normalizedEmail = this.normalize(email);
    return isDisposableEmail(normalizedEmail, this.config.disposableDomains);
  }

  isEducational(email: string): boolean {
    if (!this.isValid(email)) {
      return false;
    }

    const normalizedEmail = this.normalize(email);
    return isEducationalEmail(normalizedEmail);
  }

  normalize(email: string): string {
    if (!email || typeof email !== 'string') {
      return '';
    }

    return normalizeEmail(email);
  }

  getDomain(email: string): string | null {
    if (!this.isValid(email)) {
      return null;
    }

    const normalizedEmail = this.normalize(email);
    return getEmailDomain(normalizedEmail);
  }

  getLocalPart(email: string): string | null {
    if (!this.isValid(email)) {
      return null;
    }

    const normalizedEmail = this.normalize(email);
    return getEmailLocalPart(normalizedEmail);
  }

  isFromDomain(email: string, domain: string): boolean {
    if (!this.isValid(email) || !domain) {
      return false;
    }

    const normalizedEmail = this.normalize(email);
    return isEmailFromDomain(normalizedEmail, domain);
  }

  isFromAllowedDomains(email: string, allowedDomains: string[]): boolean {
    if (!this.isValid(email) || !allowedDomains || allowedDomains.length === 0) {
      return true;
    }

    const normalizedEmail = this.normalize(email);
    return isEmailFromAllowedDomains(normalizedEmail, allowedDomains);
  }

  obfuscate(email: string): string {
    if (!this.isValid(email)) {
      return '';
    }

    const normalizedEmail = this.normalize(email);
    return obfuscateEmail(normalizedEmail);
  }

  hasPlusAlias(email: string): boolean {
    if (!this.isValid(email)) {
      return false;
    }

    const normalizedEmail = this.normalize(email);
    return isEmailWithPlusAlias(normalizedEmail);
  }

  stripPlusAlias(email: string): string {
    if (!this.isValid(email)) {
      return email;
    }

    const normalizedEmail = this.normalize(email);
    return stripEmailPlusAlias(normalizedEmail);
  }

  validateMany(emails: string[]): EmailValidationResult {
    const valid: string[] = [];
    const invalid: string[] = [];

    if (!Array.isArray(emails)) {
      return { valid, invalid };
    }

    for (const email of emails) {
      if (typeof email === 'string' && this.isValid(email)) {
        valid.push(this.normalize(email));
      } else {
        invalid.push(email);
      }
    }

    return { valid, invalid };
  }

  validateWithDetails(email: string): EmailValidationDetails {
    const errors: string[] = [];
    let isValid = false;
    let normalized = '';
    let domain: string | null = null;
    let localPart: string | null = null;
    let isDisposable = false;
    let isEducational = false;
    let hasPlusAlias = false;
    let obfuscated = '';
    let strippedEmail = '';

    if (!email || typeof email !== 'string') {
      errors.push('Email is required');
      return {
        isValid: false,
        normalized: '',
        domain: null,
        localPart: null,
        isDisposable: false,
        isEducational: false,
        hasPlusAlias: false,
        obfuscated: '',
        strippedEmail: '',
        isBlocked: false,
        isAllowed: true,
        errors,
      };
    }

    try {
      normalized = this.normalize(email);

      if (!this.isValid(normalized)) {
        errors.push('Invalid email format');
      } else {
        isValid = true;
        domain = this.getDomain(normalized);
        localPart = this.getLocalPart(normalized);
        isDisposable = this.isDisposable(normalized);
        isEducational = this.isEducational(normalized);
        hasPlusAlias = this.hasPlusAlias(normalized);
        obfuscated = this.obfuscate(normalized);
        strippedEmail = this.stripPlusAlias(normalized);

        if (this.config.allowDisposable === false && isDisposable) {
          errors.push('Disposable email addresses are not allowed');
        }

        if (this.config.allowEducational === false && isEducational) {
          errors.push('Educational email addresses are not allowed');
        }

        if (this.config.allowedDomains.length > 0) {
          const isAllowedDomain = this.isFromAllowedDomains(normalized, this.config.allowedDomains);
          if (!isAllowedDomain) {
            errors.push('Email domain is not allowed');
          }
        }

        if (this.config.blockedDomains.length > 0) {
          const isBlockedDomain = this.isBlocked(normalized);
          if (isBlockedDomain) {
            errors.push('Email domain is blocked');
          }
        }
      }
    } catch {
      errors.push('Email validation failed');
    }

    return {
      isValid: isValid && errors.length === 0,
      normalized,
      domain,
      localPart,
      isDisposable,
      isEducational,
      hasPlusAlias,
      obfuscated,
      strippedEmail,
      isBlocked: this.isBlocked(normalized),
      isAllowed: this.isAllowed(normalized),
      errors,
    };
  }

  isBlocked(email: string): boolean {
    if (!this.isValid(email)) {
      return false;
    }

    const normalizedEmail = this.normalize(email);
    const domain = this.getDomain(normalizedEmail);

    if (!domain) {
      return false;
    }

    return this.config.blockedDomains.some(
      (blockedDomain) => domain.toLowerCase() === blockedDomain.toLowerCase()
    );
  }

  isAllowed(email: string): boolean {
    if (!this.isValid(email)) {
      return false;
    }

    const normalizedEmail = this.normalize(email);
    const domain = this.getDomain(normalizedEmail);

    if (!domain) {
      return false;
    }

    if (this.config.allowedDomains.length === 0) {
      return true;
    }

    return this.config.allowedDomains.some(
      (allowedDomain) => domain.toLowerCase() === allowedDomain.toLowerCase()
    );
  }

  getConfig(): EmailValidatorConfig {
    return { ...this.config };
  }

  setConfig(config: Partial<EmailValidatorConfig>): void {
    this.config = {
      ...this.config,
      ...config,
    };
  }

  addDisposableDomains(domains: string[]): void {
    this.config.disposableDomains = [...this.config.disposableDomains, ...domains];
  }

  addBlockedDomains(domains: string[]): void {
    this.config.blockedDomains = [...this.config.blockedDomains, ...domains];
  }

  addAllowedDomains(domains: string[]): void {
    this.config.allowedDomains = [...this.config.allowedDomains, ...domains];
  }

  validateWithConfig(
    email: string,
    config?: Partial<EmailValidatorConfig>
  ): { isValid: boolean; errors: string[]; normalized: string } {
    const mergedConfig = {
      ...this.config,
      ...config,
    };

    const errors: string[] = [];

    if (!email || typeof email !== 'string') {
      errors.push('Email is required');
      return { isValid: false, errors, normalized: '' };
    }

    const normalized = mergedConfig.autoNormalize ? this.normalize(email) : email.trim();

    if (!this.isValid(normalized)) {
      errors.push('Invalid email format');
      return { isValid: false, errors, normalized };
    }

    if (normalized.length > mergedConfig.maxLength) {
      errors.push(`Email must be less than ${mergedConfig.maxLength} characters`);
    }

    if (!mergedConfig.allowDisposable && this.isDisposable(normalized)) {
      errors.push('Disposable email addresses are not allowed');
    }

    if (!mergedConfig.allowEducational && this.isEducational(normalized)) {
      errors.push('Educational email addresses are not allowed');
    }

    if (mergedConfig.allowedDomains.length > 0) {
      const isAllowedDomain = this.isFromAllowedDomains(normalized, mergedConfig.allowedDomains);
      if (!isAllowedDomain) {
        errors.push('Email domain is not allowed');
      }
    }

    if (mergedConfig.blockedDomains.length > 0) {
      const isBlockedDomain = this.isBlocked(normalized);
      if (isBlockedDomain) {
        errors.push('Email domain is blocked');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      normalized,
    };
  }
}

export class EmailValidatorAdapterFactory {
  public static create(): EmailValidatorAdapter {
    return new EmailValidatorAdapter();
  }
}

export const emailValidatorProvider = {
  provide: 'EMAIL_VALIDATOR',
  useClass: EmailValidatorAdapter,
};

export default EmailValidatorAdapter;
