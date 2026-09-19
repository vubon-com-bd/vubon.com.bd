import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class RecoveryCodeVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): RecoveryCodeVO {
    BaseCodeVO.validateNonEmpty(raw, 'RecoveryCode');
    return new RecoveryCodeVO(raw);
  }
}
