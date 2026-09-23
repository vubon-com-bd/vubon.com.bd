import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class ReturnReasonVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ReturnReasonVO {
    BaseCodeVO.validateNonEmpty(raw, 'ReturnReason');
    return new ReturnReasonVO(raw);
  }
}
