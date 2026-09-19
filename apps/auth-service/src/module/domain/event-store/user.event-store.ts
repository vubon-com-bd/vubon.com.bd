import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';

/**
 * Event store contract for User aggregate.
 * Event-sourcing persistence for UserEntity lifecycle events.
 */
export type UserEventStore = BaseEventStore;
