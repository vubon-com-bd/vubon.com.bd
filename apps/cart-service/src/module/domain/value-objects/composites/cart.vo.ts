/**
 * CartVO — Composite Value Object
 * @module cart-service/domain/value-objects/composites
 *
 * Represents an immutable cart snapshot (header info, no items list here).
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CartIdVO } from '../primitives/cart-id.vo.js';
import { CartStatusVO } from '../primitives/cart-status.vo.js';
import { CartTypeVO } from '../primitives/cart-type.vo.js';

export interface CartVOProps {
  readonly id: CartIdVO;
  readonly status: CartStatusVO;
  readonly type: CartTypeVO;
  readonly itemCount: number;
  readonly currency: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class CartVO extends BaseVO<CartVOProps> {
  private constructor(props: CartVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: CartVOProps): CartVO {
    const vo = new CartVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: CartVOProps): CartVO {
    return new CartVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!Number.isInteger(v.itemCount) || v.itemCount < 0) {
      throw new ValidationError('itemCount must be a non-negative integer', 'itemCount');
    }
    if (typeof v.currency !== 'string' || v.currency.length < 3 || v.currency.length > 5) {
      throw new ValidationError('currency must be a valid code (3-5 chars)', 'currency');
    }
  }

  get id(): CartIdVO { return this.value.id; }
  get status(): CartStatusVO { return this.value.status; }
  get type(): CartTypeVO { return this.value.type; }
  get itemCount(): number { return this.value.itemCount; }
  get currency(): string { return this.value.currency; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isActive(): boolean { return this.status.isActiveStatus(); }
  isFinal(): boolean { return this.status.isFinal(); }
  isEmpty(): boolean { return this.itemCount === 0; }
  isGuest(): boolean { return this.type.isGuest(); }
  isUser(): boolean { return this.type.isUser(); }
}
