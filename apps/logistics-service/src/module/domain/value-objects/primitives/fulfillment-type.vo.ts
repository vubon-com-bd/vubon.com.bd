import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>(['standard', 'express', 'priority', 'bulk']);

export class FulfillmentTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): FulfillmentTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid fulfillment type: ${raw}`);
    }
    return new FulfillmentTypeVO(raw);
  }
}
