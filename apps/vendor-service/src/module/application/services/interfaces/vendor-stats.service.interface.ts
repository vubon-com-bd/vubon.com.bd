/**
 * IVendorStatsService
 * @module vendor-service/application/services/interfaces
 */
export const VENDOR_STATS_SERVICE = Symbol('VENDOR_STATS_SERVICE');

export interface VendorStatsDto {
  readonly id: string;
  readonly vendorId: string;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly totalProducts: number;
  readonly totalOrders: number;
  readonly totalRevenue: number;
  readonly totalCommission: number;
  readonly totalPayout: number;
  readonly totalRefund: number;
  readonly totalCancelled: number;
  readonly currency: string;
  readonly cancellationRate: number;
  readonly refundRate: number;
  readonly payoutRatio: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface IVendorStatsService {
  initializePeriod(vendorId: string, periodStart: string, periodEnd: string, currency: string, actorId?: string): Promise<VendorStatsDto>;
  recordOrder(vendorId: string, amount: number, actorId?: string): Promise<VendorStatsDto>;
  recordRefund(vendorId: string, amount: number, actorId?: string): Promise<VendorStatsDto>;
  recordPayout(vendorId: string, amount: number, actorId?: string): Promise<VendorStatsDto>;
  recordCancellation(vendorId: string, actorId?: string): Promise<VendorStatsDto>;
  getLatestByVendorId(vendorId: string): Promise<VendorStatsDto | null>;
  listByVendor(vendorId: string): Promise<readonly VendorStatsDto[]>;
}
