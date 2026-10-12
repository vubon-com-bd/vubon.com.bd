/**
 * ShippingCost Value Object — calculated shipping fee
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { MoneyVO } from '@vubon/shared-kernel/domain/primitives';
import { ZONE } from '@vubon/shared-constants/logistics';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class ShippingCostVO extends BaseVO<MoneyVO> {
  private static readonly MAX = ZONE.MAX_SHIPPING_COST;

  private constructor(value: MoneyVO) { super(value); }

  static create(amount: number, currency: string): ShippingCostVO {
    if (amount < 0) {
      throw new ValidationError('Shipping cost cannot be negative', 'shippingCost');
    }
    if (amount > ShippingCostVO.MAX) {
      throw new ValidationError(`Shipping cost exceeds max ${ShippingCostVO.MAX}`, 'shippingCost');
    }
    return new ShippingCostVO(MoneyVO.of(amount, currency as never));
  }

  static reconstitute(amount: number, currency: string): ShippingCostVO {
    return new ShippingCostVO(MoneyVO.of(amount, currency as never));
  }

  static zero(currency: string): ShippingCostVO {
    return new ShippingCostVO(MoneyVO.of(0, currency as never));
  }

  get amount(): number { return this.value.amount; }
  get currency(): string { return this.value.currency; }

  isFree(): boolean { return this.value.amount === 0; }
  static max(): number { return ShippingCostVO.MAX; }
}
