import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>([
  'pending',
  'in_progress',
  'picked',
  'packed',
  'completed',
  'failed',
]);

export class FulfillmentStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): FulfillmentStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid fulfillment status: ${raw}`);
    }
    return new FulfillmentStatusVO(raw);
  }
}
