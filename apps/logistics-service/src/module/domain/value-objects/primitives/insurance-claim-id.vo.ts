/**
 * InsuranceClaimId Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REGEX } from '@vubon/shared-constants/common';

export class InsuranceClaimIdVO extends BaseIdVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): InsuranceClaimIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('InsuranceClaimId cannot be empty', 'claimId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('InsuranceClaimId must be a valid UUID', 'claimId');
    }
    return new InsuranceClaimIdVO(trimmed);
  }

  static reconstitute(raw: string): InsuranceClaimIdVO { return new InsuranceClaimIdVO(raw); }
}
