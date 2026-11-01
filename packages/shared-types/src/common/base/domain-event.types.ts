/**
 * Domain Event Types
 * @module shared-types/common/base
 *
 * Domain event — aggregate-এর state change notification।
 */

export interface DomainEvent<TType extends string = string, TPayload = unknown> {
  readonly id: string;
  readonly type: TType;
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: TPayload;
  readonly occurredAt: string;
  readonly version: number;
  readonly metadata?: EventMetadata;
}

export interface EventMetadata {
  readonly correlationId?: string;
  readonly causationId?: string;
  readonly userId?: string;
  readonly source?: string;
}

export interface EventEnvelope<TEvent extends DomainEvent = DomainEvent> {
  readonly event: TEvent;
  readonly publishedAt: string;
  readonly retryCount: number;
}
