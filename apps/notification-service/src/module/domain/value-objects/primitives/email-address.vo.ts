/**
 * EmailAddress Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { REGEX, VALIDATION } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class EmailAddressVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): EmailAddressVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('Email cannot be empty', 'email');
    }
    const normalized = raw.trim().toLowerCase();
    if (normalized.length > VALIDATION.EMAIL_MAX_LENGTH) {
      throw new ValidationError(`Email exceeds max length (${VALIDATION.EMAIL_MAX_LENGTH})`, 'email');
    }
    if (!REGEX.EMAIL.test(normalized)) {
      throw new ValidationError(`Invalid email format: ${normalized}`, 'email');
    }
    return new EmailAddressVO(normalized);
  }

  static reconstitute(raw: string): EmailAddressVO {
    return new EmailAddressVO(raw);
  }

  get localPart(): string { return this.value.split('@')[0] ?? ''; }
  get domain(): string { return this.value.split('@')[1] ?? ''; }
  get domainWithoutTld(): string {
    const parts = this.domain.split('.');
    return parts.slice(0, -1).join('.') || this.domain;
  }
}
