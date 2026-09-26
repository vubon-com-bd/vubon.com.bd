import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class IdempotencyKeyVO extends BaseCodeVO {
  static create(value: string): IdempotencyKeyVO {
    if (!value || value.trim().length < 8) {
      throw new Error('Idempotency key too short');
    }
    if (value.length > 128) {
      throw new Error('Idempotency key too long');
    }
    return new IdempotencyKeyVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
