/**
 * Cart tax domain events
 * @module cart-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { CART_TAX_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const CART_TAX_EVENT_TYPE = {
  CALCULATED: 'cart.tax.calculated',
} as const;

export interface TaxCalculatedPayload {
  readonly cartId: string;
  readonly taxId: string;
  readonly rate: number;
  readonly taxAmount: number;
  readonly currency: string;
  readonly inclusive: boolean;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

export class TaxCalculatedEvent extends BaseDomainEvent<
  typeof CART_TAX_EVENT_TYPE.CALCULATED,
  TaxCalculatedPayload
> {
  constructor(p: EventParams<TaxCalculatedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CART_TAX_EVENT_TYPE.CALCULATED,
      aggregateId: p.aggregateId,
      aggregateType: CART_TAX_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}
