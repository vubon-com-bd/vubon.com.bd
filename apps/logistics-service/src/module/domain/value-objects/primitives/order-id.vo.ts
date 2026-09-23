import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import type { BrandedId } from '@vubon/shared-kernel/domain/primitives';

export type OrderRefId = BrandedId<'LogisticsOrderRefId'>;

export class OrderIdVO extends BaseVO<OrderRefId> {
  private constructor(value: OrderRefId) {
    super(value);
  }

  static create(raw: string): OrderIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('OrderId cannot be empty');
    }
    return new OrderIdVO(raw as OrderRefId);
  }
}
