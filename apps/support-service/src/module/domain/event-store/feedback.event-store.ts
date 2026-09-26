/**
 * FeedbackEventStore — Event sourcing for feedback
 * @module support-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type {
  DomainEvent,
  EventEnvelope,
} from '@vubon/shared-kernel/domain/base/base.event';
import { FeedbackIdVO } from '../value-objects/primitives/feedback-id.vo';

export interface FeedbackEventStore extends BaseEventStore {
  getEvents(feedbackId: FeedbackIdVO): Promise<readonly DomainEvent[]>;
  saveEvents(
    feedbackId: FeedbackIdVO,
    events: readonly DomainEvent[],
    expectedVersion?: number,
  ): Promise<void>;
  getVersionForFeedback(feedbackId: FeedbackIdVO): Promise<number>;
  existsForFeedback(feedbackId: FeedbackIdVO): Promise<boolean>;
  loadStreamForFeedback(
    feedbackId: FeedbackIdVO,
    fromVersion?: number,
  ): Promise<readonly EventEnvelope[]>;
}
