/**
 * Funnel Event Store Interface
 * @module analytics-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base';
import type { FunnelEntity } from '../entities/funnel.entity.js';

export interface FunnelEventStore extends BaseEventStore {
  /** Rebuild FunnelEntity from event stream */
  reconstitute(aggregateId: string): Promise<FunnelEntity | null>;

  /** All analysis events for a funnel */
  loadAnalysisHistory(funnelId: string): Promise<readonly FunnelEntity[]>;

  /** Purge old events */
  purge(cutoff: string): Promise<number>;
}
