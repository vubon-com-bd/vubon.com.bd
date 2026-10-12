import { RouteEntity } from '../../../domain/entities/route.entity.js';
import { RouteIdVO } from '../../../domain/value-objects/primitives/route-id.vo.js';
import { RouteCodeVO } from '../../../domain/value-objects/primitives/route-code.vo.js';
import { RouteStatusVO } from '../../../domain/value-objects/primitives/route-status.vo.js';
import { RouteTypeVO } from '../../../domain/value-objects/primitives/route-type.vo.js';
import { RouteOptimizationVO } from '../../../domain/value-objects/primitives/route-optimization.vo.js';
import { DistanceKmVO } from '../../../domain/value-objects/primitives/distance-km.vo.js';
import { DurationMinutesVO } from '../../../domain/value-objects/primitives/duration-minutes.vo.js';
import { WarehouseIdVO } from '../../../domain/value-objects/primitives/warehouse-id.vo.js';
import { VehicleIdVO } from '../../../domain/value-objects/primitives/vehicle-id.vo.js';
import { DriverIdVO } from '../../../domain/value-objects/primitives/driver-id.vo.js';
import { RouteStopVO } from '../../../domain/value-objects/composites/route-stop.vo.js';

export interface PrismaRouteRow {
  id: string; name: string; code: string; type: string; status: string; optimization: string;
  totalDistanceKm: unknown; totalDurationMinutes: number | null;
  warehouseId: string | null; vehicleId: string | null; driverId: string | null;
  scheduledDate: Date; startedAt: Date | null; completedAt: Date | null;
  isOptimized: boolean; isRecurring: boolean; recurrenceRule: string | null;
  stops: unknown;
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

export class RoutePrismaMapper {
  static toDomain(raw: PrismaRouteRow): RouteEntity {
    const stops = Array.isArray(raw.stops)
      ? (raw.stops as ReadonlyArray<Record<string, unknown>>).map((s) =>
          RouteStopVO.reconstitute({
            id: String(s['id']),
            order: Number(s['order']),
            location: String(s['location']),
            address: String(s['address']),
            latitude: s['latitude'] !== undefined ? Number(s['latitude']) : undefined,
            longitude: s['longitude'] !== undefined ? Number(s['longitude']) : undefined,
            shipmentIds: (s['shipmentIds'] as string[]) ?? [],
            estimatedArrivalAt: s['estimatedArrivalAt'] as string | undefined,
            actualArrivalAt: s['actualArrivalAt'] as string | undefined,
            completed: Boolean(s['completed']),
            notes: s['notes'] as string | undefined,
          }),
        )
      : [];

    return RouteEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        name: raw.name,
        code: RouteCodeVO.reconstitute(raw.code),
        type: RouteTypeVO.reconstitute(raw.type),
        status: RouteStatusVO.reconstitute(raw.status),
        optimization: RouteOptimizationVO.reconstitute(raw.optimization),
        stops,
        totalDistanceKm: raw.totalDistanceKm !== null ? DistanceKmVO.reconstitute(toNum(raw.totalDistanceKm)) : undefined,
        totalDurationMinutes: raw.totalDurationMinutes !== null ? DurationMinutesVO.reconstitute(raw.totalDurationMinutes) : undefined,
        warehouseId: raw.warehouseId ? WarehouseIdVO.reconstitute(raw.warehouseId) : undefined,
        vehicleId: raw.vehicleId ? VehicleIdVO.reconstitute(raw.vehicleId) : undefined,
        driverId: raw.driverId ? DriverIdVO.reconstitute(raw.driverId) : undefined,
        scheduledDate: new Date(raw.scheduledDate).toISOString(),
        startedAt: toIso(raw.startedAt),
        completedAt: toIso(raw.completedAt),
        isOptimized: raw.isOptimized, isRecurring: raw.isRecurring,
        recurrenceRule: raw.recurrenceRule ?? undefined,
      },
    });
  }

  static toPersistence(entity: RouteEntity): Record<string, unknown> {
    const stops = entity.stops.map((s) => ({
      id: s.id, order: s.order, location: s.location, address: s.address,
      latitude: s.latitude, longitude: s.longitude, shipmentIds: [...s.shipmentIds],
      estimatedArrivalAt: s.estimatedArrivalAt, actualArrivalAt: s.actualArrivalAt,
      completed: s.completed, notes: s.notes,
    }));
    return {
      id: entity.id, name: entity.name, code: entity.code.value,
      type: entity.type.value, status: entity.status.value, optimization: entity.optimization.value,
      totalDistanceKm: entity.totalDistanceKm?.value ?? null,
      totalDurationMinutes: entity.totalDurationMinutes?.value ?? null,
      warehouseId: entity.warehouseId?.value ?? null,
      vehicleId: entity.vehicleId?.value ?? null,
      driverId: entity.driverId?.value ?? null,
      scheduledDate: new Date(entity.scheduledDate),
      startedAt: entity.startedAt ? new Date(entity.startedAt) : null,
      completedAt: entity.completedAt ? new Date(entity.completedAt) : null,
      isOptimized: entity.isOptimized, isRecurring: entity.isRecurring,
      recurrenceRule: entity.recurrenceRule ?? null,
      stops,
      version: entity.version, updatedAt: new Date(entity.updatedAt),
    };
  }
}
