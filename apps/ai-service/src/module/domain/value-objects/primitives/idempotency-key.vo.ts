import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class IdempotencyKeyVO extends BaseCodeVO {
  static create(raw: string): IdempotencyKeyVO {
    BaseCodeVO.validateNonEmpty(raw, 'IdempotencyKey');
    if (raw.length < 16 || raw.length > 128) {
      throw new Error('IdempotencyKey must be 16–128 chars');
    }
    return new IdempotencyKeyVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
