/**
 * EmailAddress Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseEmailVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MAX = 254;

export class EmailAddressVO extends BaseEmailVO {
  private constructor(value: string) {
    super(value as never);
  }

  static create(raw: string): EmailAddressVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Email must be a string', 'email');
    }
    const normalized = raw.trim().toLowerCase();
    if (normalized.length === 0) {
      throw new ValidationError('Email cannot be empty', 'email');
    }
    if (normalized.length > MAX) {
      throw new ValidationError(`Email exceeds ${MAX} chars`, 'email');
    }
    try {
      // Use parent's protected validate via a benign call pattern
      const tmp = EmailAddressVO.validateVia(raw);
      return new EmailAddressVO(tmp);
    } catch (err) {
      if (err instanceof ValidationError) throw err;
      throw new ValidationError(`Invalid email format: ${normalized}`, 'email');
    }
  }

  /** Bridge to BaseEmailVO's protected validate. */
  private static validateVia(raw: string): string {
    // BaseEmailVO.validate is protected static — call via an inline subclass
    // so we can leverage its validation without duplicating the regex.
    const child = class extends BaseEmailVO {
      public static run(r: string): string {
        BaseEmailVO.validate(r);
        return BaseEmailVO.normalize(r);
      }
    };
    return child.run(raw);
  }

  static reconstitute(raw: string): EmailAddressVO {
    return new EmailAddressVO(raw);
  }
}
