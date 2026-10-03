/**
 * CheckoutEntity — aggregate root for checkout flow
 * @module order-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { CHECKOUT, CHECKOUT_STATUS, CHECKOUT_STEP } from '@vubon/shared-constants/business/checkout';
import { CheckoutIdVO } from '../value-objects/primitives/checkout-id.vo.js';
import { CheckoutStatusVO } from '../value-objects/primitives/checkout-status.vo.js';
import { CheckoutStepVO } from '../value-objects/primitives/checkout-step.vo.js';
import { CustomerIdVO } from '../value-objects/primitives/customer-id.vo.js';
import { ShippingAddressLineVO } from '../value-objects/primitives/shipping-address-line.vo.js';
import { BillingAddressLineVO } from '../value-objects/primitives/billing-address-line.vo.js';
import {
  CheckoutStartedEvent,
  CheckoutAddressSelectedEvent,
  CheckoutShippingSelectedEvent,
  CheckoutPaymentSelectedEvent,
  CheckoutStepChangedEvent,
  CheckoutCompletedEvent,
  CheckoutAbandonedEvent,
  CheckoutExpiredEvent,
} from '../events/checkout.events.js';

export interface CheckoutEntityProps {
  readonly customerId: CustomerIdVO;
  readonly cartId?: string;
  readonly status: CheckoutStatusVO;
  readonly currentStep: CheckoutStepVO;
  readonly type: string;
  readonly currency: string;
  readonly subtotal: number;
  readonly discountAmount: number;
  readonly taxAmount: number;
  readonly shippingAmount: number;
  readonly total: number;
  readonly shippingAddress?: ShippingAddressLineVO;
  readonly billingAddress?: BillingAddressLineVO;
  readonly shippingAddressId?: string;
  readonly billingAddressId?: string;
  readonly shippingMethodId?: string;
  readonly paymentMethod?: string;
  readonly orderId?: string;
  readonly expiresAt: string;
}

export class CheckoutEntity extends AggregateRoot<string> {
  private _status: CheckoutStatusVO;
  private _currentStep: CheckoutStepVO;
  private _shippingAddress?: ShippingAddressLineVO;
  private _billingAddress?: BillingAddressLineVO;
  private _shippingAddressId?: string;
  private _billingAddressId?: string;
  private _shippingMethodId?: string;
  private _paymentMethod?: string;
  private _orderId?: string;
  private _shippingAmount: number;
  private _total: number;
  private readonly _expiresAt: string;

  private readonly _customerId: CustomerIdVO;
  private readonly _cartId?: string;
  private readonly _type: string;
  private readonly _currency: string;
  private readonly _subtotal: number;
  private readonly _discountAmount: number;
  private readonly _taxAmount: number;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: CheckoutEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._customerId = props.customerId;
    this._cartId = props.cartId;
    this._status = props.status;
    this._currentStep = props.currentStep;
    this._type = props.type;
    this._currency = props.currency;
    this._subtotal = props.subtotal;
    this._discountAmount = props.discountAmount;
    this._taxAmount = props.taxAmount;
    this._shippingAmount = props.shippingAmount;
    this._total = props.total;
    this._shippingAddress = props.shippingAddress;
    this._billingAddress = props.billingAddress;
    this._shippingAddressId = props.shippingAddressId;
    this._billingAddressId = props.billingAddressId;
    this._shippingMethodId = props.shippingMethodId;
    this._paymentMethod = props.paymentMethod;
    this._orderId = props.orderId;
    this._expiresAt = props.expiresAt;
  }

  get toIdVO(): CheckoutIdVO { return CheckoutIdVO.reconstitute(this.id); }
  get customerId(): CustomerIdVO { return this._customerId; }
  get cartId(): string | undefined { return this._cartId; }
  get status(): CheckoutStatusVO { return this._status; }
  get currentStep(): CheckoutStepVO { return this._currentStep; }
  get type(): string { return this._type; }
  get currency(): string { return this._currency; }
  get subtotal(): number { return this._subtotal; }
  get discountAmount(): number { return this._discountAmount; }
  get taxAmount(): number { return this._taxAmount; }
  get shippingAmount(): number { return this._shippingAmount; }
  get total(): number { return this._total; }
  get shippingAddress(): ShippingAddressLineVO | undefined { return this._shippingAddress; }
  get billingAddress(): BillingAddressLineVO | undefined { return this._billingAddress; }
  get shippingAddressId(): string | undefined { return this._shippingAddressId; }
  get billingAddressId(): string | undefined { return this._billingAddressId; }
  get shippingMethodId(): string | undefined { return this._shippingMethodId; }
  get paymentMethod(): string | undefined { return this._paymentMethod; }
  get orderId(): string | undefined { return this._orderId; }
  get expiresAt(): string { return this._expiresAt; }

  isExpired(now: Date = new Date()): boolean {
    return now.getTime() > Date.parse(this._expiresAt);
  }

  isReadyToConfirm(): boolean {
    return (
      this._status.isActive() &&
      !this.isExpired() &&
      this._shippingAddress !== undefined &&
      this._shippingMethodId !== undefined &&
      this._paymentMethod !== undefined
    );
  }

  selectAddress(
    shipping: ShippingAddressLineVO,
    billing: BillingAddressLineVO | undefined,
    now: string,
  ): void {
    if (this.isExpired(new Date(now))) {
      throw new BusinessRuleError(`Checkout expired`, 'CHECKOUT_EXPIRED');
    }
    this._shippingAddress = shipping;
    this._billingAddress = billing;
    this._shippingAddressId = 'snapshot';
    this._billingAddressId = billing ? 'snapshot' : undefined;
    this.moveToStep(CHECKOUT_STEP.SHIPPING_METHOD, now);
    this.addDomainEvent(
      new CheckoutAddressSelectedEvent({
        aggregateId: this.id,
        payload: {
          checkoutId: this.id,
          shippingAddressId: this._shippingAddressId,
          billingAddressId: this._billingAddressId,
        },
        version: this.version + 1,
      }),
    );
    this.incrementVersion();
  }

  selectShippingMethod(methodId: string, cost: number, now: string): void {
    if (!this._shippingAddress) {
      throw new BusinessRuleError('Select shipping address first', 'NO_SHIPPING_ADDRESS');
    }
    this._shippingMethodId = methodId;
    this._shippingAmount = Math.max(0, cost);
    this.recalculateTotal();
    this.moveToStep(CHECKOUT_STEP.PAYMENT_METHOD, now);
    this.addDomainEvent(
      new CheckoutShippingSelectedEvent({
        aggregateId: this.id,
        payload: { checkoutId: this.id, shippingMethodId: methodId, shippingCost: cost, currency: this._currency },
        version: this.version + 1,
      }),
    );
    this.incrementVersion();
  }

  selectPaymentMethod(method: string, now: string): void {
    if (!this._shippingMethodId) {
      throw new BusinessRuleError('Select shipping method first', 'NO_SHIPPING_METHOD');
    }
    this._paymentMethod = method;
    this.moveToStep(CHECKOUT_STEP.ORDER_REVIEW, now);
    this.addDomainEvent(
      new CheckoutPaymentSelectedEvent({
        aggregateId: this.id,
        payload: { checkoutId: this.id, paymentMethod: method },
        version: this.version + 1,
      }),
    );
    this.incrementVersion();
  }

  complete(orderId: string, now: string): void {
    if (!this.isReadyToConfirm()) {
      throw new BusinessRuleError(
        'Checkout is not ready to complete',
        'CHECKOUT_NOT_READY',
        { checkoutId: this.id, step: this._currentStep.value },
      );
    }
    this._status = CheckoutStatusVO.create(CHECKOUT_STATUS.COMPLETED);
    this._orderId = orderId;
    this._currentStep = CheckoutStepVO.create(CHECKOUT_STEP.CONFIRMATION);
    this.addDomainEvent(
      new CheckoutCompletedEvent({
        aggregateId: this.id,
        payload: {
          checkoutId: this.id,
          orderId,
          customerId: this._customerId.value,
          total: this._total,
          currency: this._currency,
          completedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  abandon(now: string): void {
    if (this._status.isFinal()) return;
    this._status = CheckoutStatusVO.create(CHECKOUT_STATUS.ABANDONED);
    this.addDomainEvent(
      new CheckoutAbandonedEvent({
        aggregateId: this.id,
        payload: { checkoutId: this.id, abandonedAt: now, lastStep: this._currentStep.value, itemCount: 0 },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  expire(now: string): void {
    if (this._status.isFinal()) return;
    this._status = CheckoutStatusVO.create(CHECKOUT_STATUS.EXPIRED);
    this.addDomainEvent(
      new CheckoutExpiredEvent({
        aggregateId: this.id,
        payload: { checkoutId: this.id, expiredAt: now, lastStep: this._currentStep.value },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private moveToStep(step: string, now: string): void {
    const from = this._currentStep.value;
    if (from === step) return;
    this._currentStep = CheckoutStepVO.create(step);
    this.addDomainEvent(
      new CheckoutStepChangedEvent({
        aggregateId: this.id,
        payload: { checkoutId: this.id, fromStep: from, toStep: step },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private recalculateTotal(): void {
    this._total = Math.round((this._subtotal - this._discountAmount + this._taxAmount + this._shippingAmount) * 100) / 100;
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    props: CheckoutEntityProps;
    now: string;
  }): CheckoutEntity {
    const entity = new CheckoutEntity(params.id, params.now, params.now, params.props);
    entity.addDomainEvent(
      new CheckoutStartedEvent({
        aggregateId: params.id,
        payload: {
          checkoutId: params.id,
          customerId: params.props.customerId.value,
          cartId: params.props.cartId,
          type: params.props.type,
          currency: params.props.currency,
        },
        version: 1,
      }),
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: CheckoutEntityProps;
    version?: number;
  }): CheckoutEntity {
    const entity = new CheckoutEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
