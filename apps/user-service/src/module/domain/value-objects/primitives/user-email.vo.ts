/**
 * UserEmail Value Object
 * @module user-service/domain/value-objects/primitives
 *
 * Extends BaseEmailVO from shared-kernel — uses REGEX.EMAIL + normalization.
 */
import { BaseEmailVO } from '@vubon/shared-kernel/domain/primitives/email.vo';
import type { Email } from '@vubon/shared-types/common';

export class UserEmailVO extends BaseEmailVO {
  private constructor(value: Email) {
    super(value);
  }

  static create(raw: string): UserEmailVO {
    if (typeof raw !== 'string') {
      throw new Error('Email must be a string');
    }
    UserEmailVO.validate(raw);
    return new UserEmailVO(UserEmailVO.normalize(raw));
  }

  static from(raw: Email): UserEmailVO {
    return new UserEmailVO(raw);
  }

  isGmail(): boolean {
    return this.domain === 'gmail.com' || this.domain === 'googlemail.com';
  }

  isCorporateDomain(): boolean {
    const freeProviders = new Set([
      'gmail.com',
      'yahoo.com',
      'hotmail.com',
      'outlook.com',
      'live.com',
      'icloud.com',
      'protonmail.com',
      'aol.com',
    ]);
    return !freeProviders.has(this.domain);
  }
}
