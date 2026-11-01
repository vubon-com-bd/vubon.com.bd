import { Injectable, Logger } from '@nestjs/common';
import type { RouteRepository, RouteListOptions, RoutePaginationResult, RouteStats } from '@domain/repositories/route.repository.interface';
import type { RouteEntity } from '@domain/entities/route.entity';
import type { RouteIdVO } from '@domain/value-objects/primitives/route-id.vo';
import { LogisticsPrismaService } from '../prisma.service.js';
import { RoutePrismaMapper, type LogisticsRouteRow } from '../mappers/route.prisma.mapper.js';

const MODEL = 'logisticsRoute';
interface PrismaDelegate {
  findFirst: (a: unknown) => Promise<unknown>;
  findUnique: (a: unknown) => Promise<unknown>;
  findMany: (a: unknown) => Promise<unknown[]>;
  create: (a: unknown) => Promise<unknown>;
  update: (a: unknown) => Promise<unknown>;
  delete: (a: unknown) => Promise<unknown>;
  count: (a?: unknown) => Promise<number>;
}

@Injectable()
export class RoutePrismaRepository implements RouteRepository {
  private readonly logger = new Logger(RoutePrismaRepository.name);
  constructor(private readonly prisma: LogisticsPrismaService) {}
  private get delegate(): PrismaDelegate { return this.prisma.getModel<PrismaDelegate>(MODEL); }

  async findById(id: string): Promise<RouteEntity | null> { return this.findByIdVO({ value: id } as RouteIdVO); }
  async findByIdVO(id: RouteIdVO): Promise<RouteEntity | null> {
    const raw = (await this.delegate.findFirst({ where: { id: id.value, deletedAt: null } })) as LogisticsRouteRow | null;
    return raw ? RoutePrismaMapper.toDomain(raw) : null;
  }
  async findAll(): Promise<readonly RouteEntity[]> {
    const rows = (await this.delegate.findMany({ where: { deletedAt: null }, orderBy: { createdAt: 'desc' } })) as LogisticsRouteRow[];
    return rows.map((r) => RoutePrismaMapper.toDomain(r));
  }
  async save(entity: RouteEntity): Promise<RouteEntity> {
    const data = RoutePrismaMapper.toPersistence(entity);
    const existing = (await this.delegate.findUnique({ where: { id: entity.id }, select: { id: true } })) as { id: string } | null;
    if (existing) {
      const updated = (await this.delegate.update({ where: { id: entity.id }, data: data as never })) as LogisticsRouteRow;
      return RoutePrismaMapper.toDomain(updated);
    }
    const created = (await this.delegate.create({ data: data as never })) as LogisticsRouteRow;
    return RoutePrismaMapper.toDomain(created);
  }
  async delete(id: string): Promise<void> { await this.delegate.delete({ where: { id } }); }
  async exists(id: string): Promise<boolean> { return (await this.delegate.count({ where: { id } })) > 0; }
  async findByCode(code: string): Promise<RouteEntity | null> {
    const raw = (await this.delegate.findFirst({ where: { code, deletedAt: null } })) as LogisticsRouteRow | null;
    return raw ? RoutePrismaMapper.toDomain(raw) : null;
  }
  async findByStatus(status: string): Promise<readonly RouteEntity[]> {
    const rows = (await this.delegate.findMany({ where: { status, deletedAt: null } })) as LogisticsRouteRow[];
    return rows.map((r) => RoutePrismaMapper.toDomain(r));
  }
  async findByDriverId(driverId: string): Promise<readonly RouteEntity[]> {
    const rows = (await this.delegate.findMany({ where: { driverId, deletedAt: null } })) as LogisticsRouteRow[];
    return rows.map((r) => RoutePrismaMapper.toDomain(r));
  }
  async findByWarehouseId(warehouseId: string): Promise<readonly RouteEntity[]> {
    const rows = (await this.delegate.findMany({ where: { warehouseId, deletedAt: null } })) as LogisticsRouteRow[];
    return rows.map((r) => RoutePrismaMapper.toDomain(r));
  }
  async findPendingOptimization(): Promise<readonly RouteEntity[]> {
    const rows = (await this.delegate.findMany({ where: { isOptimized: false, deletedAt: null } })) as LogisticsRouteRow[];
    return rows.map((r) => RoutePrismaMapper.toDomain(r));
  }
  async findActive(): Promise<readonly RouteEntity[]> {
    const rows = (await this.delegate.findMany({ where: { status: 'active', deletedAt: null } })) as LogisticsRouteRow[];
    return rows.map((r) => RoutePrismaMapper.toDomain(r));
  }
  async findPaginated(options: RouteListOptions): Promise<RoutePaginationResult> {
    const opts = options as unknown as Record<string, unknown>;
    const page = (opts['page'] as number) ?? 1;
    const limit = (opts['limit'] as number) ?? 20;
    const filter = (opts['filter'] as Record<string, unknown>) ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (filter['status']) where['status'] = filter['status'];
    const [rows, total] = await Promise.all([
      this.delegate.findMany({ where: where as never, orderBy: { [(opts['sortBy'] as string) ?? 'createdAt']: opts['sortDir'] ?? 'desc' } as never, skip: (page - 1) * limit, take: limit }) as Promise<LogisticsRouteRow[]>,
      this.delegate.count({ where: where as never }),
    ]);
    return { items: rows.map((r) => RoutePrismaMapper.toDomain(r)), total, page, limit, totalPages: Math.ceil(total / limit) } as RoutePaginationResult;
  }
  async getStats(): Promise<RouteStats> {
    const rows = (await this.delegate.findMany({ where: { deletedAt: null }, select: { status: true, type: true } })) as Array<{ status: string; type: string }>;
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    for (const r of rows) { byStatus[r.status] = (byStatus[r.status] ?? 0) + 1; byType[r.type] = (byType[r.type] ?? 0) + 1; }
    return { total: rows.length, byStatus, byType } as RouteStats;
  }
  async softDelete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }
  async findByVehicleId(vehicleId: string): Promise<readonly RouteEntity[]> {
    const rows = (await this.delegate.findMany({ where: { vehicleId, deletedAt: null } })) as LogisticsRouteRow[];
    return rows.map((r) => RoutePrismaMapper.toDomain(r));
  }

  async findContainingShipment(shipmentId: string): Promise<readonly RouteEntity[]> {
    const rows = (await this.delegate.findMany({ where: { deletedAt: null } })) as LogisticsRouteRow[];
    return rows.filter((r) => {
      const stops = (r.stops as Array<{ shipmentIds?: string[] }>) ?? [];
      return stops.some((s) => s.shipmentIds?.includes(shipmentId));
    }).map((r) => RoutePrismaMapper.toDomain(r));
  }

  async findByScheduledDate(date: string): Promise<readonly RouteEntity[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    const rows = (await this.delegate.findMany({
      where: { scheduledDate: { gte: startOfDay, lte: endOfDay }, deletedAt: null },
    })) as LogisticsRouteRow[];
    return rows.map((r) => RoutePrismaMapper.toDomain(r));
  }

  async existsByCode(code: string): Promise<boolean> { return (await this.delegate.count({ where: { code } })) > 0; }
}
