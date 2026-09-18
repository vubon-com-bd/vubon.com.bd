import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { VerificationExpiredError } from '../../errors/verification.errors';

export class VerificationCodeVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VerificationCodeVO {
    BaseCodeVO.validateNonEmpty(raw, 'VerificationCode');
    if (raw.length < 4) {
      throw new VerificationExpiredError(raw);
    }
    return new VerificationCodeVO(raw);
  }
}
