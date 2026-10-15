/**
 * Voucher Domain Events
 * @module cart-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { CART_AGGREGATE_TYPE, newEventId, nowTimestamp } from './event.helpers.js';

export const VOUCHER_EVENT_TYPE = {
  APPLIED: 'cart.voucher.applied',
  REMOVED: 'cart.voucher.removed',
  REDEEMED: 'cart.voucher.redeemed',
  REJECTED: 'cart.voucher.rejected',
} as const;

export interface VoucherAppliedPayload {
  readonly cartId: string;
  readonly voucherCode: string;
  readonly appliedAmount: number;
  readonly currency: string;
  readonly appliedAt: string;
}

export interface VoucherRedeemedPayload {
  readonly cartId: string;
  readonly voucherCode: string;
  readonly redeemedAmount: number;
  readonly remainingAmount: number;
}

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
    aggregateType: CART_AGGREGATE_TYPE.VOUCHER,
    payload: p.payload,
    occurredAt: p.occurredAt ?? nowTimestamp(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class VoucherAppliedEvent extends BaseDomainEvent<
  typeof VOUCHER_EVENT_TYPE.APPLIED,
  VoucherAppliedPayload
> {
  constructor(p: EventParams<VoucherAppliedPayload>) {
    super(buildParams(VOUCHER_EVENT_TYPE.APPLIED, p));
  }
}

export class VoucherRemovedEvent extends BaseDomainEvent<
  typeof VOUCHER_EVENT_TYPE.REMOVED,
  { cartId: string; voucherCode: string; reason?: string }
> {
  constructor(p: EventParams<{ cartId: string; voucherCode: string; reason?: string }>) {
    super(buildParams(VOUCHER_EVENT_TYPE.REMOVED, p));
  }
}

export class VoucherRedeemedEvent extends BaseDomainEvent<
  typeof VOUCHER_EVENT_TYPE.REDEEMED,
  VoucherRedeemedPayload
> {
  constructor(p: EventParams<VoucherRedeemedPayload>) {
    super(buildParams(VOUCHER_EVENT_TYPE.REDEEMED, p));
  }
}

export class VoucherRejectedEvent extends BaseDomainEvent<
  typeof VOUCHER_EVENT_TYPE.REJECTED,
  { cartId: string; voucherCode: string; reason: string }
> {
  constructor(p: EventParams<{ cartId: string; voucherCode: string; reason: string }>) {
    super(buildParams(VOUCHER_EVENT_TYPE.REJECTED, p));
  }
}
