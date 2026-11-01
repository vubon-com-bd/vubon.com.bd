/**
 * VendorReturnPolicyPrismaMapper — row ↔ domain entity
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import { VendorReturnPolicyEntity } from '../../../../domain/entities/vendor-return-policy.entity.js';
import { VendorReturnPolicyVO } from '../../../../domain/value-objects/composites/vendor-return-policy.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { ReturnPolicyTypeVO } from '../../../../domain/value-objects/primitives/return-policy-type.vo.js';

export interface VendorReturnPolicyPrismaRow {
  id: string;
  vendorId: string;
  type: string;
  windowDays: number;
  isFreeReturn: boolean;
  restockFeePercent: unknown;
  requireReason: boolean;
  requireImages: boolean;
  maxImages: number;
  autoApprove: boolean;
  approvalSlaHours: number;
  excludedCategories: unknown;
  notes: string | null;
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

export class VendorReturnPolicyPrismaMapper {
  static toDomain(raw: VendorReturnPolicyPrismaRow): VendorReturnPolicyEntity {
    const vo = VendorReturnPolicyVO.reconstitute({
      vendorId: VendorIdVO.reconstitute(raw.vendorId),
      type: ReturnPolicyTypeVO.reconstitute(raw.type),
      windowDays: raw.windowDays,
      isFreeReturn: raw.isFreeReturn,
      restockFeePercent: toNum(raw.restockFeePercent),
      requireReason: raw.requireReason,
      requireImages: raw.requireImages,
      maxImages: raw.maxImages,
      autoApprove: raw.autoApprove,
      approvalSlaHours: raw.approvalSlaHours,
      excludedCategories: Array.isArray(raw.excludedCategories)
        ? (raw.excludedCategories as string[])
        : [],
      notes: raw.notes ?? undefined,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
    });

    return VendorReturnPolicyEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      props: { vo },
    });
  }

  static toPersistence(entity: VendorReturnPolicyEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      vendorId: vo.vendorId.value,
      type: vo.type.value,
      windowDays: vo.windowDays,
      isFreeReturn: vo.isFreeReturn,
      restockFeePercent: vo.restockFeePercent,
      requireReason: vo.requireReason,
      requireImages: vo.requireImages,
      maxImages: vo.maxImages,
      autoApprove: vo.autoApprove,
      approvalSlaHours: vo.approvalSlaHours,
      excludedCategories: [...vo.excludedCategories],
      notes: vo.notes ?? null,
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
