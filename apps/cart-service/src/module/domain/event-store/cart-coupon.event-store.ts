/**
 * CartCoupon Event Store Interface
 * @module cart-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { CartCouponEntity } from '../entities/cart-coupon.entity.js';

export const CART_COUPON_EVENT_STORE = Symbol('CART_COUPON_EVENT_STORE');

export interface CartCouponEventStreamStats {
  readonly totalEvents: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface CartCouponSnapshot {
  readonly couponEntityId: string;
  readonly version: number;
  readonly snapshotAt: string;
  readonly payload: Readonly<Record<string, unknown>>;
}

export interface CartCouponEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<CartCouponEntity | null>;

  loadByCartId(cartId: string): Promise<readonly CartCouponEntity[]>;
  loadByCode(code: string): Promise<readonly CartCouponEntity[]>;
  loadByStatus(status: string): Promise<readonly CartCouponEntity[]>;

  loadBetweenVersions(
    aggregateId: string,
    fromVersion: number,
    toVersion: number,
  ): Promise<readonly unknown[]>;

  countByAggregate(aggregateId: string): Promise<number>;
  statistics(): Promise<CartCouponEventStreamStats>;

  saveSnapshot(snapshot: CartCouponSnapshot): Promise<void>;
  loadLatestSnapshot(aggregateId: string): Promise<CartCouponSnapshot | null>;

  purge(cutoff: string): Promise<number>;
}
