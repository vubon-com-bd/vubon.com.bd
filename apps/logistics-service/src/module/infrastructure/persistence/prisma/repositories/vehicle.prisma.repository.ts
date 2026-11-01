import { Injectable, Logger } from '@nestjs/common';
import type { VehicleRepository, VehicleListOptions, VehiclePaginationResult, VehicleStats } from '@domain/repositories/vehicle.repository.interface';
import type { VehicleEntity } from '@domain/entities/vehicle.entity';
import type { VehicleIdVO } from '@domain/value-objects/primitives/vehicle-id.vo';
import { LogisticsPrismaService } from '../prisma.service.js';
import { VehiclePrismaMapper, type LogisticsVehicleRow } from '../mappers/vehicle.prisma.mapper.js';

const MODEL = 'logisticsVehicle';
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
export class VehiclePrismaRepository implements VehicleRepository {
  private readonly logger = new Logger(VehiclePrismaRepository.name);
  constructor(private readonly prisma: LogisticsPrismaService) {}
  private get delegate(): PrismaDelegate { return this.prisma.getModel<PrismaDelegate>(MODEL); }

  async findById(id: string): Promise<VehicleEntity | null> { return this.findByIdVO({ value: id } as VehicleIdVO); }
  async findByIdVO(id: VehicleIdVO): Promise<VehicleEntity | null> {
    const raw = (await this.delegate.findFirst({ where: { id: id.value, deletedAt: null } })) as LogisticsVehicleRow | null;
    return raw ? VehiclePrismaMapper.toDomain(raw) : null;
  }
  async findAll(): Promise<readonly VehicleEntity[]> {
    const rows = (await this.delegate.findMany({ where: { deletedAt: null }, orderBy: { createdAt: 'desc' } })) as LogisticsVehicleRow[];
    return rows.map((r) => VehiclePrismaMapper.toDomain(r));
  }
  async save(entity: VehicleEntity): Promise<VehicleEntity> {
    const data = VehiclePrismaMapper.toPersistence(entity);
    const existing = (await this.delegate.findUnique({ where: { id: entity.id }, select: { id: true } })) as { id: string } | null;
    if (existing) {
      const updated = (await this.delegate.update({ where: { id: entity.id }, data: data as never })) as LogisticsVehicleRow;
      return VehiclePrismaMapper.toDomain(updated);
    }
    const created = (await this.delegate.create({ data: data as never })) as LogisticsVehicleRow;
    return VehiclePrismaMapper.toDomain(created);
  }
  async delete(id: string): Promise<void> { await this.delegate.delete({ where: { id } }); }
  async exists(id: string): Promise<boolean> { return (await this.delegate.count({ where: { id } })) > 0; }
  async findByRegistrationNumber(reg: string): Promise<VehicleEntity | null> {
    const raw = (await this.delegate.findFirst({ where: { registrationNumber: reg, deletedAt: null } })) as LogisticsVehicleRow | null;
    return raw ? VehiclePrismaMapper.toDomain(raw) : null;
  }
  async findByStatus(status: string): Promise<readonly VehicleEntity[]> {
    const rows = (await this.delegate.findMany({ where: { status, deletedAt: null } })) as LogisticsVehicleRow[];
    return rows.map((r) => VehiclePrismaMapper.toDomain(r));
  }
  async findAvailable(): Promise<readonly VehicleEntity[]> {
    const rows = (await this.delegate.findMany({ where: { status: 'available', isActive: true, deletedAt: null } })) as LogisticsVehicleRow[];
    return rows.map((r) => VehiclePrismaMapper.toDomain(r));
  }
  async findByDriverId(driverId: string): Promise<VehicleEntity | null> {
    const raw = (await this.delegate.findFirst({ where: { assignedDriverId: driverId, deletedAt: null } })) as LogisticsVehicleRow | null;
    return raw ? VehiclePrismaMapper.toDomain(raw) : null;
  }
  async findPaginated(options: VehicleListOptions): Promise<VehiclePaginationResult> {
    const opts = options as unknown as Record<string, unknown>;
    const page = (opts['page'] as number) ?? 1;
    const limit = (opts['limit'] as number) ?? 20;
    const filter = (opts['filter'] as Record<string, unknown>) ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (filter['status']) where['status'] = filter['status'];
    const [rows, total] = await Promise.all([
      this.delegate.findMany({ where: where as never, orderBy: { [(opts['sortBy'] as string) ?? 'createdAt']: opts['sortDir'] ?? 'desc' } as never, skip: (page - 1) * limit, take: limit }) as Promise<LogisticsVehicleRow[]>,
      this.delegate.count({ where: where as never }),
    ]);
    return { items: rows.map((r) => VehiclePrismaMapper.toDomain(r)), total, page, limit, totalPages: Math.ceil(total / limit) } as VehiclePaginationResult;
  }
  async getStats(): Promise<VehicleStats> {
    const rows = (await this.delegate.findMany({ where: { deletedAt: null }, select: { status: true, type: true, fuelType: true } })) as Array<{ status: string; type: string; fuelType: string }>;
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    const byFuelType: Record<string, number> = {};
    for (const r of rows) { byStatus[r.status] = (byStatus[r.status] ?? 0) + 1; byType[r.type] = (byType[r.type] ?? 0) + 1; byFuelType[r.fuelType] = (byFuelType[r.fuelType] ?? 0) + 1; }
    return { total: rows.length, byStatus, byType, byFuelType } as VehicleStats;
  }
  async softDelete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }
  async findByType(type: string): Promise<readonly VehicleEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { type, deletedAt: null },
    })) as LogisticsVehicleRow[];
    return rows.map((r) => VehiclePrismaMapper.toDomain(r));
  }

  async findByWarehouseId(warehouseId: string): Promise<readonly VehicleEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { warehouseId, deletedAt: null },
    })) as LogisticsVehicleRow[];
    return rows.map((r) => VehiclePrismaMapper.toDomain(r));
  }

  async findMaintenanceDue(): Promise<readonly VehicleEntity[]> {
    const now = new Date();
    const rows = (await this.delegate.findMany({
      where: { nextServiceAt: { lt: now }, isActive: true, deletedAt: null },
    })) as LogisticsVehicleRow[];
    return rows.map((r) => VehiclePrismaMapper.toDomain(r));
  }

  async findExpiringInsurance(days: number): Promise<readonly VehicleEntity[]> {
    const cutoff = new Date(Date.now() + days * 86400_000);
    const rows = (await this.delegate.findMany({
      where: { insuranceExpiresAt: { lt: cutoff }, isActive: true, deletedAt: null },
    })) as LogisticsVehicleRow[];
    return rows.map((r) => VehiclePrismaMapper.toDomain(r));
  }

  async existsByRegistrationNumber(reg: string): Promise<boolean> { return (await this.delegate.count({ where: { registrationNumber: reg } })) > 0; }
}
