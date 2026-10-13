/**
 * Product Event Store Interface
 * @module product-service/domain/event-store
 *
 * Event Sourcing support — persist + replay domain events।
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { ProductEntity } from '../entities/product.entity.js';
import type { ProductIdVO } from '../value-objects/primitives/product-id.vo.js';

// ─── DI Token ──────────────────────────────
export const PRODUCT_EVENT_STORE = Symbol('PRODUCT_EVENT_STORE');

export interface ProductEventStoreStats {
  readonly totalEvents: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly distinctAggregates: number;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface ProductEventStore extends BaseEventStore {
  /**
   * Aggregate reconstitute — event stream replay করে Entity তৈরি।
   */
  reconstitute(aggregateId: string): Promise<ProductEntity | null>;

  /**
   * একাধিক aggregate এর সর্বশেষ snapshot-like view।
   */
  loadLatest(limit: number): Promise<readonly ProductEntity[]>;

  /**
   * Vendor এর সব product event stream।
   */
  loadByVendor(vendorId: string): Promise<readonly ProductEntity[]>;

  /**
   * Category অনুযায়ী event stream।
   */
  loadByCategory(categoryId: string): Promise<readonly ProductEntity[]>;

  /**
   * Old events GC।
   */
  purge(cutoff: string): Promise<number>;

  /**
   * Event store statistics।
   */
  statistics(): Promise<ProductEventStoreStats>;

  /**
   * Event count per aggregate।
   */
  countByAggregate(aggregateId: string): Promise<number>;

  /**
   * সব distinct aggregate IDs।
   */
  listAggregateIds(): Promise<readonly string[]>;
}
