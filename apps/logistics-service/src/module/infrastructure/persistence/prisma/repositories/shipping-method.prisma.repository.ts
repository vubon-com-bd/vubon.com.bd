import { Injectable, Logger } from '@nestjs/common';
import type { ShippingMethodRepository, ShippingMethodListOptions, ShippingMethodPaginationResult, ShippingMethodStats } from '@domain/repositories/shipping-method.repository.interface';
import type { ShippingMethodEntity } from '@domain/entities/shipping-method.entity';
import type { ShippingMethodIdVO } from '@domain/value-objects/primitives/shipping-method-id.vo';
import { LogisticsPrismaService } from '../prisma.service.js';
import { ShippingMethodPrismaMapper, type LogisticsShippingMethodRow } from '../mappers/shipping-method.prisma.mapper.js';

const MODEL = 'logisticsShippingMethod';
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
export class ShippingMethodPrismaRepository implements ShippingMethodRepository {
  private readonly logger = new Logger(ShippingMethodPrismaRepository.name);
  constructor(private readonly prisma: LogisticsPrismaService) {}
  private get delegate(): PrismaDelegate { return this.prisma.getModel<PrismaDelegate>(MODEL); }

  async findById(id: string): Promise<ShippingMethodEntity | null> { return this.findByIdVO({ value: id } as ShippingMethodIdVO); }
  async findByIdVO(id: ShippingMethodIdVO): Promise<ShippingMethodEntity | null> {
    const raw = (await this.delegate.findFirst({ where: { id: id.value, deletedAt: null } })) as LogisticsShippingMethodRow | null;
    return raw ? ShippingMethodPrismaMapper.toDomain(raw) : null;
  }
  async findAll(): Promise<readonly ShippingMethodEntity[]> {
    const rows = (await this.delegate.findMany({ where: { deletedAt: null }, orderBy: { createdAt: 'desc' } })) as LogisticsShippingMethodRow[];
    return rows.map((r) => ShippingMethodPrismaMapper.toDomain(r));
  }
  async save(entity: ShippingMethodEntity): Promise<ShippingMethodEntity> {
    const data = ShippingMethodPrismaMapper.toPersistence(entity);
    const existing = (await this.delegate.findUnique({ where: { id: entity.id }, select: { id: true } })) as { id: string } | null;
    if (existing) {
      const updated = (await this.delegate.update({ where: { id: entity.id }, data: data as never })) as LogisticsShippingMethodRow;
      return ShippingMethodPrismaMapper.toDomain(updated);
    }
    const created = (await this.delegate.create({ data: data as never })) as LogisticsShippingMethodRow;
    return ShippingMethodPrismaMapper.toDomain(created);
  }
  async delete(id: string): Promise<void> { await this.delegate.delete({ where: { id } }); }
  async exists(id: string): Promise<boolean> { return (await this.delegate.count({ where: { id } })) > 0; }
  async findByCode(code: string): Promise<ShippingMethodEntity | null> {
    const raw = (await this.delegate.findFirst({ where: { code, deletedAt: null } })) as LogisticsShippingMethodRow | null;
    return raw ? ShippingMethodPrismaMapper.toDomain(raw) : null;
  }
  async findByStatus(status: string): Promise<readonly ShippingMethodEntity[]> {
    const rows = (await this.delegate.findMany({ where: { status, deletedAt: null } })) as LogisticsShippingMethodRow[];
    return rows.map((r) => ShippingMethodPrismaMapper.toDomain(r));
  }
  async findDefault(): Promise<ShippingMethodEntity | null> {
    const raw = (await this.delegate.findFirst({ where: { isDefault: true, deletedAt: null } })) as LogisticsShippingMethodRow | null;
    return raw ? ShippingMethodPrismaMapper.toDomain(raw) : null;
  }
  async findUsable(): Promise<readonly ShippingMethodEntity[]> {
    const rows = (await this.delegate.findMany({ where: { isActive: true, deletedAt: null } })) as LogisticsShippingMethodRow[];
    return rows.map((r) => ShippingMethodPrismaMapper.toDomain(r));
  }
  async findByZone(zone: string): Promise<readonly ShippingMethodEntity[]> {
    const rows = (await this.delegate.findMany({ where: { coverageZones: { has: zone }, isActive: true, deletedAt: null } })) as LogisticsShippingMethodRow[];
    return rows.map((r) => ShippingMethodPrismaMapper.toDomain(r));
  }
  async findPaginated(options: ShippingMethodListOptions): Promise<ShippingMethodPaginationResult> {
    const opts = options as unknown as Record<string, unknown>;
    const page = (opts['page'] as number) ?? 1;
    const limit = (opts['limit'] as number) ?? 20;
    const filter = (opts['filter'] as Record<string, unknown>) ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (filter['status']) where['status'] = filter['status'];
    const [rows, total] = await Promise.all([
      this.delegate.findMany({ where: where as never, orderBy: { [(opts['sortBy'] as string) ?? 'createdAt']: opts['sortDir'] ?? 'desc' } as never, skip: (page - 1) * limit, take: limit }) as Promise<LogisticsShippingMethodRow[]>,
      this.delegate.count({ where: where as never }),
    ]);
    return { items: rows.map((r) => ShippingMethodPrismaMapper.toDomain(r)), total, page, limit, totalPages: Math.ceil(total / limit) } as ShippingMethodPaginationResult;
  }
  async getStats(): Promise<ShippingMethodStats> {
    const rows = (await this.delegate.findMany({ where: { deletedAt: null }, select: { status: true, type: true } })) as Array<{ status: string; type: string }>;
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    for (const r of rows) { byStatus[r.status] = (byStatus[r.status] ?? 0) + 1; byType[r.type] = (byType[r.type] ?? 0) + 1; }
    return { total: rows.length, byStatus, byType } as ShippingMethodStats;
  }
  async softDelete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }
  async findByType(type: string): Promise<readonly ShippingMethodEntity[]> {
    const rows = (await this.delegate.findMany({ where: { type, deletedAt: null } })) as LogisticsShippingMethodRow[];
    return rows.map((r) => ShippingMethodPrismaMapper.toDomain(r));
  }

  async existsByCode(code: string): Promise<boolean> { return (await this.delegate.count({ where: { code } })) > 0; }
}
