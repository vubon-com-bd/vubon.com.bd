/**
 * VendorStatsAggregatorService
 * @module vendor-service/domain/services
 *
 * Pure aggregation helpers over raw events / orders.
 */
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface RawOrder {
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
  readonly status: 'placed' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  readonly createdAt: string;
  readonly deliveredAt?: string;
}

export interface RawPayout {
  readonly amount: number;
  readonly currency: string;
  readonly paidAt: string;
}

export interface RawRefund {
  readonly amount: number;
  readonly currency: string;
  readonly createdAt: string;
}

export interface StatsSnapshot {
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly totalOrders: number;
  readonly deliveredOrders: number;
  readonly cancelledOrders: number;
  readonly totalRevenue: number;
  readonly totalRefunds: number;
  readonly netRevenue: number;
  readonly totalPayouts: number;
  readonly averageOrderValue: number;
  readonly currency: string;
}

export interface TrendResult {
  readonly current: number;
  readonly previous: number;
  readonly deltaPercent: number;
  readonly direction: 'up' | 'down' | 'flat';
}

export class VendorStatsAggregatorService {
  /** Filter orders to those within a date range (inclusive start, exclusive end). */
  static filterByRange<T extends { createdAt: string }>(
    items: readonly T[],
    from: string,
    to: string,
  ): readonly T[] {
    const fromMs = Date.parse(from);
    const toMs = Date.parse(to);
    if (Number.isNaN(fromMs) || Number.isNaN(toMs)) {
      throw new ValidationError('Invalid date range', 'range');
    }
    return items.filter((i) => {
      const t = Date.parse(i.createdAt);
      return t >= fromMs && t < toMs;
    });
  }

  /** Sum revenue from non-cancelled orders. */
  static sumRevenue(orders: readonly RawOrder[]): number {
    let sum = 0;
    for (const o of orders) {
      if (o.status === 'cancelled' || o.status === 'refunded') continue;
      sum += o.amount;
    }
    return Math.round(sum * 100) / 100;
  }

  /** Sum refunds. */
  static sumRefunds(refunds: readonly RawRefund[]): number {
    let sum = 0;
    for (const r of refunds) sum += r.amount;
    return Math.round(sum * 100) / 100;
  }

  /** Sum payouts. */
  static sumPayouts(payouts: readonly RawPayout[]): number {
    let sum = 0;
    for (const p of payouts) sum += p.amount;
    return Math.round(sum * 100) / 100;
  }

  /** Compute full snapshot for a period. */
  static computeSnapshot(params: {
    orders: readonly RawOrder[];
    refunds: readonly RawRefund[];
    payouts: readonly RawPayout[];
    periodStart: string;
    periodEnd: string;
    currency: string;
  }): StatsSnapshot {
    const orders = VendorStatsAggregatorService.filterByRange(
      params.orders,
      params.periodStart,
      params.periodEnd,
    );
    const refunds = VendorStatsAggregatorService.filterByRange(
      params.refunds,
      params.periodStart,
      params.periodEnd,
    );
    const payouts = VendorStatsAggregatorService.filterByRange(
      params.payouts.map((p) => ({ ...p, createdAt: p.paidAt })),
      params.periodStart,
      params.periodEnd,
    );

    const delivered = orders.filter((o) => o.status === 'delivered').length;
    const cancelled = orders.filter((o) => o.status === 'cancelled').length;
    const totalRevenue = VendorStatsAggregatorService.sumRevenue(orders);
    const totalRefunds = VendorStatsAggregatorService.sumRefunds(refunds);
    const netRevenue = Math.round((totalRevenue - totalRefunds) * 100) / 100;
    const totalPayouts = VendorStatsAggregatorService.sumPayouts(payouts);
    const activeOrders = orders.filter((o) => o.status !== 'cancelled').length;
    const averageOrderValue = activeOrders === 0
      ? 0
      : Math.round((totalRevenue / activeOrders) * 100) / 100;

    return {
      periodStart: params.periodStart,
      periodEnd: params.periodEnd,
      totalOrders: orders.length,
      deliveredOrders: delivered,
      cancelledOrders: cancelled,
      totalRevenue,
      totalRefunds,
      netRevenue,
      totalPayouts,
      averageOrderValue,
      currency: params.currency.toUpperCase(),
    };
  }

