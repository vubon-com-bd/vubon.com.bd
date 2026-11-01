/**
 * CourierPrismaMapper — Row ↔ Domain Entity
 * @module logistics-service/infrastructure/persistence/prisma/mappers
 */
import { CourierEntity } from '@domain/entities/courier.entity';
import { CourierNameVO } from '@domain/value-objects/primitives/courier-name.vo';
import { CourierStatusVO } from '@domain/value-objects/primitives/courier-status.vo';
import { CourierTypeVO } from '@domain/value-objects/primitives/courier-type.vo';

const toIso = (d: Date | null | undefined): string | undefined =>
  d ? new Date(d).toISOString() : undefined;

export interface LogisticsCourierRow {
  id: string; code: string; name: string; displayName: string;
  type: string; status: string;
  logoUrl: string | null; website: string | null;
  contactPhone: string | null; contactEmail: string | null;
  trackingUrlTemplate: string | null;
  apiEnabled: boolean; coverageZones: string[];
  supportsCOD: boolean; supportsInsurance: boolean; supportsInternational: boolean;
  averageDeliveryDays: number; isDefault: boolean; priority: number;
  version: number; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  activatedAt: Date | null; deactivatedAt: Date | null;
  suspendedAt: Date | null; terminatedAt: Date | null;
  suspendReason: string | null; terminateReason: string | null; deactivateReason: string | null;
  metadata: unknown;
}

export class CourierPrismaMapper {
  static toDomain(raw: LogisticsCourierRow): CourierEntity {
    return CourierEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        code: raw.code,
        name: CourierNameVO.reconstitute(raw.name),
        displayName: raw.displayName,
        status: CourierStatusVO.reconstitute(raw.status),
        type: CourierTypeVO.reconstitute(raw.type),
        logoUrl: raw.logoUrl ?? undefined,
        website: raw.website ?? undefined,
        contactPhone: raw.contactPhone ?? undefined,
        contactEmail: raw.contactEmail ?? undefined,
        trackingUrlTemplate: raw.trackingUrlTemplate ?? undefined,
        apiEnabled: raw.apiEnabled,
        coverageZones: raw.coverageZones,
        supportsCOD: raw.supportsCOD,
        supportsInsurance: raw.supportsInsurance,
        supportsInternational: raw.supportsInternational,
        averageDeliveryDays: raw.averageDeliveryDays,
        isDefault: raw.isDefault,
        priority: raw.priority,
        activatedAt: toIso(raw.activatedAt),
        deactivatedAt: toIso(raw.deactivatedAt),
        suspendedAt: toIso(raw.suspendedAt),
        terminatedAt: toIso(raw.terminatedAt),
        suspendReason: raw.suspendReason ?? undefined,
        terminateReason: raw.terminateReason ?? undefined,
        deactivateReason: raw.deactivateReason ?? undefined,
        metadata: raw.metadata as Readonly<Record<string, unknown>> | undefined,
      },
    });
  }

  static toPersistence(entity: CourierEntity): Record<string, unknown> {
    return {
      id: entity.id,
      code: entity.code,
      name: entity.name.value,
      displayName: entity.displayName,
      status: entity.status.value,
      type: entity.type.value,
      logoUrl: entity.logoUrl ?? null,
      website: entity.website ?? null,
      contactPhone: entity.contactPhone ?? null,
      contactEmail: entity.contactEmail ?? null,
      trackingUrlTemplate: entity.trackingUrlTemplate ?? null,
      apiEnabled: entity.apiEnabled,
      coverageZones: entity.coverageZones ?? [],
      supportsCOD: entity.supportsCOD,
      supportsInsurance: entity.supportsInsurance,
      supportsInternational: entity.supportsInternational,
      averageDeliveryDays: entity.averageDeliveryDays,
      isDefault: entity.isDefault,
      priority: entity.priority,
      activatedAt: entity.activatedAt ? new Date(entity.activatedAt) : null,
      deactivatedAt: entity.deactivatedAt ? new Date(entity.deactivatedAt) : null,
      suspendedAt: entity.suspendedAt ? new Date(entity.suspendedAt) : null,
      terminatedAt: entity.terminatedAt ? new Date(entity.terminatedAt) : null,
      suspendReason: entity.suspendReason ?? null,
      terminateReason: entity.terminateReason ?? null,
      deactivateReason: entity.deactivateReason ?? null,
      metadata: entity.metadata ?? null,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
