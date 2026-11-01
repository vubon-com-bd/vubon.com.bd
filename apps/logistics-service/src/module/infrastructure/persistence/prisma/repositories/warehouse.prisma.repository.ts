import { Injectable, Logger } from '@nestjs/common';
import type { WarehouseRepository, WarehouseListOptions, WarehousePaginationResult, WarehouseStats } from '@domain/repositories/warehouse.repository.interface';
import type { WarehouseEntity } from '@domain/entities/warehouse.entity';
import type { WarehouseIdVO } from '@domain/value-objects/primitives/warehouse-id.vo';
import { LogisticsPrismaService } from '../prisma.service.js';
import { WarehousePrismaMapper, type LogisticsWarehouseRow } from '../mappers/warehouse.prisma.mapper.js';

const MODEL = 'logisticsWarehouse';
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
export class WarehousePrismaRepository implements WarehouseRepository {
  private readonly logger = new Logger(WarehousePrismaRepository.name);
  constructor(private readonly prisma: LogisticsPrismaService) {}
  private get delegate(): PrismaDelegate { return this.prisma.getModel<PrismaDelegate>(MODEL); }

  async findById(id: string): Promise<WarehouseEntity | null> { return this.findByIdVO({ value: id } as WarehouseIdVO); }
  async findByIdVO(id: WarehouseIdVO): Promise<WarehouseEntity | null> {
    const raw = (await this.delegate.findFirst({ where: { id: id.value, deletedAt: null } })) as LogisticsWarehouseRow | null;
    return raw ? WarehousePrismaMapper.toDomain(raw) : null;
  }
  async findAll(): Promise<readonly WarehouseEntity[]> {
    const rows = (await this.delegate.findMany({ where: { deletedAt: null }, orderBy: { createdAt: 'desc' } })) as LogisticsWarehouseRow[];
    return rows.map((r) => WarehousePrismaMapper.toDomain(r));
  }
  async save(entity: WarehouseEntity): Promise<WarehouseEntity> {
    const data = WarehousePrismaMapper.toPersistence(entity);
    const existing = (await this.delegate.findUnique({ where: { id: entity.id }, select: { id: true } })) as { id: string } | null;
    if (existing) {
      const updated = (await this.delegate.update({ where: { id: entity.id }, data: data as never })) as LogisticsWarehouseRow;
      return WarehousePrismaMapper.toDomain(updated);
    }
    const created = (await this.delegate.create({ data: data as never })) as LogisticsWarehouseRow;
    return WarehousePrismaMapper.toDomain(created);
  }
  async delete(id: string): Promise<void> { await this.delegate.delete({ where: { id } }); }
  async exists(id: string): Promise<boolean> { return (await this.delegate.count({ where: { id } })) > 0; }
  async findByCode(code: string): Promise<WarehouseEntity | null> {
    const raw = (await this.delegate.findFirst({ where: { code, deletedAt: null } })) as LogisticsWarehouseRow | null;
    return raw ? WarehousePrismaMapper.toDomain(raw) : null;
  }
  async findByStatus(status: string): Promise<readonly WarehouseEntity[]> {
    const rows = (await this.delegate.findMany({ where: { status, deletedAt: null } })) as LogisticsWarehouseRow[];
    return rows.map((r) => WarehousePrismaMapper.toDomain(r));
  }
  async findDefault(): Promise<WarehouseEntity | null> {
    const raw = (await this.delegate.findFirst({ where: { isDefault: true, deletedAt: null } })) as LogisticsWarehouseRow | null;
    return raw ? WarehousePrismaMapper.toDomain(raw) : null;
  }
  async findByZone(zone: string): Promise<readonly WarehouseEntity[]> {
    const rows = (await this.delegate.findMany({ where: { zone, deletedAt: null } })) as LogisticsWarehouseRow[];
    return rows.map((r) => WarehousePrismaMapper.toDomain(r));
  }
  async findPaginated(options: WarehouseListOptions): Promise<WarehousePaginationResult> {
    const opts = options as unknown as Record<string, unknown>;
    const page = (opts['page'] as number) ?? 1;
    const limit = (opts['limit'] as number) ?? 20;
    const filter = (opts['filter'] as Record<string, unknown>) ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (filter['status']) where['status'] = filter['status'];
    if (filter['zone']) where['zone'] = filter['zone'];
    const [rows, total] = await Promise.all([
      this.delegate.findMany({ where: where as never, orderBy: { [(opts['sortBy'] as string) ?? 'createdAt']: opts['sortDir'] ?? 'desc' } as never, skip: (page - 1) * limit, take: limit }) as Promise<LogisticsWarehouseRow[]>,
      this.delegate.count({ where: where as never }),
    ]);
    return { items: rows.map((r) => WarehousePrismaMapper.toDomain(r)), total, page, limit, totalPages: Math.ceil(total / limit) } as WarehousePaginationResult;
  }
  async getStats(): Promise<WarehouseStats> {
    const rows = (await this.delegate.findMany({ where: { deletedAt: null }, select: { status: true, type: true } })) as Array<{ status: string; type: string }>;
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    for (const r of rows) { byStatus[r.status] = (byStatus[r.status] ?? 0) + 1; byType[r.type] = (byType[r.type] ?? 0) + 1; }
    return { total: rows.length, byStatus, byType } as WarehouseStats;
  }
  async softDelete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }
  async findOperational(): Promise<readonly WarehouseEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { status: 'active', deletedAt: null },
    })) as LogisticsWarehouseRow[];
    return rows.map((r) => WarehousePrismaMapper.toDomain(r));
  }

  async existsByCode(code: string): Promise<boolean> { return (await this.delegate.count({ where: { code } })) > 0; }
}
