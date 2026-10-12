/**
 * VendorReturnPolicyPrismaMapper
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import type { VendorReturnPolicy as PrismaVendorReturnPolicy } from '@prisma/client';
import { VendorReturnPolicyEntity } from '../../../../domain/entities/vendor-return-policy.entity.js';
import { ReturnTypeVO } from '../../../../domain/value-objects/primitives/return-type.vo.js';
import { ReturnWindowDaysVO } from '../../../../domain/value-objects/primitives/return-window-days.vo.js';
import { ReturnPolicyNoteVO } from '../../../../domain/value-objects/primitives/return-policy-note.vo.js';

export class VendorReturnPolicyPrismaMapper {
  static toDomain(row: PrismaVendorReturnPolicy): VendorReturnPolicyEntity {
    return VendorReturnPolicyEntity.reconstitute({
      id: row.id,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      deletedAt: row.deletedAt?.toISOString() ?? null,
      props: {
        vendorId: row.vendorId,
        type: ReturnTypeVO.create(row.type),
        window: ReturnWindowDaysVO.create(row.windowDays),
        freeReturn: row.freeReturn,
        restockFeePercent: Number(row.restockFeePercent),
        requireReason: row.requireReason,
        requireImages: row.requireImages,
        maxImages: row.maxImages,
        autoApprove: row.autoApprove,
        approvalSlaHours: row.approvalSlaHours,
        exclusions: row.exclusions,
        note: row.notes ? ReturnPolicyNoteVO.create(row.notes) : undefined,
      },
    });
  }

  static toPersistence(entity: VendorReturnPolicyEntity): Record<string, unknown> {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      type: entity.type.value,
      windowDays: entity.window.days,
      freeReturn: entity.freeReturn,
      restockFeePercent: entity.restockFeePercent,
      requireReason: entity.requireReason,
      requireImages: entity.requireImages,
      maxImages: entity.maxImages,
      autoApprove: entity.autoApprove,
      approvalSlaHours: entity.approvalSlaHours,
      exclusions: [...entity.exclusions],
      notes: entity.note?.value,
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
