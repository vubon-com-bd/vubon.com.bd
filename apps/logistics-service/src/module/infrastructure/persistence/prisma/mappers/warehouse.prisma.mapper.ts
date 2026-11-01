import { WarehouseEntity } from '@domain/entities/warehouse.entity';
import { WarehouseCodeVO } from '@domain/value-objects/primitives/warehouse-code.vo';
import { WarehouseNameVO } from '@domain/value-objects/primitives/warehouse-name.vo';
import { WarehouseStatusVO } from '@domain/value-objects/primitives/warehouse-status.vo';

const toNum = (v: unknown): number | undefined => {
  if (v === null || v === undefined) return undefined;
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (typeof v === 'object' && 'toNumber' in v) return (v as { toNumber: () => number }).toNumber();
  return Number(v);
};
const toIso = (d: Date | null | undefined): string | undefined => d ? new Date(d).toISOString() : undefined;

export interface LogisticsWarehouseRow {
  id: string; code: string; name: string; type: string; status: string;
  address: string; contactName: string | null; contactPhone: string | null; contactEmail: string | null;
  managerId: string | null; capacityM3: unknown; capacityKg: unknown; usedCapacityM3: unknown; usedCapacityKg: unknown;
  maxSkus: number | null; zone: string; operatingHoursStart: number | null; operatingHoursEnd: number | null;
  timezone: string; isDefault: boolean; version: number; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  activatedAt: Date | null; deactivatedAt: Date | null; maintenanceStartedAt: Date | null; maintenanceEndedAt: Date | null;
  fullMarkedAt: Date | null; closedAt: Date | null; archivedAt: Date | null; reason: string | null; metadata: unknown;
}

export class WarehousePrismaMapper {
  static toDomain(raw: LogisticsWarehouseRow): WarehouseEntity {
    return WarehouseEntity.reconstitute({
      id: raw.id, createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        code: WarehouseCodeVO.reconstitute(raw.code), name: WarehouseNameVO.reconstitute(raw.name),
        type: raw.type, status: WarehouseStatusVO.reconstitute(raw.status), address: raw.address,
        contactName: raw.contactName ?? undefined, contactPhone: raw.contactPhone ?? undefined,
        contactEmail: raw.contactEmail ?? undefined, managerId: raw.managerId ?? undefined,
        capacityM3: toNum(raw.capacityM3), capacityKg: toNum(raw.capacityKg),
        usedCapacityM3: toNum(raw.usedCapacityM3), usedCapacityKg: toNum(raw.usedCapacityKg),
        maxSkus: raw.maxSkus ?? undefined, zone: raw.zone,
        operatingHoursStart: raw.operatingHoursStart ?? undefined,
        operatingHoursEnd: raw.operatingHoursEnd ?? undefined, timezone: raw.timezone, isDefault: raw.isDefault,
        activatedAt: toIso(raw.activatedAt), deactivatedAt: toIso(raw.deactivatedAt),
        maintenanceStartedAt: toIso(raw.maintenanceStartedAt), maintenanceEndedAt: toIso(raw.maintenanceEndedAt),
        fullMarkedAt: toIso(raw.fullMarkedAt), closedAt: toIso(raw.closedAt), archivedAt: toIso(raw.archivedAt),
        reason: raw.reason ?? undefined, metadata: raw.metadata as Readonly<Record<string, unknown>> | undefined,
      },
    });
  }
  static toPersistence(entity: WarehouseEntity): Record<string, unknown> {
    return {
      id: entity.id, code: entity.code.value, name: entity.name.value,
      type: entity.type, status: entity.status.value, address: entity.address,
      contactName: entity.contactName ?? null, contactPhone: entity.contactPhone ?? null,
      contactEmail: entity.contactEmail ?? null, managerId: entity.managerId ?? null,
      capacityM3: entity.capacityM3 ?? null, capacityKg: entity.capacityKg ?? null,
      usedCapacityM3: entity.usedCapacityM3 ?? null, usedCapacityKg: entity.usedCapacityKg ?? null,
      maxSkus: entity.maxSkus ?? null, zone: entity.zone,
      operatingHoursStart: entity.operatingHoursStart ?? null, operatingHoursEnd: entity.operatingHoursEnd ?? null,
      timezone: entity.timezone, isDefault: entity.isDefault,
      activatedAt: entity.activatedAt ? new Date(entity.activatedAt) : null,
      deactivatedAt: entity.deactivatedAt ? new Date(entity.deactivatedAt) : null,
      maintenanceStartedAt: entity.maintenanceStartedAt ? new Date(entity.maintenanceStartedAt) : null,
      maintenanceEndedAt: entity.maintenanceEndedAt ? new Date(entity.maintenanceEndedAt) : null,
      fullMarkedAt: entity.fullMarkedAt ? new Date(entity.fullMarkedAt) : null,
      closedAt: entity.closedAt ? new Date(entity.closedAt) : null,
      archivedAt: entity.archivedAt ? new Date(entity.archivedAt) : null,
      reason: entity.reason ?? null, metadata: entity.metadata ?? null,
      version: entity.version, updatedAt: new Date(entity.updatedAt),
    };
  }
}
