import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>([
  'active',
  'paused',
  'cancelled',
  'completed',
  'failed',
  'expired',
]);

export class RecurringStatusVO extends BaseStatusVO<string> {
  static create(value: string): RecurringStatusVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid recurring status: ${value}`);
    }
    return new RecurringStatusVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
