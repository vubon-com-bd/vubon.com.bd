/**
 * Voucher domain events
 * @module cart-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { VOUCHER_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const VOUCHER_EVENT_TYPE = {
  APPLIED: 'cart.voucher.applied',
  REMOVED: 'cart.voucher.removed',
  REDEEMED: 'cart.voucher.redeemed',
  REJECTED: 'cart.voucher.rejected',
} as const;

export interface VoucherAppliedPayload {
  readonly cartId: string;
  readonly code: string;
  readonly amount: number;
  readonly currency: string;
  readonly appliedBy?: string;
}

export interface VoucherRemovedPayload {
  readonly cartId: string;
  readonly code: string;
  readonly removedBy?: string;
  readonly reason?: string;
}

export interface VoucherRedeemedPayload {
  readonly cartId: string;
  readonly code: string;
  readonly redeemedAmount: number;
  readonly remainingAmount: number;
  readonly currency: string;
}

export interface VoucherRejectedPayload {
  readonly cartId: string;
  readonly code: string;
  readonly reason: string;
  readonly errorCode: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

export class VoucherAppliedEvent extends BaseDomainEvent<
  typeof VOUCHER_EVENT_TYPE.APPLIED,
  VoucherAppliedPayload
> {
  constructor(p: EventParams<VoucherAppliedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: VOUCHER_EVENT_TYPE.APPLIED,
      aggregateId: p.aggregateId,
      aggregateType: VOUCHER_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class VoucherRemovedEvent extends BaseDomainEvent<
  typeof VOUCHER_EVENT_TYPE.REMOVED,
  VoucherRemovedPayload
> {
  constructor(p: EventParams<VoucherRemovedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: VOUCHER_EVENT_TYPE.REMOVED,
      aggregateId: p.aggregateId,
      aggregateType: VOUCHER_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class VoucherRedeemedEvent extends BaseDomainEvent<
  typeof VOUCHER_EVENT_TYPE.REDEEMED,
  VoucherRedeemedPayload
> {
  constructor(p: EventParams<VoucherRedeemedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: VOUCHER_EVENT_TYPE.REDEEMED,
      aggregateId: p.aggregateId,
      aggregateType: VOUCHER_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class VoucherRejectedEvent extends BaseDomainEvent<
  typeof VOUCHER_EVENT_TYPE.REJECTED,
  VoucherRejectedPayload
> {
  constructor(p: EventParams<VoucherRejectedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: VOUCHER_EVENT_TYPE.REJECTED,
      aggregateId: p.aggregateId,
      aggregateType: VOUCHER_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}
