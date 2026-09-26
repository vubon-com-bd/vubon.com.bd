import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { InvalidVerificationIdError } from '../../errors/verification.errors';

export class VerificationIdVO extends BaseIdVO {
  static create(value: string): VerificationIdVO {
    if (!value || value.trim().length === 0) {
      throw new InvalidVerificationIdError(value);
    }
    return new VerificationIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
