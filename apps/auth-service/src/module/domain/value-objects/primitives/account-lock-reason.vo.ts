import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class AccountLockReasonVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AccountLockReasonVO {
    BaseCodeVO.validateNonEmpty(raw, 'AccountLockReason');
    return new AccountLockReasonVO(raw);
  }
}
