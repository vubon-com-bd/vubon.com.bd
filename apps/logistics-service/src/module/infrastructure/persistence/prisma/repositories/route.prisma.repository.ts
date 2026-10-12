import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  RouteRepository, RouteListOptions, RoutePaginationResult,
} from '../../../../domain/repositories/route.repository.interface.js';
import { RouteEntity } from '../../../../domain/entities/route.entity.js';
import { RouteIdVO } from '../../../../domain/value-objects/primitives/route-id.vo.js';
import { RouteCodeVO } from '../../../../domain/value-objects/primitives/route-code.vo.js';
import { RouteStatusVO } from '../../../../domain/value-objects/primitives/route-status.vo.js';
import { RouteTypeVO } from '../../../../domain/value-objects/primitives/route-type.vo.js';
import { DriverIdVO } from '../../../../domain/value-objects/primitives/driver-id.vo.js';
import { VehicleIdVO } from '../../../../domain/value-objects/primitives/vehicle-id.vo.js';
import { WarehouseIdVO } from '../../../../domain/value-objects/primitives/warehouse-id.vo.js';
import { RoutePrismaMapper } from '../route.prisma.mapper.js';

@Injectable()
export class RoutePrismaRepository implements RouteRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findById(id: string): Promise<RouteEntity | null> { return this.findByIdVO(RouteIdVO.reconstitute(id)); }
  async findByIdVO(id: RouteIdVO): Promise<RouteEntity | null> {
    const row = await this.prisma.logisticsRoute.findFirst({ where: { id: id.value, deletedAt: null } });
    return row ? RoutePrismaMapper.toDomain(row as never) : null;
  }
  async findAll(): Promise<readonly RouteEntity[]> {
    const rows = await this.prisma.logisticsRoute.findMany({ where: { deletedAt: null }, orderBy: { scheduledDate: 'desc' } });
    return rows.map((r) => RoutePrismaMapper.toDomain(r as never));
  }
  async findByCode(code: RouteCodeVO): Promise<RouteEntity | null> {
    const row = await this.prisma.logisticsRoute.findFirst({ where: { code: code.value, deletedAt: null } });
    return row ? RoutePrismaMapper.toDomain(row as never) : null;
  }
  async findByStatus(status: RouteStatusVO): Promise<readonly RouteEntity[]> {
    const rows = await this.prisma.logisticsRoute.findMany({ where: { status: status.value, deletedAt: null } });
    return rows.map((r) => RoutePrismaMapper.toDomain(r as never));
  }
  async findByType(type: RouteTypeVO): Promise<readonly RouteEntity[]> {
    const rows = await this.prisma.logisticsRoute.findMany({ where: { type: type.value, deletedAt: null } });
    return rows.map((r) => RoutePrismaMapper.toDomain(r as never));
  }
  async findByDriver(driverId: DriverIdVO): Promise<readonly RouteEntity[]> {
    const rows = await this.prisma.logisticsRoute.findMany({ where: { driverId: driverId.value, deletedAt: null } });
    return rows.map((r) => RoutePrismaMapper.toDomain(r as never));
  }
  async findByVehicle(vehicleId: VehicleIdVO): Promise<readonly RouteEntity[]> {
    const rows = await this.prisma.logisticsRoute.findMany({ where: { vehicleId: vehicleId.value, deletedAt: null } });
    return rows.map((r) => RoutePrismaMapper.toDomain(r as never));
  }
  async findByWarehouse(warehouseId: WarehouseIdVO): Promise<readonly RouteEntity[]> {
    const rows = await this.prisma.logisticsRoute.findMany({ where: { warehouseId: warehouseId.value, deletedAt: null } });
    return rows.map((r) => RoutePrismaMapper.toDomain(r as never));
  }
  async findActive(): Promise<readonly RouteEntity[]> {
    const rows = await this.prisma.logisticsRoute.findMany({ where: { status: 'active', deletedAt: null } });
    return rows.map((r) => RoutePrismaMapper.toDomain(r as never));
  }
  async findScheduledFor(date: string): Promise<readonly RouteEntity[]> {
    const start = new Date(date); start.setHours(0, 0, 0, 0);
    const end = new Date(date); end.setHours(23, 59, 59, 999);
    const rows = await this.prisma.logisticsRoute.findMany({
      where: { scheduledDate: { gte: start, lte: end }, deletedAt: null },
    });
    return rows.map((r) => RoutePrismaMapper.toDomain(r as never));
  }
  async findPaginated(options: RouteListOptions): Promise<RoutePaginationResult> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.status) where['status'] = f.status;
    if (f.type) where['type'] = f.type;
    if (f.driverId) where['driverId'] = f.driverId;
    if (f.vehicleId) where['vehicleId'] = f.vehicleId;
    if (f.warehouseId) where['warehouseId'] = f.warehouseId;
    if (f.fromDate || f.toDate) where['scheduledDate'] = { ...(f.fromDate ? { gte: new Date(f.fromDate) } : {}), ...(f.toDate ? { lte: new Date(f.toDate) } : {}) };
    if (f.search) where['OR'] = [{ name: { contains: f.search, mode: 'insensitive' } }, { code: { contains: f.search, mode: 'insensitive' } }];
    const orderBy = { [options.sortBy ?? 'scheduledDate']: options.sortDir ?? 'desc' } as Record<string, 'asc' | 'desc'>;
    const [rows, total] = await Promise.all([
      this.prisma.logisticsRoute.findMany({ where: where as never, orderBy, skip: (options.page - 1) * options.limit, take: options.limit }),
      this.prisma.logisticsRoute.count({ where: where as never }),
    ]);
    return { items: rows.map((r) => RoutePrismaMapper.toDomain(r as never)), total, page: options.page, limit: options.limit, totalPages: Math.ceil(total / options.limit) };
  }
  async existsByCode(code: RouteCodeVO): Promise<boolean> {
    return (await this.prisma.logisticsRoute.count({ where: { code: code.value } })) > 0;
  }
  async exists(id: string): Promise<boolean> {
    return (await this.prisma.logisticsRoute.count({ where: { id } })) > 0;
  }
  async save(entity: RouteEntity): Promise<RouteEntity> {
    const data = RoutePrismaMapper.toPersistence(entity);
    const existing = await this.prisma.logisticsRoute.findUnique({ where: { id: entity.id }, select: { id: true } });
    if (existing) {
      const updated = await this.prisma.logisticsRoute.update({ where: { id: entity.id }, data: data as never });
      return RoutePrismaMapper.toDomain(updated as never);
    }
    const created = await this.prisma.logisticsRoute.create({ data: data as never });
    return RoutePrismaMapper.toDomain(created as never);
  }
  async delete(id: string): Promise<void> { await this.prisma.logisticsRoute.delete({ where: { id } }); }
  async softDelete(id: string): Promise<void> {
    await this.prisma.logisticsRoute.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}
