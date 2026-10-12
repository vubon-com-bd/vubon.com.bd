/**
 * InsuranceId Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REGEX } from '@vubon/shared-constants/common';

export class InsuranceIdVO extends BaseIdVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): InsuranceIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('InsuranceId cannot be empty', 'insuranceId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('InsuranceId must be a valid UUID', 'insuranceId');
    }
    return new InsuranceIdVO(trimmed);
  }

  static reconstitute(raw: string): InsuranceIdVO { return new InsuranceIdVO(raw); }
}
