/**
 * VendorStatsPrismaMapper
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import type { VendorStats as PrismaVendorStats } from '@prisma/client';
import { VendorStatsEntity } from '../../../../domain/entities/vendor-stats.entity.js';

export class VendorStatsPrismaMapper {
  static toDomain(row: PrismaVendorStats): VendorStatsEntity {
    return VendorStatsEntity.reconstitute({
      id: row.id,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      deletedAt: row.deletedAt?.toISOString() ?? null,
      props: {
        vendorId: row.vendorId,
        periodStart: row.periodStart.toISOString(),
        periodEnd: row.periodEnd.toISOString(),
        totalProducts: row.totalProducts,
        totalOrders: row.totalOrders,
        totalRevenue: Number(row.totalRevenue),
        totalCommission: Number(row.totalCommission),
        totalPayout: Number(row.totalPayout),
        totalRefund: Number(row.totalRefund),
        totalCancelled: row.totalCancelled,
        averageOrderValue: Number(row.averageOrderValue),
        currency: row.currency,
      },
    });
  }

  static toPersistence(entity: VendorStatsEntity): Record<string, unknown> {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      periodStart: new Date(entity.periodStart),
      periodEnd: new Date(entity.periodEnd),
      totalProducts: entity.totalProducts,
      totalOrders: entity.totalOrders,
      totalRevenue: entity.totalRevenue,
      totalCommission: entity.totalCommission,
      totalPayout: entity.totalPayout,
      totalRefund: entity.totalRefund,
      totalCancelled: entity.totalCancelled,
      averageOrderValue: entity.averageOrderValue,
      currency: entity.currency,
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
