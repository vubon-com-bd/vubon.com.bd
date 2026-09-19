import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { BiometricFailedError } from '../../errors/biometric.errors';

export class BiometricIdVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): BiometricIdVO {
    BaseCodeVO.validateNonEmpty(raw, 'BiometricId');
    if (raw.length < 4) {
      throw new BiometricFailedError('biometric id too short');
    }
    return new BiometricIdVO(raw);
  }
}
