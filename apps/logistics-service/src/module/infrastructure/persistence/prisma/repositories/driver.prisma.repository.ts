import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  DriverRepository, DriverListOptions, DriverPaginationResult,
} from '../../../../domain/repositories/driver.repository.interface.js';
import { DriverEntity } from '../../../../domain/entities/driver.entity.js';
import { DriverIdVO } from '../../../../domain/value-objects/primitives/driver-id.vo.js';
import { DriverStatusVO } from '../../../../domain/value-objects/primitives/driver-status.vo.js';
import { DriverTypeVO } from '../../../../domain/value-objects/primitives/driver-type.vo.js';
import { WarehouseIdVO } from '../../../../domain/value-objects/primitives/warehouse-id.vo.js';
import { VehicleIdVO } from '../../../../domain/value-objects/primitives/vehicle-id.vo.js';
import { DriverPrismaMapper } from '../driver.prisma.mapper.js';

@Injectable()
export class DriverPrismaRepository implements DriverRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<DriverEntity | null> { return this.findByIdVO(DriverIdVO.reconstitute(id)); }
  async findByIdVO(id: DriverIdVO): Promise<DriverEntity | null> {
    const row = await this.prisma.logisticsDriver.findFirst({ where: { id: id.value, deletedAt: null } });
    return row ? DriverPrismaMapper.toDomain(row as never) : null;
  }
  async findAll(): Promise<readonly DriverEntity[]> {
    const rows = await this.prisma.logisticsDriver.findMany({ where: { deletedAt: null }, orderBy: { name: 'asc' } });
    return rows.map((r) => DriverPrismaMapper.toDomain(r as never));
  }
  async findByLicense(licenseNumber: string): Promise<DriverEntity | null> {
    const row = await this.prisma.logisticsDriver.findFirst({ where: { licenseNumber, deletedAt: null } });
    return row ? DriverPrismaMapper.toDomain(row as never) : null;
  }
  async findByStatus(status: DriverStatusVO): Promise<readonly DriverEntity[]> {
    const rows = await this.prisma.logisticsDriver.findMany({ where: { status: status.value, deletedAt: null } });
    return rows.map((r) => DriverPrismaMapper.toDomain(r as never));
  }
  async findByType(type: DriverTypeVO): Promise<readonly DriverEntity[]> {
    const rows = await this.prisma.logisticsDriver.findMany({ where: { type: type.value, deletedAt: null } });
    return rows.map((r) => DriverPrismaMapper.toDomain(r as never));
  }
  async findByWarehouse(warehouseId: WarehouseIdVO): Promise<readonly DriverEntity[]> {
    const rows = await this.prisma.logisticsDriver.findMany({ where: { warehouseId: warehouseId.value, deletedAt: null } });
    return rows.map((r) => DriverPrismaMapper.toDomain(r as never));
  }
  async findByVehicle(vehicleId: VehicleIdVO): Promise<DriverEntity | null> {
    const row = await this.prisma.logisticsDriver.findFirst({ where: { vehicleId: vehicleId.value, deletedAt: null } });
    return row ? DriverPrismaMapper.toDomain(row as never) : null;
  }
  async findAvailable(): Promise<readonly DriverEntity[]> {
    const rows = await this.prisma.logisticsDriver.findMany({ where: { isAvailable: true, status: { in: ['available', 'on_duty'] }, deletedAt: null } });
    return rows.map((r) => DriverPrismaMapper.toDomain(r as never));
  }
  async findAssignable(warehouseId?: string): Promise<readonly DriverEntity[]> {
    const where: Record<string, unknown> = { isAvailable: true, status: { in: ['available', 'on_duty'] }, deletedAt: null };
    if (warehouseId) where['warehouseId'] = warehouseId;
    const rows = await this.prisma.logisticsDriver.findMany({ where: where as never });
    return rows.map((r) => DriverPrismaMapper.toDomain(r as never));
  }
  async findWithExpiringLicense(withinDays: number): Promise<readonly DriverEntity[]> {
    const cutoff = new Date(Date.now() + withinDays * 24 * 60 * 60 * 1000);
    const rows = await this.prisma.logisticsDriver.findMany({
      where: { licenseExpiresAt: { lte: cutoff }, deletedAt: null },
    });
    return rows.map((r) => DriverPrismaMapper.toDomain(r as never));
  }
  async findPaginated(options: DriverListOptions): Promise<DriverPaginationResult> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.status) where['status'] = f.status;
    if (f.type) where['type'] = f.type;
    if (f.warehouseId) where['warehouseId'] = f.warehouseId;
    if (f.vehicleId) where['vehicleId'] = f.vehicleId;
    if (f.isAvailable !== undefined) where['isAvailable'] = f.isAvailable;
    if (f.minRating !== undefined) where['rating'] = { gte: f.minRating };
    if (f.search) where['OR'] = [{ name: { contains: f.search, mode: 'insensitive' } }, { licenseNumber: { contains: f.search, mode: 'insensitive' } }];
    const orderBy = { [options.sortBy ?? 'createdAt']: options.sortDir ?? 'desc' } as Record<string, 'asc' | 'desc'>;
    const [rows, total] = await Promise.all([
      this.prisma.logisticsDriver.findMany({ where: where as never, orderBy, skip: (options.page - 1) * options.limit, take: options.limit }),
      this.prisma.logisticsDriver.count({ where: where as never }),
    ]);
    return { items: rows.map((r) => DriverPrismaMapper.toDomain(r as never)), total, page: options.page, limit: options.limit, totalPages: Math.ceil(total / options.limit) };
  }
  async existsByLicense(licenseNumber: string): Promise<boolean> {
    return (await this.prisma.logisticsDriver.count({ where: { licenseNumber } })) > 0;
  }
  async exists(id: string): Promise<boolean> {
    return (await this.prisma.logisticsDriver.count({ where: { id } })) > 0;
  }
  async save(entity: DriverEntity): Promise<DriverEntity> {
    const data = DriverPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.logisticsDriver.findUnique({ where: { id: entity.id }, select: { id: true } });
    if (existing) {
      const updated = await this.prisma.logisticsDriver.update({ where: { id: entity.id }, data: data as never });
      return DriverPrismaMapper.toDomain(updated as never);
    }
    const created = await this.prisma.logisticsDriver.create({ data: data as never });
    return DriverPrismaMapper.toDomain(created as never);
  }
  async delete(id: string): Promise<void> { await this.prisma.logisticsDriver.delete({ where: { id } }); }
  async softDelete(id: string): Promise<void> {
    await this.prisma.logisticsDriver.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}
