import { Injectable } from '@nestjs/common';
import type { InventoryLocationRepository, InventoryLocationListOptions, InventoryLocationPaginationResult, InventoryLocationStats } from '@domain/repositories/inventory-location.repository.interface';
import type { InventoryLocationEntity } from '@domain/entities/inventory-location.entity';
import type { InventoryLocationIdVO } from '@domain/value-objects/primitives/inventory-location-id.vo';
import { LogisticsPrismaService } from '../prisma.service.js';
import { InventoryLocationPrismaMapper, type LogisticsInventoryLocationRow } from '../mappers/inventory-location.prisma.mapper.js';

const MODEL = 'logisticsInventoryLocation';
interface D { findFirst: (a: unknown) => Promise<unknown>; findUnique: (a: unknown) => Promise<unknown>; findMany: (a: unknown) => Promise<unknown[]>; create: (a: unknown) => Promise<unknown>; update: (a: unknown) => Promise<unknown>; delete: (a: unknown) => Promise<unknown>; count: (a?: unknown) => Promise<number>; }

@Injectable()
export class InventoryLocationPrismaRepository implements InventoryLocationRepository {
  constructor(private readonly prisma: LogisticsPrismaService) {}
  private get delegate(): D { return this.prisma.getModel<D>(MODEL); }
  async findById(id: string): Promise<InventoryLocationEntity | null> { return this.findByIdVO({ value: id } as InventoryLocationIdVO); }
  async findByIdVO(id: InventoryLocationIdVO): Promise<InventoryLocationEntity | null> {
    const raw = (await this.delegate.findFirst({ where: { id: id.value, deletedAt: null } })) as LogisticsInventoryLocationRow | null;
    return raw ? InventoryLocationPrismaMapper.toDomain(raw) : null;
  }
  async findAll(): Promise<readonly InventoryLocationEntity[]> {
    const rows = (await this.delegate.findMany({ where: { deletedAt: null }, orderBy: { createdAt: 'desc' } })) as LogisticsInventoryLocationRow[];
    return rows.map((r) => InventoryLocationPrismaMapper.toDomain(r));
  }
  async save(e: InventoryLocationEntity): Promise<InventoryLocationEntity> {
    const d = InventoryLocationPrismaMapper.toPersistence(e);
    const x = (await this.delegate.findUnique({ where: { id: e.id }, select: { id: true } })) as { id: string } | null;
    if (x) return InventoryLocationPrismaMapper.toDomain((await this.delegate.update({ where: { id: e.id }, data: d as never })) as LogisticsInventoryLocationRow);
    return InventoryLocationPrismaMapper.toDomain((await this.delegate.create({ data: d as never })) as LogisticsInventoryLocationRow);
  }
  async delete(id: string): Promise<void> { await this.delegate.delete({ where: { id } }); }
  async exists(id: string): Promise<boolean> { return (await this.delegate.count({ where: { id } })) > 0; }
  async findByCode(code: string): Promise<InventoryLocationEntity | null> {
    const raw = (await this.delegate.findFirst({ where: { code, deletedAt: null } })) as LogisticsInventoryLocationRow | null;
    return raw ? InventoryLocationPrismaMapper.toDomain(raw) : null;
  }
  async findByBarcode(barcode: string): Promise<InventoryLocationEntity | null> {
    const raw = (await this.delegate.findFirst({ where: { barcode, deletedAt: null } })) as LogisticsInventoryLocationRow | null;
    return raw ? InventoryLocationPrismaMapper.toDomain(raw) : null;
  }
  async findByWarehouseId(warehouseId: string): Promise<readonly InventoryLocationEntity[]> {
    const rows = (await this.delegate.findMany({ where: { warehouseId, deletedAt: null } })) as LogisticsInventoryLocationRow[];
    return rows.map((r) => InventoryLocationPrismaMapper.toDomain(r));
  }
  async findByZone(zone: string): Promise<readonly InventoryLocationEntity[]> {
    const rows = (await this.delegate.findMany({ where: { zone, deletedAt: null } })) as LogisticsInventoryLocationRow[];
    return rows.map((r) => InventoryLocationPrismaMapper.toDomain(r));
  }
  async findPickable(): Promise<readonly InventoryLocationEntity[]> {
    const rows = (await this.delegate.findMany({ where: { isPickable: true, isQuarantine: false, deletedAt: null } })) as LogisticsInventoryLocationRow[];
    return rows.map((r) => InventoryLocationPrismaMapper.toDomain(r));
  }
  async findByStatus(status: string): Promise<readonly InventoryLocationEntity[]> {
    const rows = (await this.delegate.findMany({ where: { status, deletedAt: null } })) as LogisticsInventoryLocationRow[];
    return rows.map((r) => InventoryLocationPrismaMapper.toDomain(r));
  }
  async findPaginated(options: InventoryLocationListOptions): Promise<InventoryLocationPaginationResult> {
    const opts = options as unknown as Record<string, unknown>;
    const page = (opts['page'] as number) ?? 1;
    const limit = (opts['limit'] as number) ?? 20;
    const filter = (opts['filter'] as Record<string, unknown>) ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (filter['warehouseId']) where['warehouseId'] = filter['warehouseId'];
    if (filter['zone']) where['zone'] = filter['zone'];
    const [rows, total] = await Promise.all([
      this.delegate.findMany({ where: where as never, orderBy: { [(opts['sortBy'] as string) ?? 'createdAt']: opts['sortDir'] ?? 'desc' } as never, skip: (page - 1) * limit, take: limit }) as Promise<LogisticsInventoryLocationRow[]>,
      this.delegate.count({ where: where as never }),
    ]);
    return { items: rows.map((r) => InventoryLocationPrismaMapper.toDomain(r)), total, page, limit, totalPages: Math.ceil(total / limit) } as InventoryLocationPaginationResult;
  }
  async getStats(_warehouseId?: string): Promise<InventoryLocationStats> {
    const rows = (await this.delegate.findMany({ where: { deletedAt: null }, select: { zone: true, status: true } })) as Array<{ zone: string; status: string }>;
    const byZone: Record<string, number> = {}; const byStatus: Record<string, number> = {};
    for (const r of rows) { byZone[r.zone] = (byZone[r.zone] ?? 0) + 1; byStatus[r.status] = (byStatus[r.status] ?? 0) + 1; }
    return { total: rows.length, byZone, byStatus } as unknown as InventoryLocationStats;
  }
  async softDelete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }
  async existsByCode(code: string): Promise<boolean> { return (await this.delegate.count({ where: { code } })) > 0; }
}
