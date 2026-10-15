/**
 * CartTax Domain Events
 * @module cart-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { CART_AGGREGATE_TYPE, newEventId, nowTimestamp } from './event.helpers.js';

export const CART_TAX_EVENT_TYPE = {
  CALCULATED: 'cart.cart_tax.calculated',
  RECALCULATED: 'cart.cart_tax.recalculated',
  REMOVED: 'cart.cart_tax.removed',
} as const;

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

function buildParams<TType extends string, TPayload>(
  type: TType,
  p: EventParams<TPayload>,
) {
  return {
    id: p.id ?? newEventId(),
    type,
    aggregateId: p.aggregateId,
    aggregateType: CART_AGGREGATE_TYPE.CART_TAX,
    payload: p.payload,
    occurredAt: p.occurredAt ?? nowTimestamp(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class CartTaxCalculatedEvent extends BaseDomainEvent<
  typeof CART_TAX_EVENT_TYPE.CALCULATED,
  { cartId: string; taxId: string; rate: number; amount: number; currency: string }
> {
  constructor(
    p: EventParams<{
      cartId: string;
      taxId: string;
      rate: number;
      amount: number;
      currency: string;
    }>,
  ) {
    super(buildParams(CART_TAX_EVENT_TYPE.CALCULATED, p));
  }
}

export class CartTaxRecalculatedEvent extends BaseDomainEvent<
  typeof CART_TAX_EVENT_TYPE.RECALCULATED,
  { cartId: string; taxId: string; oldAmount: number; newAmount: number }
> {
  constructor(
    p: EventParams<{
      cartId: string;
      taxId: string;
      oldAmount: number;
      newAmount: number;
    }>,
  ) {
    super(buildParams(CART_TAX_EVENT_TYPE.RECALCULATED, p));
  }
}

export class CartTaxRemovedEvent extends BaseDomainEvent<
  typeof CART_TAX_EVENT_TYPE.REMOVED,
  { cartId: string; taxId: string; reason?: string }
> {
  constructor(
    p: EventParams<{ cartId: string; taxId: string; reason?: string }>,
  ) {
    super(buildParams(CART_TAX_EVENT_TYPE.REMOVED, p));
  }
}
