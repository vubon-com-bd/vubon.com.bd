/**
 * VendorSuspensionPrismaMapper — row ↔ domain entity
 * @module vendor-service/infrastructure/persistence/prisma/mappers
 */
import { VendorSuspensionEntity } from '../../../../domain/entities/vendor-suspension.entity.js';
import { VendorSuspensionVO } from '../../../../domain/value-objects/composites/vendor-suspension.vo.js';
import { SuspensionIdVO } from '../../../../domain/value-objects/primitives/suspension-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { SuspensionStatusVO } from '../../../../domain/value-objects/primitives/suspension-status.vo.js';
import { SuspensionReasonVO } from '../../../../domain/value-objects/primitives/suspension-reason.vo.js';

export interface VendorSuspensionPrismaRow {
  id: string;
  vendorId: string;
  status: string;
  reason: string;
  description: string | null;
  suspendedAt: Date;
  suspendedBy: string;
  durationDays: number | null;
  liftedAt: Date | null;
  liftedBy: string | null;
  liftReason: string | null;
  appealDeadline: Date | null;
  appealNotes: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const toIso = (d: Date | null): string | undefined =>
  d ? new Date(d).toISOString() : undefined;

export class VendorSuspensionPrismaMapper {
  static toDomain(raw: VendorSuspensionPrismaRow): VendorSuspensionEntity {
    const vo = VendorSuspensionVO.reconstitute({
      id: SuspensionIdVO.reconstitute(raw.id),
      vendorId: VendorIdVO.reconstitute(raw.vendorId),
      status: SuspensionStatusVO.reconstitute(raw.status),
      reason: SuspensionReasonVO.reconstitute(raw.reason),
      description: raw.description ?? undefined,
      suspendedAt: new Date(raw.suspendedAt).toISOString(),
      suspendedBy: raw.suspendedBy,
      durationDays: raw.durationDays ?? undefined,
      liftedAt: toIso(raw.liftedAt),
      liftedBy: raw.liftedBy ?? undefined,
      liftReason: raw.liftReason ?? undefined,
      appealDeadline: toIso(raw.appealDeadline),
      appealNotes: raw.appealNotes ?? undefined,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
    });

    return VendorSuspensionEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      props: { vo },
    });
  }

  static toPersistence(entity: VendorSuspensionEntity): Record<string, unknown> {
    const vo = entity.vo;
    return {
      id: entity.id,
      vendorId: vo.vendorId.value,
      status: vo.status.value,
      reason: vo.reason.value,
      description: vo.description ?? null,
      suspendedAt: new Date(vo.suspendedAt),
      suspendedBy: vo.suspendedBy,
      durationDays: vo.durationDays ?? null,
      liftedAt: vo.liftedAt ? new Date(vo.liftedAt) : null,
      liftedBy: vo.liftedBy ?? null,
      liftReason: vo.liftReason ?? null,
      appealDeadline: vo.appealDeadline ? new Date(vo.appealDeadline) : null,
      appealNotes: vo.appealNotes ?? null,
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }
}
