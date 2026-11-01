/**
 * CartSummaryVO — Composite Value Object
 * @module cart-service/domain/value-objects/composites
 *
 * Lightweight cart projection (for list views / dashboards).
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CartIdVO } from '../primitives/cart-id.vo.js';
import { CartStatusVO } from '../primitives/cart-status.vo.js';

export interface CartSummaryVOProps {
  readonly id: CartIdVO;
  readonly status: CartStatusVO;
  readonly itemCount: number;
  readonly total: number;
  readonly currency: string;
}

export class CartSummaryVO extends BaseVO<CartSummaryVOProps> {
  private constructor(props: CartSummaryVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: CartSummaryVOProps): CartSummaryVO {
    const vo = new CartSummaryVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: CartSummaryVOProps): CartSummaryVO {
    return new CartSummaryVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!Number.isInteger(v.itemCount) || v.itemCount < 0) {
      throw new ValidationError('itemCount must be a non-negative integer', 'itemCount');
    }
    if (!Number.isFinite(v.total) || v.total < 0) {
      throw new ValidationError('total must be non-negative', 'total');
    }
  }

  get id(): CartIdVO { return this.value.id; }
  get status(): CartStatusVO { return this.value.status; }
  get itemCount(): number { return this.value.itemCount; }
  get total(): number { return this.value.total; }
  get currency(): string { return this.value.currency; }

  isEmpty(): boolean { return this.value.itemCount === 0; }
  isActive(): boolean { return this.status.isActiveStatus(); }
}
