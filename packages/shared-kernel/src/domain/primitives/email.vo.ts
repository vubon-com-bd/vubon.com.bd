import { REGEX } from '@vubon/shared-constants/common';
import { VALIDATION } from '@vubon/shared-constants/common';
import type { Email } from '@vubon/shared-types/common';
import { BaseVO } from '../base/base.vo';

/**
 * Abstract Base Email VO — extend করার জন্য
 */
export abstract class BaseEmailVO extends BaseVO<Email> {
  protected constructor(value: Email) {
    super(value);
  }

  protected static normalize(raw: string): Email {
    return raw.trim().toLowerCase() as Email;
  }

  protected static validate(raw: string): void {
    const normalized = raw.trim().toLowerCase();
    if (normalized.length === 0) {
      throw new Error('Email cannot be empty');
    }
    if (normalized.length > VALIDATION.EMAIL_MAX_LENGTH) {
      throw new Error(`Email exceeds max length (${VALIDATION.EMAIL_MAX_LENGTH})`);
    }
    if (!REGEX.EMAIL.test(normalized)) {
      throw new Error(`Invalid email format: ${normalized}`);
    }
  }

  get domain(): string {
    return this.value.split('@')[1] ?? '';
  }

  get localPart(): string {
    return this.value.split('@')[0] ?? '';
  }
}

/**
 * Specific Email VO
 */
export class EmailVO extends BaseEmailVO {
  private constructor(value: Email) {
    super(value);
  }

  static of(raw: string): EmailVO {
    if (typeof raw !== 'string') {
      throw new Error('Email must be a string');
    }
    BaseEmailVO.validate(raw);
    return new EmailVO(BaseEmailVO.normalize(raw));
  }
}

/**
 * Re-export VALIDATION reference
 */
export const EMAIL_MAX_LENGTH = VALIDATION.EMAIL_MAX_LENGTH;
