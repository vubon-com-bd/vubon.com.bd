/**
 * VendorSettlementPrismaMapper — row ↔ domain entity
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 *
 * Note: Domain VO requires refundAmount & adjustmentAmount fields but DB
 * only stores grossAmount/commissionAmount/netAmount. We default missing
 * amounts to 0 (netAmount = gross - commission + 0 - 0).
 */
import { VendorSettlementEntity } from '../../../../domain/entities/vendor-settlement.entity.js';
import { VendorSettlementVO } from '../../../../domain/value-objects/composites/vendor-settlement.vo.js';
import { SettlementIdVO } from '../../../../domain/value-objects/primitives/settlement-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { SettlementStatusVO } from '../../../../domain/value-objects/primitives/settlement-status.vo.js';

export interface VendorSettlementPrismaRow {
  id: string;
  vendorId: string;
  settlementNumber: string;
  status: string;
  grossAmount: unknown;
  commissionAmount: unknown;
  netAmount: unknown;
  currency: string;
  periodStart: Date;
  periodEnd: Date;
  orderCount: number;
  payoutId: string | null;
  processedAt: Date | null;
  notes: string | null;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const toNum = (v: unknown): number => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (v && typeof v === 'object' && 'toNumber' in v) {
    return (v as { toNumber: () => number }).toNumber();
  }
  return Number(v ?? 0);
};

export class VendorSettlementPrismaMapper {
  static toDomain(raw: VendorSettlementPrismaRow): VendorSettlementEntity {
    const vo = VendorSettlementVO.reconstitute({
      id: SettlementIdVO.reconstitute(raw.id),
      vendorId: VendorIdVO.reconstitute(raw.vendorId),
      status: SettlementStatusVO.reconstitute(raw.status),
      periodStart: new Date(raw.periodStart).toISOString(),
      periodEnd: new Date(raw.periodEnd).toISOString(),
      grossAmount: toNum(raw.grossAmount),
      commissionAmount: toNum(raw.commissionAmount),
      refundAmount: 0,
      adjustmentAmount: 0,
      netAmount: toNum(raw.netAmount),
      currency: raw.currency,
      orderCount: raw.orderCount,
      payoutId: raw.payoutId ?? undefined,
      processedAt: raw.processedAt ? new Date(raw.processedAt).toISOString() : undefined,
      completedAt: raw.status === 'completed' && raw.processedAt
        ? new Date(raw.processedAt).toISOString()
        : undefined,
      failedReason: raw.status === 'failed' ? raw.notes ?? undefined : undefined,
      notes: raw.notes ?? undefined,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
    });

    return VendorSettlementEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      props: { vo },
    });
  }

  static toPersistence(entity: VendorSettlementEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      vendorId: vo.vendorId.value,
      settlementNumber: `ST-${entity.id.slice(0, 8).toUpperCase()}`,
      status: vo.status.value,
      grossAmount: vo.grossAmount,
      commissionAmount: vo.commissionAmount,
      netAmount: vo.netAmount,
      currency: vo.currency,
      periodStart: new Date(vo.periodStart),
      periodEnd: new Date(vo.periodEnd),
      orderCount: vo.orderCount,
      payoutId: vo.payoutId ?? null,
      processedAt: vo.processedAt ? new Date(vo.processedAt) : null,
      notes: vo.notes ?? vo.failedReason ?? null,
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
