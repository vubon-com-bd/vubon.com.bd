import { BaseValueObject } from './base.vo';
import { EMAIL_REGEX } from '@vubon/shared-constants';

/**
 * Email Value Object
 * Represents a validated and normalized email address
 * Immutable and identified by its value
 */
export class Email extends BaseValueObject<string> {
  private constructor(value: string) {
    const normalized = Email.normalize(value);
    Email.validate(normalized);
    super(normalized);
  }

  /**
   * Create a new Email instance
   * @throws {Error} If the email is invalid
   */
  static create(value: string): Email {
    return new Email(value);
  }

  /**
   * Validate email format
   * @throws {Error} If the email is invalid
   */
  private static validate(value: string): void {
    if (!value || typeof value !== 'string') {
      throw new Error('Email must be a non-empty string');
    }

    if (!EMAIL_REGEX.STANDARD.test(value)) {
      throw new Error(`Invalid email format: ${value}`);
    }
  }

  /**
   * Normalize email: trim and convert to lowercase
   */
  private static normalize(value: string): string {
    return value.trim().toLowerCase();
  }

  /**
   * Check if the email is from a disposable/temporary service
   */
  isDisposable(): boolean {
    const domain = this._value.split('@')[1];
    if (!domain) {
      return false;
    }

    const disposableDomains = new Set([
      'tempmail.com',
      'throwaway.com',
      '10minutemail.com',
      'guerrillamail.com',
      'mailinator.com',
      'yopmail.com',
      'getnada.com',
      'dropmail.me',
      'mailnesia.com',
      'spamgourmet.com',
      'trashmail.com',
      'temp-mail.org',
      'fakeinbox.com',
      'throwawaymail.com',
      'guerrillamail.net',
      'guerrillamail.org',
      'guerrillamail.biz',
      'maildrop.cc',
      'mailcatch.com',
      'spambox.us',
      'tempinbox.com',
      'trash2009.com',
      'trashmail.net',
      'trashmail.me',
      'spamfree24.com',
      'spamfree24.net',
      'spamfree24.org',
      'spamfree24.de',
      'spamspot.com',
      'wegwerfmail.de',
      'wegwerfmail.net',
      'wegwerfmail.org',
      'mytemp.email',
      'temp-mail.net',
      'tempinbox.co',
      'temp-mail.io',
    ]);

    return disposableDomains.has(domain);
  }

  /**
   * Get the domain part of the email
   */
  getDomain(): string {
    const parts = this._value.split('@');
    return parts[1] || '';
  }

  /**
   * Get the local part of the email (before @)
   */
  getLocalPart(): string {
    const parts = this._value.split('@');
    return parts[0] || '';
  }

  /**
   * Check if the email has a specific domain
   */
  hasDomain(domain: string): boolean {
    return this.getDomain() === domain.toLowerCase();
  }

  /**
   * Check if the email is from a specific email provider
   */
  isFromProvider(provider: string): boolean {
    const providerDomains: Record<string, string[]> = {
      gmail: ['gmail.com', 'googlemail.com'],
      outlook: ['outlook.com', 'hotmail.com', 'live.com', 'msn.com'],
      yahoo: ['yahoo.com', 'yahoo.co.uk', 'yahoo.fr', 'yahoo.de'],
      icloud: ['icloud.com', 'me.com', 'mac.com'],
      proton: ['protonmail.com', 'proton.me', 'pm.me'],
    };

    const domains = providerDomains[provider.toLowerCase()];
    if (!domains) {
      return false;
    }

    return domains.includes(this.getDomain());
  }

  /**
   * Create a masked version of the email for privacy
   * Example: john.doe@example.com -> j***e@example.com
   */
  mask(): string {
    const [local, domain] = this._value.split('@');
    if (!local || !domain) {
      return this._value;
    }

    if (local.length <= 2) {
      return `${local[0] || ''}***@${domain}`;
    }

    const first = local[0];
    const last = local[local.length - 1];
    return `${first}***${last}@${domain}`;
  }

  /**
   * Compare two Email objects
   */
  equals(other: Email | null | undefined): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (!(other instanceof Email)) {
      return false;
    }

    return this._value === other._value;
  }

  /**
   * Get string representation
   */
  toString(): string {
    return this._value;
  }

  /**
   * Get the raw value (alias for toString)
   */
  getValue(): string {
    return this._value;
  }
}
