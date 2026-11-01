import { DispatchEntity } from '@domain/entities/dispatch.entity';
import { DispatchNumberVO } from '@domain/value-objects/primitives/dispatch-number.vo';
import { DispatchStatusVO } from '@domain/value-objects/primitives/dispatch-status.vo';
import { DispatchTypeVO } from '@domain/value-objects/primitives/dispatch-type.vo';

const toNum = (v: unknown): number | undefined => {
  if (v === null || v === undefined) return undefined;
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (typeof v === 'object' && 'toNumber' in v) return (v as { toNumber: () => number }).toNumber();
  return Number(v);
};
const toIso = (d: Date | null | undefined): string | undefined => d ? new Date(d).toISOString() : undefined;

export interface LogisticsDispatchRow {
  id: string; dispatchNumber: string; status: string; type: string;
  shipmentIds: string[]; courierId: string | null; vehicleId: string | null; driverId: string | null;
  warehouseId: string | null; manifestUrl: string | null; itemCount: number; totalWeight: unknown;
  dispatchedAt: Date | null; estimatedArrivalAt: Date | null; deliveredAt: Date | null; cancelledAt: Date | null;
  notes: string | null; version: number; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  inTransitAt: Date | null; returnedAt: Date | null; failedAt: Date | null;
  failureReason: string | null; cancelReason: string | null; returnReason: string | null; metadata: unknown;
}

export class DispatchPrismaMapper {
  static toDomain(raw: LogisticsDispatchRow): DispatchEntity {
    return DispatchEntity.reconstitute({
      id: raw.id, createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        dispatchNumber: DispatchNumberVO.reconstitute(raw.dispatchNumber),
        status: DispatchStatusVO.reconstitute(raw.status),
        type: DispatchTypeVO.reconstitute(raw.type),
        shipmentIds: raw.shipmentIds, courierId: raw.courierId ?? undefined,
        vehicleId: raw.vehicleId ?? undefined, driverId: raw.driverId ?? undefined,
        warehouseId: raw.warehouseId ?? undefined, manifestUrl: raw.manifestUrl ?? undefined,
        totalWeight: toNum(raw.totalWeight),
        dispatchedAt: toIso(raw.dispatchedAt), inTransitAt: toIso(raw.inTransitAt),
        estimatedArrivalAt: toIso(raw.estimatedArrivalAt),
        deliveredAt: toIso(raw.deliveredAt), failedAt: toIso(raw.failedAt),
        returnedAt: toIso(raw.returnedAt), cancelledAt: toIso(raw.cancelledAt),
        failureReason: raw.failureReason ?? undefined, cancelReason: raw.cancelReason ?? undefined,
        returnReason: raw.returnReason ?? undefined, notes: raw.notes ?? undefined,
        metadata: raw.metadata as Readonly<Record<string, unknown>> | undefined,
      },
    });
  }
  static toPersistence(entity: DispatchEntity): Record<string, unknown> {
    return {
      id: entity.id, dispatchNumber: entity.dispatchNumber.value,
      status: entity.status.value, type: entity.type.value,
      shipmentIds: entity.shipmentIds, courierId: entity.courierId ?? null,
      vehicleId: entity.vehicleId ?? null, driverId: entity.driverId ?? null,
      warehouseId: entity.warehouseId ?? null, manifestUrl: entity.manifestUrl ?? null,
      totalWeight: entity.totalWeight ?? null,
      dispatchedAt: entity.dispatchedAt ? new Date(entity.dispatchedAt) : null,
      inTransitAt: entity.inTransitAt ? new Date(entity.inTransitAt) : null,
      estimatedArrivalAt: entity.estimatedArrivalAt ? new Date(entity.estimatedArrivalAt) : null,
      deliveredAt: entity.deliveredAt ? new Date(entity.deliveredAt) : null,
      failedAt: entity.failedAt ? new Date(entity.failedAt) : null,
      returnedAt: entity.returnedAt ? new Date(entity.returnedAt) : null,
      cancelledAt: entity.cancelledAt ? new Date(entity.cancelledAt) : null,
      failureReason: entity.failureReason ?? null, cancelReason: entity.cancelReason ?? null,
      returnReason: entity.returnReason ?? null, notes: entity.notes ?? null,
      metadata: entity.metadata ?? null, version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
