/**
 * CheckoutVO
 * @module order-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CheckoutIdVO } from '../primitives/checkout-id.vo.js';
import { CheckoutStatusVO } from '../primitives/checkout-status.vo.js';
import { CheckoutStepVO } from '../primitives/checkout-step.vo.js';
import { CustomerIdVO } from '../primitives/customer-id.vo.js';
import { ShippingAddressLineVO } from '../primitives/shipping-address-line.vo.js';
import { BillingAddressLineVO } from '../primitives/billing-address-line.vo.js';

export interface CheckoutVOProps {
  readonly id: CheckoutIdVO;
  readonly customerId: CustomerIdVO;
  readonly cartId?: string;
  readonly status: CheckoutStatusVO;
  readonly currentStep: CheckoutStepVO;
  readonly shippingAddress?: ShippingAddressLineVO;
  readonly billingAddress?: BillingAddressLineVO;
  readonly shippingMethodId?: string;
  readonly paymentMethod?: string;
  readonly subtotal: number;
  readonly total: number;
  readonly currency: string;
  readonly expiresAt: string;
}

export class CheckoutVO extends BaseVO<CheckoutVOProps> {
  private constructor(props: CheckoutVOProps) { super(props); }

  static create(props: CheckoutVOProps): CheckoutVO {
    const vo = new CheckoutVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: CheckoutVOProps): CheckoutVO {
    return new CheckoutVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.subtotal < 0 || v.total < 0) {
      throw new ValidationError('Amounts cannot be negative', 'total');
    }
    if (v.currency.length !== 3) {
      throw new ValidationError('Currency must be 3-char code', 'currency');
    }
    if (v.total < v.subtotal) {
      throw new ValidationError('Total cannot be less than subtotal', 'total');
    }
  }

  get id(): CheckoutIdVO { return this.value.id; }
  get customerId(): CustomerIdVO { return this.value.customerId; }
  get cartId(): string | undefined { return this.value.cartId; }
  get status(): CheckoutStatusVO { return this.value.status; }
  get currentStep(): CheckoutStepVO { return this.value.currentStep; }
  get shippingAddress(): ShippingAddressLineVO | undefined { return this.value.shippingAddress; }
  get billingAddress(): BillingAddressLineVO | undefined { return this.value.billingAddress; }
  get shippingMethodId(): string | undefined { return this.value.shippingMethodId; }
  get paymentMethod(): string | undefined { return this.value.paymentMethod; }
  get subtotal(): number { return this.value.subtotal; }
  get total(): number { return this.value.total; }
  get currency(): string { return this.value.currency; }
  get expiresAt(): string { return this.value.expiresAt; }

  isExpired(now: Date = new Date()): boolean {
    return now.getTime() > Date.parse(this.expiresAt);
  }

  hasShippingAddress(): boolean {
    return this.shippingAddress !== undefined;
  }

  hasBillingAddress(): boolean {
    return this.billingAddress !== undefined;
  }

  hasShippingMethod(): boolean {
    return this.shippingMethodId !== undefined;
  }

  hasPaymentMethod(): boolean {
    return this.paymentMethod !== undefined;
  }

  /** Ready to confirm — all required steps done. */
  isReadyToConfirm(): boolean {
    return (
      this.status.isInProgress() &&
      !this.isExpired() &&
      this.hasShippingAddress() &&
      this.hasShippingMethod() &&
      this.hasPaymentMethod()
    );
  }

  /** Steps remaining before confirm. */
  get remainingSteps(): readonly string[] {
    const missing: string[] = [];
    if (!this.hasShippingAddress()) missing.push('shipping_address');
    if (!this.hasShippingMethod()) missing.push('shipping_method');
    if (!this.hasPaymentMethod()) missing.push('payment_method');
    return missing;
  }
}
