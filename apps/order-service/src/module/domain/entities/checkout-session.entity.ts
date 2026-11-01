/**
 * CheckoutSessionEntity — Child of Checkout aggregate
 * @module order-service/domain/entities
 *
 * ⚠️ BaseEntity-তে version নেই।
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { CheckoutSessionVO } from '../value-objects/composites/checkout-session.vo.js';
import { CheckoutStepVO } from '../value-objects/primitives/checkout-step.vo.js';
import { ShippingAddressIdVO } from '../value-objects/primitives/shipping-address-id.vo.js';
import { DeliveryMethodIdVO } from '../value-objects/primitives/delivery-method-id.vo.js';

export class CheckoutSessionEntity extends BaseEntity<string> {
  private _vo: CheckoutSessionVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    vo: CheckoutSessionVO,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = vo;
  }

  // ═══ Getters ═══
  get vo(): CheckoutSessionVO { return this._vo; }
  get checkoutId(): CheckoutSessionVO['checkoutId'] { return this._vo.checkoutId; }
  get currentStep(): CheckoutStepVO { return this._vo.currentStep; }

  // ═══ Business methods ═══
  setShippingAddress(
    shippingAddressId: ShippingAddressIdVO,
    now: string = new Date().toISOString(),
  ): void {
    this._vo = CheckoutSessionVO.create({ ...this._vo.value, shippingAddressId });
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  setDeliveryMethod(
    deliveryMethodId: DeliveryMethodIdVO,
    now: string = new Date().toISOString(),
  ): void {
    this._vo = CheckoutSessionVO.create({ ...this._vo.value, deliveryMethodId });
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  setPaymentMethod(paymentMethod: string, now: string = new Date().toISOString()): void {
    if (!paymentMethod || paymentMethod.trim().length === 0) {
      throw new ValidationError('paymentMethod cannot be empty', 'paymentMethod');
    }
    this._vo = CheckoutSessionVO.create({
      ...this._vo.value,
      paymentMethod: paymentMethod.trim(),
    });
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: CheckoutSessionVO;
    now: string;
  }): CheckoutSessionEntity {
    return new CheckoutSessionEntity(params.id, params.now, params.now, params.vo, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    vo: CheckoutSessionVO;
  }): CheckoutSessionEntity {
    return new CheckoutSessionEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.vo,
      params.deletedAt ?? null,
    );
  }
}
