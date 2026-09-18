import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { MfaInvalidError } from '../../errors/mfa.errors';

export class MfaSecretVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): MfaSecretVO {
    BaseCodeVO.validateNonEmpty(raw, 'MfaSecret');
    if (raw.length < 16) {
      throw new MfaInvalidError('MFA secret too short');
    }
    return new MfaSecretVO(raw);
  }
}
