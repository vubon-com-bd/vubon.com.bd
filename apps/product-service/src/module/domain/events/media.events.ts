/**
 * Media domain events
 * @module product-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { MEDIA_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const MEDIA_EVENT_TYPE = {
  ADDED: 'media.added',
  REMOVED: 'media.removed',
  REORDERED: 'media.reordered',
  PRIMARY_SET: 'media.primary_set',
} as const;

export interface MediaAddedPayload {
  readonly mediaId: string;
  readonly productId: string;
  readonly type: 'image' | 'video' | 'document';
  readonly url: string;
  readonly sortOrder: number;
}

export interface MediaRemovedPayload {
  readonly mediaId: string;
  readonly productId: string;
  readonly removedBy: string;
}

export interface MediaReorderedPayload {
  readonly productId: string;
  readonly orderedIds: readonly string[];
  readonly reorderedBy: string;
}

export interface MediaPrimarySetPayload {
  readonly mediaId: string;
  readonly productId: string;
  readonly previousMediaId?: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

export class MediaAddedEvent extends BaseDomainEvent<
  typeof MEDIA_EVENT_TYPE.ADDED,
  MediaAddedPayload
> {
  constructor(p: EventParams<MediaAddedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: MEDIA_EVENT_TYPE.ADDED,
      aggregateId: p.aggregateId,
      aggregateType: MEDIA_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class MediaRemovedEvent extends BaseDomainEvent<
  typeof MEDIA_EVENT_TYPE.REMOVED,
  MediaRemovedPayload
> {
  constructor(p: EventParams<MediaRemovedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: MEDIA_EVENT_TYPE.REMOVED,
      aggregateId: p.aggregateId,
      aggregateType: MEDIA_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class MediaReorderedEvent extends BaseDomainEvent<
  typeof MEDIA_EVENT_TYPE.REORDERED,
  MediaReorderedPayload
> {
  constructor(p: EventParams<MediaReorderedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: MEDIA_EVENT_TYPE.REORDERED,
      aggregateId: p.aggregateId,
      aggregateType: MEDIA_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class MediaPrimarySetEvent extends BaseDomainEvent<
  typeof MEDIA_EVENT_TYPE.PRIMARY_SET,
  MediaPrimarySetPayload
> {
  constructor(p: EventParams<MediaPrimarySetPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: MEDIA_EVENT_TYPE.PRIMARY_SET,
      aggregateId: p.aggregateId,
      aggregateType: MEDIA_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}
