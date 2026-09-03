/**
 * Base Domain Event
 * ডোমেইন ইভেন্টের বেস ক্লাস
 */
export abstract class DomainEvent {
  protected _eventId: string;
  protected _occurredOn: Date;
  protected _aggregateId?: string;

  constructor(aggregateId?: string) {
    this._eventId = crypto.randomUUID();
    this._occurredOn = new Date();
    this._aggregateId = aggregateId;
  }

  get eventId(): string {
    return this._eventId;
  }

  get occurredOn(): Date {
    return this._occurredOn;
  }

  get aggregateId(): string | undefined {
    return this._aggregateId;
  }

  abstract get eventName(): string;
  abstract toPrimitives(): Record<string, unknown>;
  abstract fromPrimitives(data: Record<string, unknown>): DomainEvent;
}

export interface DomainEventSubscriber<T extends DomainEvent = DomainEvent> {
  handle(event: T): Promise<void>;
  subscribedTo(): string[];
}

export interface DomainEventPublisher {
  publish(event: DomainEvent): Promise<void>;
  publishAll(events: DomainEvent[]): Promise<void>;
}
