/**
 * ContactValue Value Object
 * @module vendor-service/domain/value-objects/primitives
 *
 * Polymorphic contact value — validation depends on ContactType.
 * Since ContactValue is standalone, it stores a raw string and applies
 * generic safe validation. Specific validation is done by the parent
 * ContactEntity which knows the ContactType.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REGEX } from '@vubon/shared-constants/common';

const MAX_LENGTH = 500;

export class ContactValueVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ContactValueVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ContactValue must be a string', 'contactValue');
    }
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new ValidationError('ContactValue cannot be empty', 'contactValue');
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `ContactValue exceeds max ${MAX_LENGTH} chars`,
        'contactValue',
      );
    }
    return new ContactValueVO(trimmed);
  }

  static reconstitute(raw: string): ContactValueVO {
    return new ContactValueVO(raw);
  }

  // ─── Type-aware validation ───
  isEmail(): boolean { return REGEX.EMAIL.test(this.value); }
  isPhoneBD(): boolean { return REGEX.PHONE_BD.test(this.value); }
  isPhoneIntl(): boolean { return REGEX.PHONE_INTL.test(this.value); }
  isUrl(): boolean { return REGEX.URL.test(this.value); }
  isUsername(): boolean { return REGEX.USERNAME.test(this.value); }

  get normalized(): string {
    return this.value.toLowerCase();
  }

  /** Mask for logs/UI (e.g. j***@example.com, 01*****789) */
  masked(): string {
    if (this.isEmail()) {
      const [local, domain] = this.value.split('@');
      if (!local || !domain) return this.value;
      const head = local.slice(0, 1);
      return `${head}***@${domain}`;
    }
    if (this.value.length >= 6) {
      const head = this.value.slice(0, 3);
      const tail = this.value.slice(-2);
      return `${head}***${tail}`;
    }
    return '***';
  }
}
