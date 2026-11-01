import { Injectable, Logger } from '@nestjs/common';
import type { DriverRepository, DriverListOptions, DriverPaginationResult, DriverStats } from '@domain/repositories/driver.repository.interface';
import type { DriverEntity } from '@domain/entities/driver.entity';
import type { DriverIdVO } from '@domain/value-objects/primitives/driver-id.vo';
import { LogisticsPrismaService } from '../prisma.service.js';
import { DriverPrismaMapper, type LogisticsDriverRow } from '../mappers/driver.prisma.mapper.js';

const MODEL = 'logisticsDriver';
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
export class DriverPrismaRepository implements DriverRepository {
  private readonly logger = new Logger(DriverPrismaRepository.name);
  constructor(private readonly prisma: LogisticsPrismaService) {}
  private get delegate(): PrismaDelegate { return this.prisma.getModel<PrismaDelegate>(MODEL); }

  async findById(id: string): Promise<DriverEntity | null> { return this.findByIdVO({ value: id } as DriverIdVO); }
  async findByIdVO(id: DriverIdVO): Promise<DriverEntity | null> {
    const raw = (await this.delegate.findFirst({ where: { id: id.value, deletedAt: null } })) as LogisticsDriverRow | null;
    return raw ? DriverPrismaMapper.toDomain(raw) : null;
  }
  async findAll(): Promise<readonly DriverEntity[]> {
    const rows = (await this.delegate.findMany({ where: { deletedAt: null }, orderBy: { createdAt: 'desc' } })) as LogisticsDriverRow[];
    return rows.map((r) => DriverPrismaMapper.toDomain(r));
  }
  async save(entity: DriverEntity): Promise<DriverEntity> {
    const data = DriverPrismaMapper.toPersistence(entity);
    const existing = (await this.delegate.findUnique({ where: { id: entity.id }, select: { id: true } })) as { id: string } | null;
    if (existing) {
      const updated = (await this.delegate.update({ where: { id: entity.id }, data: data as never })) as LogisticsDriverRow;
      return DriverPrismaMapper.toDomain(updated);
    }
    const created = (await this.delegate.create({ data: data as never })) as LogisticsDriverRow;
    return DriverPrismaMapper.toDomain(created);
  }
  async delete(id: string): Promise<void> { await this.delegate.delete({ where: { id } }); }
  async exists(id: string): Promise<boolean> { return (await this.delegate.count({ where: { id } })) > 0; }
  async findByLicenseNumber(licenseNumber: string): Promise<DriverEntity | null> {
    const raw = (await this.delegate.findFirst({ where: { licenseNumber, deletedAt: null } })) as LogisticsDriverRow | null;
    return raw ? DriverPrismaMapper.toDomain(raw) : null;
  }
  async findByPhone(phone: string): Promise<DriverEntity | null> {
    const raw = (await this.delegate.findFirst({ where: { phone, deletedAt: null } })) as LogisticsDriverRow | null;
    return raw ? DriverPrismaMapper.toDomain(raw) : null;
  }
  async findByUserId(userId: string): Promise<DriverEntity | null> {
    const raw = (await this.delegate.findFirst({ where: { userId, deletedAt: null } })) as LogisticsDriverRow | null;
    return raw ? DriverPrismaMapper.toDomain(raw) : null;
  }
  async findByStatus(status: string): Promise<readonly DriverEntity[]> {
    const rows = (await this.delegate.findMany({ where: { status, deletedAt: null } })) as LogisticsDriverRow[];
    return rows.map((r) => DriverPrismaMapper.toDomain(r));
  }
  async findAvailable(): Promise<readonly DriverEntity[]> {
    const rows = (await this.delegate.findMany({ where: { isAvailable: true, status: 'active', deletedAt: null } })) as LogisticsDriverRow[];
    return rows.map((r) => DriverPrismaMapper.toDomain(r));
  }
  async findByWarehouseId(warehouseId: string): Promise<readonly DriverEntity[]> {
    const rows = (await this.delegate.findMany({ where: { warehouseId, deletedAt: null } })) as LogisticsDriverRow[];
    return rows.map((r) => DriverPrismaMapper.toDomain(r));
  }
  async findPaginated(options: DriverListOptions): Promise<DriverPaginationResult> {
    const opts = options as unknown as Record<string, unknown>;
    const page = (opts['page'] as number) ?? 1;
    const limit = (opts['limit'] as number) ?? 20;
    const filter = (opts['filter'] as Record<string, unknown>) ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (filter['status']) where['status'] = filter['status'];
    if (filter['warehouseId']) where['warehouseId'] = filter['warehouseId'];
    const [rows, total] = await Promise.all([
      this.delegate.findMany({ where: where as never, orderBy: { [(opts['sortBy'] as string) ?? 'createdAt']: opts['sortDir'] ?? 'desc' } as never, skip: (page - 1) * limit, take: limit }) as Promise<LogisticsDriverRow[]>,
      this.delegate.count({ where: where as never }),
    ]);
    return { items: rows.map((r) => DriverPrismaMapper.toDomain(r)), total, page, limit, totalPages: Math.ceil(total / limit) } as DriverPaginationResult;
  }
  async getStats(): Promise<DriverStats> {
    const rows = (await this.delegate.findMany({ where: { deletedAt: null }, select: { status: true, type: true } })) as Array<{ status: string; type: string }>;
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    for (const r of rows) { byStatus[r.status] = (byStatus[r.status] ?? 0) + 1; byType[r.type] = (byType[r.type] ?? 0) + 1; }
    return { total: rows.length, byStatus, byType } as DriverStats;
  }
  async softDelete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }
  async findByVehicleId(vehicleId: string): Promise<DriverEntity | null> {
    const raw = (await this.delegate.findFirst({ where: { vehicleId, deletedAt: null } })) as LogisticsDriverRow | null;
    return raw ? DriverPrismaMapper.toDomain(raw) : null;
  }

  async findLicenseExpiring(days: number): Promise<readonly DriverEntity[]> {
    const cutoff = new Date(Date.now() + days * 86400_000);
    const rows = (await this.delegate.findMany({ where: { licenseExpiresAt: { lt: cutoff }, deletedAt: null } })) as LogisticsDriverRow[];
    return rows.map((r) => DriverPrismaMapper.toDomain(r));
  }

  async findCashLimitReached(): Promise<readonly DriverEntity[]> {
    const rows = (await this.delegate.findMany({ where: { deletedAt: null } })) as LogisticsDriverRow[];
    return rows.filter((r) => {
      const limit = typeof r.cashLimit === 'object' && r.cashLimit !== null ? Number(r.cashLimit) : Number(r.cashLimit ?? 0);
      const hand = typeof r.cashInHand === 'object' && r.cashInHand !== null ? Number(r.cashInHand) : Number(r.cashInHand ?? 0);
      return limit > 0 && hand >= limit;
    }).map((r) => DriverPrismaMapper.toDomain(r));
  }

  async existsByLicenseNumber(licenseNumber: string): Promise<boolean> { return (await this.delegate.count({ where: { licenseNumber } })) > 0; }
}
