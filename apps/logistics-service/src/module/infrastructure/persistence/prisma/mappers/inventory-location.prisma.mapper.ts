import { InventoryLocationEntity } from '@domain/entities/inventory-location.entity';
import { InventoryLocationStatusVO } from '@domain/value-objects/primitives/inventory-location-status.vo';

const toNum = (v: unknown): number | undefined => {
  if (v === null || v === undefined) return undefined;
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (typeof v === 'object' && 'toNumber' in v) return (v as { toNumber: () => number }).toNumber();
  return Number(v);
};
const toIso = (d: Date | null | undefined): string | undefined => d ? new Date(d).toISOString() : undefined;

export interface LogisticsInventoryLocationRow {
  id: string; warehouseId: string; code: string; name: string; zone: string;
  aisle: string | null; rack: string | null; shelf: string | null; bin: string | null;
  barcode: string | null; maxCapacityKg: unknown; maxCapacityM3: unknown;
  currentKg: unknown; currentM3: unknown; status: string;
  isActive: boolean; isQuarantine: boolean; isPickable: boolean; priority: number;
  version: number; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  activatedAt: Date | null; deactivatedAt: Date | null; archivedAt: Date | null;
  quarantinedAt: Date | null; reason: string | null; maxCapacityM: unknown; metadata: unknown;
}

export class InventoryLocationPrismaMapper {
  static toDomain(raw: LogisticsInventoryLocationRow): InventoryLocationEntity {
    return InventoryLocationEntity.reconstitute({
      id: raw.id, createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        warehouseId: raw.warehouseId, code: raw.code as never, name: raw.name as never, zone: raw.zone,
        aisle: raw.aisle ?? undefined, rack: raw.rack ?? undefined,
        shelf: raw.shelf ?? undefined, bin: raw.bin ?? undefined, barcode: raw.barcode ?? undefined,
        maxCapacityKg: toNum(raw.maxCapacityKg) ?? toNum(raw.maxCapacityM),
        maxCapacityM3: toNum(raw.maxCapacityM3),
        currentKg: toNum(raw.currentKg) ?? 0, currentM3: toNum(raw.currentM3) ?? 0,
        status: InventoryLocationStatusVO.reconstitute(raw.status),
        isQuarantine: raw.isQuarantine, isPickable: raw.isPickable, priority: raw.priority,
        activatedAt: toIso(raw.activatedAt), deactivatedAt: toIso(raw.deactivatedAt),
        archivedAt: toIso(raw.archivedAt), quarantinedAt: toIso(raw.quarantinedAt),
        reason: raw.reason ?? undefined,
        metadata: raw.metadata as Readonly<Record<string, unknown>> | undefined,
      },
    });
  }
  static toPersistence(entity: InventoryLocationEntity): Record<string, unknown> {
    return {
      id: entity.id, warehouseId: entity.warehouseId, code: entity.code as never, name: entity.name as never, zone: entity.zone,
      aisle: entity.aisle ?? null, rack: entity.rack ?? null, shelf: entity.shelf ?? null, bin: entity.bin ?? null,
      barcode: entity.barcode ?? null,
      maxCapacityKg: entity.maxCapacityKg ?? null, maxCapacityM3: entity.maxCapacityM3 ?? null,
      currentKg: entity.currentKg, currentM3: entity.currentM3,
      status: entity.status.value, isActive: entity.status.value === 'active',
      isQuarantine: entity.isQuarantine, isPickable: entity.isPickable, priority: entity.priority,
      activatedAt: entity.activatedAt ? new Date(entity.activatedAt) : null,
      deactivatedAt: entity.deactivatedAt ? new Date(entity.deactivatedAt) : null,
      archivedAt: entity.archivedAt ? new Date(entity.archivedAt) : null,
      quarantinedAt: entity.quarantinedAt ? new Date(entity.quarantinedAt) : null,
      reason: entity.reason ?? null, metadata: entity.metadata ?? null,
      version: entity.version, updatedAt: new Date(entity.updatedAt),
    };
  }
}
