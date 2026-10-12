/**
 * DeliveryAttemptId Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REGEX } from '@vubon/shared-constants/common';

export class DeliveryAttemptIdVO extends BaseIdVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): DeliveryAttemptIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('DeliveryAttemptId cannot be empty', 'attemptId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('DeliveryAttemptId must be a valid UUID', 'attemptId');
    }
    return new DeliveryAttemptIdVO(trimmed);
  }

  static reconstitute(raw: string): DeliveryAttemptIdVO { return new DeliveryAttemptIdVO(raw); }
}
