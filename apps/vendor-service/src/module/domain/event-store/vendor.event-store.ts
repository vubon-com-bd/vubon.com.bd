import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';

/**
 * Event store contract for Vendor aggregate.
 * Event-sourcing persistence for Vendor lifecycle events.
 */
export type VendorEventStore = BaseEventStore;
