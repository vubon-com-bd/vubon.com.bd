import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  VehicleRepository, VehicleListOptions, VehiclePaginationResult,
} from '../../../../domain/repositories/vehicle.repository.interface.js';
import { VehicleEntity } from '../../../../domain/entities/vehicle.entity.js';
import { VehicleIdVO } from '../../../../domain/value-objects/primitives/vehicle-id.vo.js';
import { VehicleStatusVO } from '../../../../domain/value-objects/primitives/vehicle-status.vo.js';
import { VehicleTypeVO } from '../../../../domain/value-objects/primitives/vehicle-type.vo.js';
import { DriverIdVO } from '../../../../domain/value-objects/primitives/driver-id.vo.js';
import { VehiclePrismaMapper } from '../vehicle.prisma.mapper.js';

@Injectable()
export class VehiclePrismaRepository implements VehicleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<VehicleEntity | null> {
    return this.findByIdVO(VehicleIdVO.reconstitute(id));
  }
  async findByIdVO(id: VehicleIdVO): Promise<VehicleEntity | null> {
    const row = await this.prisma.logisticsVehicle.findFirst({ where: { id: id.value, deletedAt: null } });
    return row ? VehiclePrismaMapper.toDomain(row as never) : null;
  }
  async findAll(): Promise<readonly VehicleEntity[]> {
    const rows = await this.prisma.logisticsVehicle.findMany({ where: { deletedAt: null }, orderBy: { createdAt: 'desc' } });
    return rows.map((r) => VehiclePrismaMapper.toDomain(r as never));
  }
  async findByRegistration(registrationNumber: string): Promise<VehicleEntity | null> {
    const row = await this.prisma.logisticsVehicle.findFirst({ where: { registrationNumber, deletedAt: null } });
    return row ? VehiclePrismaMapper.toDomain(row as never) : null;
  }
  async findByStatus(status: VehicleStatusVO): Promise<readonly VehicleEntity[]> {
    const rows = await this.prisma.logisticsVehicle.findMany({ where: { status: status.value, deletedAt: null } });
    return rows.map((r) => VehiclePrismaMapper.toDomain(r as never));
  }
  async findByType(type: VehicleTypeVO): Promise<readonly VehicleEntity[]> {
    const rows = await this.prisma.logisticsVehicle.findMany({ where: { type: type.value, deletedAt: null } });
    return rows.map((r) => VehiclePrismaMapper.toDomain(r as never));
  }
  async findByDriver(driverId: DriverIdVO): Promise<VehicleEntity | null> {
    const row = await this.prisma.logisticsVehicle.findFirst({ where: { assignedDriverId: driverId.value, deletedAt: null } });
    return row ? VehiclePrismaMapper.toDomain(row as never) : null;
  }
  async findAvailable(): Promise<readonly VehicleEntity[]> {
    const rows = await this.prisma.logisticsVehicle.findMany({ where: { status: 'available', isActive: true, deletedAt: null } });
    return rows.map((r) => VehiclePrismaMapper.toDomain(r as never));
  }
  async findCapableOf(weightKg: number, volumeM3?: number): Promise<readonly VehicleEntity[]> {
    const rows = await this.prisma.logisticsVehicle.findMany({ where: { isActive: true, deletedAt: null } });
    return rows
      .filter((r) => Number(r.maxWeightKg) >= weightKg && (volumeM3 === undefined || r.maxVolumeM3 === null || Number(r.maxVolumeM3) >= volumeM3))
      .map((r) => VehiclePrismaMapper.toDomain(r as never));
  }
  async findNeedingService(withinDays: number): Promise<readonly VehicleEntity[]> {
    const cutoff = new Date(Date.now() + withinDays * 24 * 60 * 60 * 1000);
    const rows = await this.prisma.logisticsVehicle.findMany({
      where: { nextServiceAt: { lte: cutoff }, isActive: true, deletedAt: null },
    });
    return rows.map((r) => VehiclePrismaMapper.toDomain(r as never));
  }
  async findPaginated(options: VehicleListOptions): Promise<VehiclePaginationResult> {
    const where: Record<string, unknown> = { deletedAt: null };
    const f = options.filter ?? {};
    if (f.status) where['status'] = f.status;
    if (f.type) where['type'] = f.type;
    if (f.fuelType) where['fuelType'] = f.fuelType;
    if (f.hasDriver !== undefined) where['assignedDriverId'] = f.hasDriver ? { not: null } : null;
    if (f.minCapacityKg !== undefined) where['maxWeightKg'] = { gte: f.minCapacityKg };
    if (f.search) where['OR'] = [{ registrationNumber: { contains: f.search, mode: 'insensitive' } }, { make: { contains: f.search, mode: 'insensitive' } }, { model: { contains: f.search, mode: 'insensitive' } }];
    const orderBy = { [options.sortBy ?? 'createdAt']: options.sortDir ?? 'desc' } as Record<string, 'asc' | 'desc'>;
    const [rows, total] = await Promise.all([
      this.prisma.logisticsVehicle.findMany({ where: where as never, orderBy, skip: (options.page - 1) * options.limit, take: options.limit }),
      this.prisma.logisticsVehicle.count({ where: where as never }),
    ]);
    return { items: rows.map((r) => VehiclePrismaMapper.toDomain(r as never)), total, page: options.page, limit: options.limit, totalPages: Math.ceil(total / options.limit) };
  }
  async existsByRegistration(registrationNumber: string): Promise<boolean> {
    return (await this.prisma.logisticsVehicle.count({ where: { registrationNumber } })) > 0;
  }
  async exists(id: string): Promise<boolean> {
    return (await this.prisma.logisticsVehicle.count({ where: { id } })) > 0;
  }
  async save(entity: VehicleEntity): Promise<VehicleEntity> {
    const data = VehiclePrismaMapper.toPersistence(entity);
    const existing = await this.prisma.logisticsVehicle.findUnique({ where: { id: entity.id }, select: { id: true } });
    if (existing) {
      const updated = await this.prisma.logisticsVehicle.update({ where: { id: entity.id }, data: data as never });
      return VehiclePrismaMapper.toDomain(updated as never);
    }
    const created = await this.prisma.logisticsVehicle.create({ data: data as never });
    return VehiclePrismaMapper.toDomain(created as never);
  }
  async delete(id: string): Promise<void> { await this.prisma.logisticsVehicle.delete({ where: { id } }); }
  async softDelete(id: string): Promise<void> {
    await this.prisma.logisticsVehicle.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}
