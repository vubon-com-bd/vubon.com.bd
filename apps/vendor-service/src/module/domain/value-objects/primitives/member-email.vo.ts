/**
 * MemberEmail Value Object — team member invite email
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseEmailVO } from '@vubon/shared-kernel/domain/primitives/email.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import type { Email } from '@vubon/shared-types/common';

export class MemberEmailVO extends BaseEmailVO {
  private constructor(value: Email) {
    super(value);
  }

  static create(raw: string): MemberEmailVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Member email must be a string', 'email');
    }
    try {
      BaseEmailVO.validate(raw);
    } catch (err) {
      throw new ValidationError(
        err instanceof Error ? err.message : 'Invalid member email',
        'email',
      );
    }
    return new MemberEmailVO(BaseEmailVO.normalize(raw));
  }

  static reconstitute(raw: string): MemberEmailVO {
    return new MemberEmailVO(raw as Email);
  }

  /** Cannot invite disposable / temporary domains. */
  isDisposable(): boolean {
    const disposable = [
      'mailinator.com',
      'tempmail.com',
      'guerrillamail.com',
      '10minutemail.com',
      'throwaway.email',
      'yopmail.com',
    ];
    return disposable.includes(this.domain);
  }
}
