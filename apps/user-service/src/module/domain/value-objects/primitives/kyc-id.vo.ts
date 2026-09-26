import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidKycIdError } from '../../errors/kyc.errors';

export class KycIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): KycIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new InvalidKycIdError('KycId cannot be empty');
    }
    return new KycIdVO(raw);
  }
}
