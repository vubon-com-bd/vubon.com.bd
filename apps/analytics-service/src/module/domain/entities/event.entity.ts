/**
 * Event Entity (Aggregate Root)
 * @module analytics-service/domain/entities
 *
 * Analytics event-এর aggregate root।
 * Business Rule:
 * - Immutable after creation (event = fact)
 * - Domain events published on process/validate
 * - Lifecycle: received → processed → archived
 * - Cannot be modified after archived
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base';
import type { DomainEvent } from '@vubon/shared-kernel/domain/base';
import { EventIdVO } from '../value-objects/primitives/event-id.vo.js';
import { EventVO } from '../value-objects/composites/event.vo.js';
import { EventReceivedEvent } from '../events/event.events.js';
import { EventProcessedEvent } from '../events/event.events.js';

export type EventStatus = 'received' | 'processed' | 'failed' | 'archived';

export interface EventEntityProps {
  readonly event: EventVO;
  status: EventStatus;
  processedAt?: string | null;
  failureReason?: string | null;
}

export class EventEntity extends AggregateRoot<string> {
  private props: EventEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: EventEntityProps
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  /**
   * Factory: নতুন event received হলে
   */
  static receive(params: {
    event: EventVO;
    now: string;
  }): EventEntity {
    if (!params.event) {
      throw new Error('EventEntity.receive requires event');
    }
    if (!params.now) {
      throw new Error('EventEntity.receive requires now timestamp');
    }

    const entity = new EventEntity(
      params.event.id.value,
      params.now,
      params.now,
      {
        event: params.event,
        status: 'received',
        processedAt: null,
        failureReason: null,
      }
    );

    entity.addDomainEvent(
      new EventReceivedEvent(
        params.event.id.value,
        params.event.name.value,
        params.event.source.value,
        params.now
      )
    );

    entity.incrementVersion();
    return entity;
  }

  /**
   * Reconstitute from persistence (no event publish)
   */
  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: EventEntityProps;
  }): EventEntity {
    return new EventEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props
    );
  }

  get event(): EventVO {
    return this.props.event;
  }

  get status(): EventStatus {
    return this.props.status;
  }

  get processedAt(): string | null | undefined {
    return this.props.processedAt;
  }

  get failureReason(): string | null | undefined {
    return this.props.failureReason;
  }

  isReceived(): boolean {
    return this.props.status === 'received';
  }

  isProcessed(): boolean {
    return this.props.status === 'processed';
  }

  isFailed(): boolean {
    return this.props.status === 'failed';
  }

  isArchived(): boolean {
    return this.props.status === 'archived';
  }

  isTerminal(): boolean {
    return this.props.status === 'processed' || this.props.status === 'failed' || this.props.status === 'archived';
  }

  /**
   * Business Action: Mark as processed
   */
  markProcessed(now: string): void {
    if (!this.isReceived()) {
      throw new Error(
        `Cannot mark processed from status "${this.props.status}"`
      );
    }
    this.props.status = 'processed';
    this.props.processedAt = now;

    this.addDomainEvent(
      new EventProcessedEvent(
        this.id,
        this.props.event.name.value,
        now
      )
    );
    this.incrementVersion();
  }

  /**
   * Business Action: Mark as failed
   */
  markFailed(reason: string, now: string): void {
    if (!this.isReceived()) {
      throw new Error(
        `Cannot mark failed from status "${this.props.status}"`
      );
    }
    if (!reason || reason.trim().length === 0) {
      throw new Error('Failure reason is required');
    }
    this.props.status = 'failed';
    this.props.failureReason = reason.trim();
    this.props.processedAt = now;
    this.incrementVersion();
  }

  /**
   * Business Action: Archive (after retention period)
   */
  archive(now: string): void {
    if (this.isArchived()) {
      throw new Error('Event already archived');
    }
    this.props.status = 'archived';
    this.props.processedAt = this.props.processedAt ?? now;
    this.incrementVersion();
  }

  /**
   * Cross-entity: Same user কিনা
   */
  isSameUserAs(other: EventEntity): boolean {
    return this.props.event.isSameUserAs(other.props.event);
  }

  /**
   * Real-time event কিনা
   */
  isRealTime(): boolean {
    return this.props.event.isRealTime();
  }

  /**
   * Event age in milliseconds
   */
  ageMs(): number {
    return Date.now() - new Date(this.createdAt).getTime();
  }
}
