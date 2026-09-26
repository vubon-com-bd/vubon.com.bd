import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { VENDOR_VERIFICATION_STATUS } from '@vubon/shared-constants/business/vendor';
import { InvalidVerificationStatusError } from '../../errors/verification.errors';

const VALID = new Set<string>(Object.values(VENDOR_VERIFICATION_STATUS));

export class VerificationStatusVO extends BaseVO<string> {
  static create(value: string): VerificationStatusVO {
    if (!VALID.has(value)) {
      throw new InvalidVerificationStatusError(value);
    }
    return new VerificationStatusVO(value);
  }

  private constructor(value: string) {
    super(value);
  }

  isApproved(): boolean {
    return this.value === VENDOR_VERIFICATION_STATUS.APPROVED;
  }

  isPending(): boolean {
    return this.value === VENDOR_VERIFICATION_STATUS.PENDING;
  }
}
