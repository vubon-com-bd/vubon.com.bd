import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'Checkout';

export class CheckoutStartedEvent extends BaseDomainEvent<
  'checkout.started',
  { checkoutId: string; customerId: string }
> {
  constructor(aggregateId: string, checkoutId: string, customerId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'checkout.started',
      aggregateId,
      aggregateType: AGG,
      payload: { checkoutId, customerId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class CheckoutAddressSelectedEvent extends BaseDomainEvent<
  'checkout.address.selected',
  { checkoutId: string; addressId: string }
> {
  constructor(aggregateId: string, checkoutId: string, addressId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'checkout.address.selected',
      aggregateId,
      aggregateType: AGG,
      payload: { checkoutId, addressId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class CheckoutShippingSelectedEvent extends BaseDomainEvent<
  'checkout.shipping.selected',
  { checkoutId: string; methodId: string }
> {
  constructor(aggregateId: string, checkoutId: string, methodId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'checkout.shipping.selected',
      aggregateId,
      aggregateType: AGG,
      payload: { checkoutId, methodId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class CheckoutPaymentSelectedEvent extends BaseDomainEvent<
  'checkout.payment.selected',
  { checkoutId: string; paymentMethod: string }
> {
  constructor(aggregateId: string, checkoutId: string, paymentMethod: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'checkout.payment.selected',
      aggregateId,
      aggregateType: AGG,
      payload: { checkoutId, paymentMethod },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class CheckoutCompletedEvent extends BaseDomainEvent<
  'checkout.completed',
  { checkoutId: string; orderId: string }
> {
  constructor(aggregateId: string, checkoutId: string, orderId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'checkout.completed',
      aggregateId,
      aggregateType: AGG,
      payload: { checkoutId, orderId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class CheckoutAbandonedEvent extends BaseDomainEvent<
  'checkout.abandoned',
  { checkoutId: string; reason: string }
> {
  constructor(aggregateId: string, checkoutId: string, reason: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'checkout.abandoned',
      aggregateId,
      aggregateType: AGG,
      payload: { checkoutId, reason },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
