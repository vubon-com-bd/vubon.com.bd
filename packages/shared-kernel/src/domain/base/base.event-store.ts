import { DomainEvent } from './base.event';

/**
 * Event Store Interface
 * ইভেন্ট স্টোর ইন্টারফেস
 */
export interface IEventStore {
  append(event: DomainEvent): Promise<void>;
  appendAll(events: DomainEvent[]): Promise<void>;
  getEvents(aggregateId: string): Promise<DomainEvent[]>;
  getEventsByType(eventType: string): Promise<DomainEvent[]>;
  getEventsByDateRange(startDate: Date, endDate: Date): Promise<DomainEvent[]>;
  getAllEvents(): Promise<DomainEvent[]>;
  getLatestEvents(limit: number): Promise<DomainEvent[]>;
  getEventCount(aggregateId: string): Promise<number>;
  getTotalEventCount(): Promise<number>;
  deleteEvents(aggregateId: string): Promise<void>;
}

export interface IEventStoreWithSnapshot<T> extends IEventStore {
  saveSnapshot(aggregateId: string, snapshot: T): Promise<void>;
  getSnapshot(aggregateId: string): Promise<T | null>;
  deleteSnapshot(aggregateId: string): Promise<void>;
}

export interface IEventStoreWithProjection {
  projectEvents(aggregateId: string, projectionName: string): Promise<unknown>;
  rebuildProjection(projectionName: string): Promise<void>;
}
