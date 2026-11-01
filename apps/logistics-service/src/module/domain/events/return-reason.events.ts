/**
 * ReturnReason Domain Events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';

import { LOGISTICS_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const RETURN_REASON_EVENT_TYPE = {
  CREATED: 'logistics.return_reason.created',
  ACTIVATED: 'logistics.return_reason.activated',
  DEACTIVATED: 'logistics.return_reason.deactivated',
  UPDATED: 'logistics.return_reason.updated',
} as const;

export interface ReturnReasonCreatedPayload {
  readonly reasonId: string;
  readonly code: string;
  readonly label: string;
  readonly type: string;
  readonly createdAt: string;
}
export interface ReturnReasonActivatedPayload {
  readonly reasonId: string;
  readonly activatedAt: string;
}
export interface ReturnReasonDeactivatedPayload {
  readonly reasonId: string;
  readonly reason?: string;
  readonly deactivatedAt: string;
}
export interface ReturnReasonUpdatedPayload {
  readonly reasonId: string;
  readonly updatedFields: readonly string[];
  readonly updatedAt: string;
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
    aggregateType: LOGISTICS_AGGREGATE_TYPE.RETURN_REASON,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class ReturnReasonCreatedEvent extends BaseDomainEvent<
  typeof RETURN_REASON_EVENT_TYPE.CREATED,
  ReturnReasonCreatedPayload
> {
  constructor(p: EventParams<ReturnReasonCreatedPayload>) {
    super(buildParams(RETURN_REASON_EVENT_TYPE.CREATED, p));
  }
}
export class ReturnReasonActivatedEvent extends BaseDomainEvent<
  typeof RETURN_REASON_EVENT_TYPE.ACTIVATED,
  ReturnReasonActivatedPayload
> {
  constructor(p: EventParams<ReturnReasonActivatedPayload>) {
    super(buildParams(RETURN_REASON_EVENT_TYPE.ACTIVATED, p));
  }
}
export class ReturnReasonDeactivatedEvent extends BaseDomainEvent<
  typeof RETURN_REASON_EVENT_TYPE.DEACTIVATED,
  ReturnReasonDeactivatedPayload
> {
  constructor(p: EventParams<ReturnReasonDeactivatedPayload>) {
    super(buildParams(RETURN_REASON_EVENT_TYPE.DEACTIVATED, p));
  }
}
export class ReturnReasonUpdatedEvent extends BaseDomainEvent<
  typeof RETURN_REASON_EVENT_TYPE.UPDATED,
  ReturnReasonUpdatedPayload
> {
  constructor(p: EventParams<ReturnReasonUpdatedPayload>) {
    super(buildParams(RETURN_REASON_EVENT_TYPE.UPDATED, p));
  }
}
