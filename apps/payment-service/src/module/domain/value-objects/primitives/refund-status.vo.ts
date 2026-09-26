import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>([
  'pending',
  'processing',
  'succeeded',
  'failed',
  'cancelled',
]);

export class RefundStatusVO extends BaseStatusVO<string> {
  static create(value: string): RefundStatusVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid refund status: ${value}`);
    }
    return new RefundStatusVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
