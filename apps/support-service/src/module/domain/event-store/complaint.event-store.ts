/**
 * ComplaintEventStore — Event sourcing for complaints
 * @module support-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type {
  DomainEvent,
  EventEnvelope,
} from '@vubon/shared-kernel/domain/base/base.event';
import { ComplaintIdVO } from '../value-objects/primitives/complaint-id.vo';

export interface ComplaintEventStore extends BaseEventStore {
  getEvents(complaintId: ComplaintIdVO): Promise<readonly DomainEvent[]>;
  saveEvents(
    complaintId: ComplaintIdVO,
    events: readonly DomainEvent[],
    expectedVersion?: number,
  ): Promise<void>;
  getVersionForComplaint(complaintId: ComplaintIdVO): Promise<number>;
  existsForComplaint(complaintId: ComplaintIdVO): Promise<boolean>;
  loadStreamForComplaint(
    complaintId: ComplaintIdVO,
    fromVersion?: number,
  ): Promise<readonly EventEnvelope[]>;
}
