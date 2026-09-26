import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import type { BrandedId } from '@vubon/shared-kernel/domain/primitives';

export type FulfillmentId = BrandedId<'FulfillmentId'>;

export class FulfillmentIdVO extends BaseVO<FulfillmentId> {
  private constructor(value: FulfillmentId) {
    super(value);
  }

  static create(raw: string): FulfillmentIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('FulfillmentId cannot be empty');
    }
    return new FulfillmentIdVO(raw as FulfillmentId);
  }
}
