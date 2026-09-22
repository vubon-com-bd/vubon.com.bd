import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidKycStatusError } from '../../errors/kyc.errors';

const VALID = new Set([
  'pending',
  'submitted',
  'verified',
  'rejected',
  'expired',
]);

export class KycStatusVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): KycStatusVO {
    if (!VALID.has(raw)) {
      throw new InvalidKycStatusError(raw);
    }
    return new KycStatusVO(raw);
  }

  isVerified(): boolean {
    return this.value === 'verified';
  }
}
