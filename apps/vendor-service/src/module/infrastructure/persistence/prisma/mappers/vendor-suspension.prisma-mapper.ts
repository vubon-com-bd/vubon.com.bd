/**
 * VendorSuspensionPrismaMapper
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import type { VendorSuspension as PrismaVendorSuspension } from '@prisma/client';
import { VendorSuspensionEntity } from '../../../../domain/entities/vendor-suspension.entity.js';
import { SuspensionReasonVO } from '../../../../domain/value-objects/primitives/suspension-reason.vo.js';

export class VendorSuspensionPrismaMapper {
  static toDomain(row: PrismaVendorSuspension): VendorSuspensionEntity {
    return VendorSuspensionEntity.reconstitute({
      id: row.id,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      deletedAt: row.deletedAt?.toISOString() ?? null,
      version: row.version,
      props: {
        vendorId: row.vendorId,
        reason: SuspensionReasonVO.create(row.reason),
        suspendedAt: row.suspendedAt.toISOString(),
        suspendedBy: row.suspendedBy,
        durationDays: row.durationDays,
        notes: row.notes ?? undefined,
        appealDeadline: row.appealDeadline?.toISOString(),
        appealSubmittedAt: row.appealSubmittedAt?.toISOString(),
        appealReason: row.appealReason ?? undefined,
        liftedAt: row.liftedAt?.toISOString(),
        liftedBy: row.liftedBy ?? undefined,
        autoLiftOnResolution: row.autoLiftOnResolution,
      },
    });
  }

  static toPersistence(entity: VendorSuspensionEntity): Record<string, unknown> {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      reason: entity.reason.value,
      suspendedAt: new Date(entity.suspendedAt),
      suspendedBy: entity.suspendedBy,
      durationDays: entity.durationDays,
      notes: entity.notes,
      appealDeadline: entity.appealDeadline ? new Date(entity.appealDeadline) : null,
      appealSubmittedAt: entity.appealSubmittedAt ? new Date(entity.appealSubmittedAt) : null,
      appealReason: entity.appealReason,
      liftedAt: entity.liftedAt ? new Date(entity.liftedAt) : null,
      liftedBy: entity.liftedBy,
      autoLiftOnResolution: entity.autoLiftOnResolution,
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
