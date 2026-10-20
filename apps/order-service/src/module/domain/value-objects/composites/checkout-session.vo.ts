/**
 * CheckoutSessionVO — Composite Value Object
 * @module order-service/domain/value-objects/composites
 *
 * Multi-step checkout state with snapshot of selected options.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { CheckoutIdVO } from '../primitives/checkout-id.vo.js';
import { CheckoutStatusVO } from '../primitives/checkout-status.vo.js';
import { CheckoutStepVO } from '../primitives/checkout-step.vo.js';
import { ShippingAddressIdVO } from '../primitives/shipping-address-id.vo.js';
import { DeliveryMethodIdVO } from '../primitives/delivery-method-id.vo.js';

export interface CheckoutSessionVOProps {
  readonly checkoutId: CheckoutIdVO;
  readonly status: CheckoutStatusVO;
  readonly currentStep: CheckoutStepVO;
  readonly shippingAddressId?: ShippingAddressIdVO;
  readonly deliveryMethodId?: DeliveryMethodIdVO;
  readonly paymentMethod?: string;
  readonly startedAt: string;
  readonly lastActivityAt: string;
}

export class CheckoutSessionVO extends BaseVO<CheckoutSessionVOProps> {
  private constructor(props: CheckoutSessionVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: CheckoutSessionVOProps): CheckoutSessionVO {
    const vo = new CheckoutSessionVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: CheckoutSessionVOProps): CheckoutSessionVO {
    return new CheckoutSessionVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.paymentMethod !== undefined && v.paymentMethod.trim().length === 0) {
      throw new ValidationError('paymentMethod cannot be empty string', 'paymentMethod');
    }
  }

  // ═══ Getters ═══
  get checkoutId(): CheckoutIdVO { return this.value.checkoutId; }
  get status(): CheckoutStatusVO { return this.value.status; }
  get currentStep(): CheckoutStepVO { return this.value.currentStep; }
  get shippingAddressId(): ShippingAddressIdVO | undefined { return this.value.shippingAddressId; }
  get deliveryMethodId(): DeliveryMethodIdVO | undefined { return this.value.deliveryMethodId; }
  get paymentMethod(): string | undefined { return this.value.paymentMethod; }
  get startedAt(): string { return this.value.startedAt; }
  get lastActivityAt(): string { return this.value.lastActivityAt; }

  // ═══ Business methods ═══
  hasShippingAddress(): boolean { return this.shippingAddressId !== undefined; }
  hasDeliveryMethod(): boolean { return this.deliveryMethodId !== undefined; }
  hasPaymentMethod(): boolean { return this.paymentMethod !== undefined; }

  canComplete(): boolean {
    return this.hasShippingAddress() && this.hasDeliveryMethod() && this.hasPaymentMethod();
  }
}
