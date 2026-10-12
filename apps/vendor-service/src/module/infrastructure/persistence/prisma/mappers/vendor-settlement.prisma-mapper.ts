/**
 * VendorSettlementPrismaMapper
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import type { VendorSettlement as PrismaVendorSettlement } from '@prisma/client';
import { VendorSettlementEntity } from '../../../../domain/entities/vendor-settlement.entity.js';
import type { SettlementStatus } from '../../../../domain/entities/vendor-settlement.entity.js';
import { SettlementAmountVO } from '../../../../domain/value-objects/primitives/settlement-amount.vo.js';
import { CommissionAmountVO } from '../../../../domain/value-objects/primitives/commission-amount.vo.js';

export class VendorSettlementPrismaMapper {
  static toDomain(row: PrismaVendorSettlement): VendorSettlementEntity {
    return VendorSettlementEntity.reconstitute({
      id: row.id,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      deletedAt: row.deletedAt?.toISOString() ?? null,
      version: row.version,
      props: {
        vendorId: row.vendorId,
        settlementNumber: row.settlementNumber,
        status: row.status as SettlementStatus,
        grossAmount: SettlementAmountVO.create(Number(row.grossAmount), row.currency),
        commissionAmount: CommissionAmountVO.create(Number(row.commissionAmount), row.currency),
        netAmount: SettlementAmountVO.create(Number(row.netAmount), row.currency),
        periodStart: row.periodStart.toISOString(),
        periodEnd: row.periodEnd.toISOString(),
        orderCount: row.orderCount,
        payoutId: row.payoutId ?? undefined,
        processedAt: row.processedAt?.toISOString(),
        notes: row.notes ?? undefined,
      },
    });
  }

  static toPersistence(entity: VendorSettlementEntity): Record<string, unknown> {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      settlementNumber: entity.settlementNumber,
      status: entity.status,
      grossAmount: entity.grossAmount.amount,
      commissionAmount: entity.commissionAmount.amount,
      netAmount: entity.netAmount.amount,
      currency: entity.grossAmount.currency,
      periodStart: new Date(entity.periodStart),
      periodEnd: new Date(entity.periodEnd),
      orderCount: entity.orderCount,
      payoutId: entity.payoutId,
      processedAt: entity.processedAt ? new Date(entity.processedAt) : null,
      notes: entity.notes,
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
