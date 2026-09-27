/**
 * ContactValue Value Object
 * @module user-service/domain/value-objects/primitives
 *
 * Generic contact value. Actual validation depends on ContactType.
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { REGEX } from '@vubon/shared-constants/common';

export class ContactValueVO extends BaseCodeVO {
  private static readonly MAX_LENGTH = 500;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ContactValueVO {
    if (typeof raw !== 'string') {
      throw new Error('Contact value must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new Error('Contact value cannot be empty');
    }
    if (trimmed.length > ContactValueVO.MAX_LENGTH) {
      throw new Error(`Contact value too long (max ${ContactValueVO.MAX_LENGTH})`);
    }
    return new ContactValueVO(trimmed);
  }

  static asEmail(raw: string): ContactValueVO {
    const trimmed = raw.trim().toLowerCase();
    if (!REGEX.EMAIL.test(trimmed)) {
      throw new Error(`Invalid email contact: ${raw}`);
    }
    return new ContactValueVO(trimmed);
  }

  static asPhone(raw: string): ContactValueVO {
    const normalized = raw.replace(/\s+/g, '');
    if (!REGEX.PHONE_BD.test(normalized) && !REGEX.PHONE_INTL.test(normalized)) {
      throw new Error(`Invalid phone contact: ${raw}`);
    }
    return new ContactValueVO(normalized);
  }

  static asUrl(raw: string): ContactValueVO {
    const trimmed = raw.trim();
    if (!REGEX.URL.test(trimmed)) {
      throw new Error(`Invalid URL contact: ${raw}`);
    }
    return new ContactValueVO(trimmed);
  }

  looksLikeEmail(): boolean {
    return REGEX.EMAIL.test(this.value);
  }

  looksLikePhone(): boolean {
    return REGEX.PHONE_BD.test(this.value) || REGEX.PHONE_INTL.test(this.value);
  }

  looksLikeUrl(): boolean {
    return REGEX.URL.test(this.value);
  }
}
