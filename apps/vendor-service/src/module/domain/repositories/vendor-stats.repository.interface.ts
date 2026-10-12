/**
 * VendorStatsRepository — period-based stats snapshots
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorStatsEntity } from '../entities/vendor-stats.entity.js';

export const VENDOR_STATS_REPOSITORY = Symbol('VENDOR_STATS_REPOSITORY');

export interface VendorStatsRepository extends BaseRepository<VendorStatsEntity, string> {
  findByVendorId(vendorId: string): Promise<readonly VendorStatsEntity[]>;
  findLatestByVendorId(vendorId: string): Promise<VendorStatsEntity | null>;

  /** Stats snapshot covering a specific date. */
  findByVendorIdAndDate(vendorId: string, at: Date): Promise<VendorStatsEntity | null>;
  /** Stats in a date range. */
  findByVendorIdBetween(vendorId: string, from: string, to: string): Promise<readonly VendorStatsEntity[]>;

  /** Top vendors by revenue in a period. */
  findTopByRevenue(from: string, to: string, limit: number): Promise<readonly VendorStatsEntity[]>;
  /** Vendors with declining orders (comparison periods). */
  findDecliningVendors(from: string, to: string, minDeclinePercent: number): Promise<readonly VendorStatsEntity[]>;
  /** Vendors with high cancellation rate. */
  findHighCancellationRate(threshold: number): Promise<readonly VendorStatsEntity[]>;
  /** Vendors with high refund rate. */
  findHighRefundRate(threshold: number): Promise<readonly VendorStatsEntity[]>;

  /** Aggregate revenue across all vendors in a period. */
  sumRevenueBetween(from: string, to: string): Promise<number>;
  /** Aggregate commission across all vendors in a period. */
  sumCommissionBetween(from: string, to: string): Promise<number>;
  /** Aggregate payout across all vendors in a period. */
  sumPayoutBetween(from: string, to: string): Promise<number>;

  upsert(entity: VendorStatsEntity): Promise<VendorStatsEntity>;
  deleteByVendorId(vendorId: string): Promise<void>;
}
