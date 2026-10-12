/**
 * DispatchId Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REGEX } from '@vubon/shared-constants/common';

export class DispatchIdVO extends BaseIdVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): DispatchIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('DispatchId cannot be empty', 'dispatchId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('DispatchId must be a valid UUID', 'dispatchId');
    }
    return new DispatchIdVO(trimmed);
  }

  static reconstitute(raw: string): DispatchIdVO { return new DispatchIdVO(raw); }
}
