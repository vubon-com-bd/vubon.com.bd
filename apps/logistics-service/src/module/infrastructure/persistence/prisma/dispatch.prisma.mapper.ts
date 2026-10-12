import { DispatchEntity } from '../../../domain/entities/dispatch.entity.js';
import { DispatchIdVO } from '../../../domain/value-objects/primitives/dispatch-id.vo.js';
import { DispatchNumberVO } from '../../../domain/value-objects/primitives/dispatch-number.vo.js';
import { DispatchStatusVO } from '../../../domain/value-objects/primitives/dispatch-status.vo.js';
import { DispatchTypeVO } from '../../../domain/value-objects/primitives/dispatch-type.vo.js';
import { CourierIdVO } from '../../../domain/value-objects/primitives/courier-id.vo.js';
import { VehicleIdVO } from '../../../domain/value-objects/primitives/vehicle-id.vo.js';
import { DriverIdVO } from '../../../domain/value-objects/primitives/driver-id.vo.js';
import { WarehouseIdVO } from '../../../domain/value-objects/primitives/warehouse-id.vo.js';
import { WeightKgVO } from '../../../domain/value-objects/primitives/weight-kg.vo.js';
import { NotesVO } from '../../../domain/value-objects/primitives/notes.vo.js';

export interface PrismaDispatchRow {
  id: string; dispatchNumber: string; status: string; type: string;
  shipmentIds: string[];
  courierId: string | null; vehicleId: string | null; driverId: string | null; warehouseId: string | null;
  manifestUrl: string | null; itemCount: number; totalWeight: unknown;
  dispatchedAt: Date | null; estimatedArrivalAt: Date | null;
  deliveredAt: Date | null; cancelledAt: Date | null; notes: string | null;
  version: number; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
}

const toNum = (v: unknown): number => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (v && typeof v === 'object' && 'toNumber' in v && typeof (v as { toNumber: () => number }).toNumber === 'function') {
    return (v as { toNumber: () => number }).toNumber();
  }
  return Number(v);
};
const toIso = (d: Date | null): string | undefined => d ? new Date(d).toISOString() : undefined;

export class DispatchPrismaMapper {
  static toDomain(raw: PrismaDispatchRow): DispatchEntity {
    return DispatchEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        dispatchNumber: DispatchNumberVO.reconstitute(raw.dispatchNumber),
        status: DispatchStatusVO.reconstitute(raw.status),
        type: DispatchTypeVO.reconstitute(raw.type),
        shipmentIds: raw.shipmentIds,
        courierId: raw.courierId ? CourierIdVO.reconstitute(raw.courierId) : undefined,
        vehicleId: raw.vehicleId ? VehicleIdVO.reconstitute(raw.vehicleId) : undefined,
        driverId: raw.driverId ? DriverIdVO.reconstitute(raw.driverId) : undefined,
        warehouseId: raw.warehouseId ? WarehouseIdVO.reconstitute(raw.warehouseId) : undefined,
        manifestUrl: raw.manifestUrl ?? undefined,
        itemCount: raw.itemCount,
        totalWeight: raw.totalWeight !== null ? WeightKgVO.reconstitute(toNum(raw.totalWeight)) : undefined,
        dispatchedAt: toIso(raw.dispatchedAt),
        estimatedArrivalAt: toIso(raw.estimatedArrivalAt),
        deliveredAt: toIso(raw.deliveredAt),
        cancelledAt: toIso(raw.cancelledAt),
        notes: raw.notes ? NotesVO.reconstitute(raw.notes) : undefined,
      },
    });
  }

  static toPersistence(entity: DispatchEntity): Record<string, unknown> {
    return {
      id: entity.id,
      dispatchNumber: entity.dispatchNumber.value,
      status: entity.status.value,
      type: entity.type.value,
      shipmentIds: [...entity.shipmentIds],
      courierId: entity.courierId?.value ?? null,
      vehicleId: entity.vehicleId?.value ?? null,
      driverId: entity.driverId?.value ?? null,
      warehouseId: entity.warehouseId?.value ?? null,
      manifestUrl: entity.manifestUrl ?? null,
      itemCount: entity.itemCount,
      totalWeight: entity.totalWeight?.value ?? null,
      dispatchedAt: entity.dispatchedAt ? new Date(entity.dispatchedAt) : null,
      estimatedArrivalAt: entity.estimatedArrivalAt ? new Date(entity.estimatedArrivalAt) : null,
      deliveredAt: entity.deliveredAt ? new Date(entity.deliveredAt) : null,
      cancelledAt: entity.cancelledAt ? new Date(entity.cancelledAt) : null,
      notes: entity.notes?.value ?? null,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
