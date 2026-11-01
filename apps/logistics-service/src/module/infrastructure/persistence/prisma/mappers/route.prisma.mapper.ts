import { RouteEntity } from '@domain/entities/route.entity';
import { RouteNameVO } from '@domain/value-objects/primitives/route-name.vo';
import { RouteTypeVO } from '@domain/value-objects/primitives/route-type.vo';
import { RouteStatusVO } from '@domain/value-objects/primitives/route-status.vo';
import { RouteOptimizationVO } from '@domain/value-objects/primitives/route-optimization.vo';

const toNum = (v: unknown): number | undefined => {
  if (v === null || v === undefined) return undefined;
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (typeof v === 'object' && 'toNumber' in v) return (v as { toNumber: () => number }).toNumber();
  return Number(v);
};
const toIso = (d: Date | null | undefined): string | undefined => d ? new Date(d).toISOString() : undefined;

export interface LogisticsRouteRow {
  id: string; name: string; code: string; type: string; status: string; optimization: string;
  totalDistanceKm: unknown; totalDurationMinutes: number | null; warehouseId: string | null;
  vehicleId: string | null; driverId: string | null; scheduledDate: Date;
  startedAt: Date | null; completedAt: Date | null; isOptimized: boolean; isRecurring: boolean;
  recurrenceRule: string | null; stops: unknown; version: number; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  archivedAt: Date | null; cancelledAt: Date | null; cancelReason: string | null; metadata: unknown;
}

export class RoutePrismaMapper {
  static toDomain(raw: LogisticsRouteRow): RouteEntity {
    return RouteEntity.reconstitute({
      id: raw.id, createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        name: RouteNameVO.reconstitute(raw.name), code: raw.code,
        type: RouteTypeVO.reconstitute(raw.type),
        status: RouteStatusVO.reconstitute(raw.status),
        optimization: RouteOptimizationVO.reconstitute(raw.optimization),
        stops: (raw.stops as unknown[] ?? []) as never,
        totalDistanceKm: toNum(raw.totalDistanceKm),
        totalDurationMinutes: raw.totalDurationMinutes ?? undefined,
        warehouseId: raw.warehouseId ?? undefined, vehicleId: raw.vehicleId ?? undefined,
        driverId: raw.driverId ?? undefined,
        scheduledDate: new Date(raw.scheduledDate).toISOString(),
        startedAt: toIso(raw.startedAt), completedAt: toIso(raw.completedAt),
        cancelledAt: toIso(raw.cancelledAt), archivedAt: toIso(raw.archivedAt),
        cancelReason: raw.cancelReason ?? undefined,
        isOptimized: raw.isOptimized, isRecurring: raw.isRecurring,
        recurrenceRule: raw.recurrenceRule ?? undefined,
        metadata: raw.metadata as Readonly<Record<string, unknown>> | undefined,
      },
    });
  }
  static toPersistence(entity: RouteEntity): Record<string, unknown> {
    return {
      id: entity.id, name: entity.name.value, code: entity.code,
      type: entity.type.value, status: entity.status.value, optimization: entity.optimization.value,
      totalDistanceKm: entity.totalDistanceKm ?? null,
      totalDurationMinutes: entity.totalDurationMinutes ?? null,
      warehouseId: entity.warehouseId ?? null, vehicleId: entity.vehicleId ?? null,
      driverId: entity.driverId ?? null,
      scheduledDate: new Date(entity.scheduledDate),
      startedAt: entity.startedAt ? new Date(entity.startedAt) : null,
      completedAt: entity.completedAt ? new Date(entity.completedAt) : null,
      cancelledAt: entity.cancelledAt ? new Date(entity.cancelledAt) : null,
      archivedAt: entity.archivedAt ? new Date(entity.archivedAt) : null,
      cancelReason: entity.cancelReason ?? null,
      isOptimized: entity.isOptimized, isRecurring: entity.isRecurring,
      recurrenceRule: entity.recurrenceRule ?? null,
      stops: entity.stops as unknown,
      metadata: entity.metadata ?? null, version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
