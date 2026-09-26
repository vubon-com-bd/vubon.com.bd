/**
 * Base Domain Event
 * @module shared-kernel/domain/base
 *
 * Values আসে shared-types/common/primitives থেকে (type only)।
 */
import type { Timestamp } from '@vubon/shared-types/common';

export interface DomainEventMetadata {
  readonly correlationId?: string;
  readonly causationId?: string;
  readonly userId?: string;
  readonly source?: string;
}

export interface DomainEvent<TType extends string = string, TPayload = unknown> {
  readonly id: string;
  readonly type: TType;
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: TPayload;
  readonly occurredAt: Timestamp;
  readonly version: number;
  readonly metadata?: DomainEventMetadata;
}

export interface EventEnvelope<TEvent extends DomainEvent = DomainEvent> {
  readonly event: TEvent;
  readonly publishedAt: Timestamp;
  readonly retryCount: number;
}

export abstract class BaseDomainEvent<
  TType extends string = string,
  TPayload = unknown,
> implements DomainEvent<TType, TPayload> {
  readonly id: string;
  readonly type: TType;
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: TPayload;
  readonly occurredAt: Timestamp;
  readonly version: number;
  readonly metadata?: DomainEventMetadata;

  protected constructor(params: {
    id: string;
    type: TType;
    aggregateId: string;
    aggregateType: string;
    payload: TPayload;
    occurredAt: Timestamp;
    version: number;
    metadata?: DomainEventMetadata;
  }) {
    this.id = params.id;
    this.type = params.type;
    this.aggregateId = params.aggregateId;
    this.aggregateType = params.aggregateType;
    this.payload = params.payload;
    this.occurredAt = params.occurredAt;
    this.version = params.version;
    this.metadata = params.metadata;
    Object.freeze(this);
  }
}
