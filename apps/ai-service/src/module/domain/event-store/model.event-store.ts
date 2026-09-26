import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';

/**
 * Event store contract for Model aggregate.
 * Event-sourcing persistence for ModelEntity lifecycle events.
 */
export type ModelEventStore = BaseEventStore;