  /** Compare two periods to compute trend. */
  static trend(current: number, previous: number): TrendResult {
    if (!Number.isFinite(current) || !Number.isFinite(previous)) {
      throw new ValidationError('Values must be numeric', 'trend');
    }
    const delta = current - previous;
    let deltaPercent = 0;
    if (previous !== 0) {
      deltaPercent = Math.round((delta / Math.abs(previous)) * 10000) / 100;
    }
    const direction: TrendResult['direction'] =
      Math.abs(deltaPercent) < 1 ? 'flat' : deltaPercent > 0 ? 'up' : 'down';
    return { current, previous, deltaPercent, direction };
  }

  /** Compute fulfillment rate. */
  static fulfillmentRate(snapshot: StatsSnapshot): number {
    if (snapshot.totalOrders === 0) return 0;
    return Math.round((snapshot.deliveredOrders / snapshot.totalOrders) * 100) / 100;
  }

  /** Compute cancellation rate. */
  static cancellationRate(snapshot: StatsSnapshot): number {
    if (snapshot.totalOrders === 0) return 0;
    return Math.round((snapshot.cancelledOrders / snapshot.totalOrders) * 100) / 100;
  }

  /** Compute refund rate (as % of revenue). */
  static refundRate(snapshot: StatsSnapshot): number {
    if (snapshot.totalRevenue === 0) return 0;
    return Math.round((snapshot.totalRefunds / snapshot.totalRevenue) * 100) / 100;
  }

  /** Compute payout ratio (as % of revenue). */
  static payoutRatio(snapshot: StatsSnapshot): number {
    if (snapshot.totalRevenue === 0) return 0;
    return Math.round((snapshot.totalPayouts / snapshot.totalRevenue) * 100) / 100;
  }

  /** Daily breakdown for charting. */
  static dailyBreakdown(
    orders: readonly RawOrder[],
    from: string,
    to: string,
  ): ReadonlyArray<{ date: string; orders: number; revenue: number }> {
    const fromMs = Date.parse(from);
    const toMs = Date.parse(to);
    const buckets = new Map<string, { orders: number; revenue: number }>();
    let cursor = new Date(fromMs);
    while (cursor.getTime() < toMs) {
      const key = cursor.toISOString().slice(0, 10);
      buckets.set(key, { orders: 0, revenue: 0 });
      cursor = new Date(cursor.getTime() + 24 * 60 * 60 * 1000);
    }
    for (const o of orders) {
      const t = Date.parse(o.createdAt);
      if (t < fromMs || t >= toMs) continue;
      const key = new Date(t).toISOString().slice(0, 10);
      const b = buckets.get(key) ?? { orders: 0, revenue: 0 };
      b.orders += 1;
      if (o.status !== 'cancelled' && o.status !== 'refunded') b.revenue += o.amount;
      buckets.set(key, b);
    }
    return [...buckets.entries()]
      .map(([date, v]) => ({ date, orders: v.orders, revenue: Math.round(v.revenue * 100) / 100 }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  /** Aggregate across multiple snapshots (e.g. vendors). */
  static merge(snapshots: readonly StatsSnapshot[]): StatsSnapshot | null {
    if (snapshots.length === 0) return null;
    const first = snapshots[0]!;
    let totalOrders = 0;
    let deliveredOrders = 0;
    let cancelledOrders = 0;
    let totalRevenue = 0;
    let totalRefunds = 0;
    let netRevenue = 0;
    let totalPayouts = 0;
    for (const s of snapshots) {
      totalOrders += s.totalOrders;
      deliveredOrders += s.deliveredOrders;
      cancelledOrders += s.cancelledOrders;
      totalRevenue += s.totalRevenue;
      totalRefunds += s.totalRefunds;
      netRevenue += s.netRevenue;
      totalPayouts += s.totalPayouts;
    }
    const activeOrders = totalOrders - cancelledOrders;
    return {
      periodStart: first.periodStart,
      periodEnd: first.periodEnd,
      totalOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      totalRefunds: Math.round(totalRefunds * 100) / 100,
      netRevenue: Math.round(netRevenue * 100) / 100,
      totalPayouts: Math.round(totalPayouts * 100) / 100,
      averageOrderValue: activeOrders === 0 ? 0 : Math.round((totalRevenue / activeOrders) * 100) / 100,
      currency: first.currency,
    };
  }
}
