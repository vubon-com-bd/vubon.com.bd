/**
 * VendorSuspensionLogPrismaMapper
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import type { VendorSuspensionLog as PrismaVendorSuspensionLog } from '@prisma/client';
import { VendorSuspensionLogEntity } from '../../../../domain/entities/vendor-suspension-log.entity.js';
import type { SuspensionLogEvent } from '../../../../domain/entities/vendor-suspension-log.entity.js';

export class VendorSuspensionLogPrismaMapper {
  static toDomain(row: PrismaVendorSuspensionLog): VendorSuspensionLogEntity {
    return VendorSuspensionLogEntity.reconstitute({
      id: row.id,
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
      deletedAt: row.deletedAt?.toISOString() ?? null,
      props: {
        vendorId: row.vendorId,
        suspensionId: row.suspensionId,
        event: row.event as SuspensionLogEvent,
        actorId: row.actorId,
        reason: row.reason ?? undefined,
        metadata: (row.metadata as Readonly<Record<string, unknown>> | null) ?? undefined,
        occurredAt: row.occurredAt.toISOString(),
      },
    });
  }

  static toPersistence(entity: VendorSuspensionLogEntity): Record<string, unknown> {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      suspensionId: entity.suspensionId,
      event: entity.event,
      actorId: entity.actorId,
      reason: entity.reason,
      metadata: entity.metadata,
      occurredAt: new Date(entity.occurredAt),
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
