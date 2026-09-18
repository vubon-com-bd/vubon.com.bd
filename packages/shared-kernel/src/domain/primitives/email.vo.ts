/**
 * Email Value Object
 * @module shared-kernel/domain/primitives
 *
 * Values আসে shared-constants/common থেকে।
 */
import { REGEX } from '@vubon/shared-constants/common';
import { VALIDATION } from '@vubon/shared-constants/common';
import type { Email } from '@vubon/shared-types/common';
import { BaseVO } from '../base/base.vo';

export class EmailVO extends BaseVO<Email> {
  private static readonly MAX_LENGTH = 254;

  private constructor(value: Email) {
    super(value);
  }

  static of(raw: string): EmailVO {
    if (typeof raw !== 'string') {
      throw new Error('Email must be a string');
    }
    const normalized = raw.trim().toLowerCase();

    if (normalized.length === 0) {
      throw new Error('Email cannot be empty');
    }
    if (normalized.length > EmailVO.MAX_LENGTH) {
      throw new Error(`Email exceeds max length (${EmailVO.MAX_LENGTH})`);
    }
    if (!REGEX.EMAIL.test(normalized)) {
      throw new Error(`Invalid email format: ${normalized}`);
    }

    return new EmailVO(normalized as Email);
  }

  get domain(): string {
    return this.value.split('@')[1] ?? '';
  }

  get localPart(): string {
    return this.value.split('@')[0] ?? '';
  }
}

/**
 * Re-export VALIDATION reference to satisfy type-only constraint
 * without unused-import lint errors.
 */
export const EMAIL_MAX_LENGTH = VALIDATION.EMAIL_MAX_LENGTH;
