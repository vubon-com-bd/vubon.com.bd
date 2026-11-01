/**
 * PackagingPrismaRepository — implements PackagingRepository
 */
import { Injectable, Logger } from '@nestjs/common';
import type {
  PackagingRepository,
  PackagingListOptions,
  PackagingPaginationResult,
  PackagingStats,
} from '@domain/repositories/packaging.repository.interface';
import type { PackagingEntity } from '@domain/entities/packaging.entity';
import type { PackagingIdVO } from '@domain/value-objects/primitives/packaging-id.vo';
import { LogisticsPrismaService } from '../prisma.service.js';
import { PackagingPrismaMapper, type LogisticsPackagingRow } from '../mappers/packaging.prisma.mapper.js';

const MODEL = 'logisticsPackaging';

interface PrismaDelegate {
  findFirst: (args: unknown) => Promise<unknown>;
  findUnique: (args: unknown) => Promise<unknown>;
  findMany: (args: unknown) => Promise<unknown[]>;
  create: (args: unknown) => Promise<unknown>;
  update: (args: unknown) => Promise<unknown>;
  delete: (args: unknown) => Promise<unknown>;
  count: (args?: unknown) => Promise<number>;
}

@Injectable()
export class PackagingPrismaRepository implements PackagingRepository {
  private readonly logger = new Logger(PackagingPrismaRepository.name);
  constructor(private readonly prisma: LogisticsPrismaService) {}

  private get delegate(): PrismaDelegate {
    return this.prisma.getModel<PrismaDelegate>(MODEL);
  }

  // ═══ Base ═══
  async findById(id: string): Promise<PackagingEntity | null> {
    return this.findByIdVO({ value: id } as PackagingIdVO);
  }

  async findByIdVO(id: PackagingIdVO): Promise<PackagingEntity | null> {
    const raw = (await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    })) as LogisticsPackagingRow | null;
    return raw ? PackagingPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly PackagingEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    })) as LogisticsPackagingRow[];
    return rows.map((r) => PackagingPrismaMapper.toDomain(r));
  }

  async save(entity: PackagingEntity): Promise<PackagingEntity> {
    const data = PackagingPrismaMapper.toPersistence(entity);
    const existing = (await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    })) as { id: string } | null;
    if (existing) {
      const updated = (await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      })) as LogisticsPackagingRow;
      return PackagingPrismaMapper.toDomain(updated);
    }
    const created = (await this.delegate.create({ data: data as never })) as LogisticsPackagingRow;
    return PackagingPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    return (await this.delegate.count({ where: { id } })) > 0;
  }

  // ═══ Specialized Finders ═══
  async findByCode(code: string): Promise<PackagingEntity | null> {
    const raw = (await this.delegate.findFirst({
      where: { code, deletedAt: null },
    })) as LogisticsPackagingRow | null;
    return raw ? PackagingPrismaMapper.toDomain(raw) : null;
  }

  async findByStatus(status: string): Promise<readonly PackagingEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { status, deletedAt: null },
    })) as LogisticsPackagingRow[];
    return rows.map((r) => PackagingPrismaMapper.toDomain(r));
  }

  async findByType(type: string): Promise<readonly PackagingEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { type, deletedAt: null },
    })) as LogisticsPackagingRow[];
    return rows.map((r) => PackagingPrismaMapper.toDomain(r));
  }

  async findDefault(): Promise<PackagingEntity | null> {
    const raw = (await this.delegate.findFirst({
      where: { isDefault: true, deletedAt: null },
    })) as LogisticsPackagingRow | null;
    return raw ? PackagingPrismaMapper.toDomain(raw) : null;
  }

  async findUsable(): Promise<readonly PackagingEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { stock: { gt: 0 }, status: 'active', deletedAt: null },
    })) as LogisticsPackagingRow[];
    return rows.map((r) => PackagingPrismaMapper.toDomain(r));
  }

  async findByMaxWeight(minWeightKg: number): Promise<readonly PackagingEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { maxWeightKg: { gte: minWeightKg }, status: 'active', deletedAt: null },
    })) as LogisticsPackagingRow[];
    return rows.map((r) => PackagingPrismaMapper.toDomain(r));
  }

  async findOutOfStock(): Promise<readonly PackagingEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { stock: 0, deletedAt: null },
    })) as LogisticsPackagingRow[];
    return rows.map((r) => PackagingPrismaMapper.toDomain(r));
  }

  // ═══ Pagination ═══
  async findPaginated(options: PackagingListOptions): Promise<PackagingPaginationResult> {
    const opts = options as unknown as Record<string, unknown>;
    const page = options.page ?? 1;
    const limit = options.limit ?? 20;
    const filter = (opts['filter'] as Record<string, unknown>) ?? {};

    const where: Record<string, unknown> = { deletedAt: null };
    if (filter['status']) where['status'] = filter['status'];
    if (filter['type']) where['type'] = filter['type'];
    if (filter['material']) where['material'] = filter['material'];
    if (filter['isFragile'] !== undefined) where['isFragile'] = filter['isFragile'];
    if (filter['isRecyclable'] !== undefined) where['isRecyclable'] = filter['isRecyclable'];
    if (filter['isTemperatureControlled'] !== undefined) where['isTemperatureControlled'] = filter['isTemperatureControlled'];
    if (filter['minStock'] !== undefined) where['stock'] = { ...(where['stock'] as object ?? {}), gte: filter['minStock'] };
    if (filter['maxStock'] !== undefined) where['stock'] = { ...(where['stock'] as object ?? {}), lte: filter['maxStock'] };
    if (filter['search']) where['OR'] = [
      { name: { contains: filter['search'], mode: 'insensitive' } },
      { code: { contains: filter['search'], mode: 'insensitive' } },
    ];

    const orderBy = { [options.sortBy ?? 'createdAt']: options.sortDir ?? 'desc' };

    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where: where as never,
        orderBy: orderBy as never,
        skip: (page - 1) * limit,
        take: limit,
      }) as Promise<LogisticsPackagingRow[]>,
      this.delegate.count({ where: where as never }),
    ]);

    return {
      items: rows.map((r) => PackagingPrismaMapper.toDomain(r)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // ═══ Stats ═══
  async getStats(): Promise<PackagingStats> {
    const rows = (await this.delegate.findMany({
      where: { deletedAt: null },
      select: { status: true, type: true, stock: true, isRecyclable: true },
    })) as Array<{ status: string; type: string; stock: number; isRecyclable: boolean }>;

    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    let totalStock = 0;
    let outOfStockCount = 0;
    let ecoFriendlyCount = 0;

    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      byType[r.type] = (byType[r.type] ?? 0) + 1;
      totalStock += r.stock;
      if (r.stock === 0) outOfStockCount += 1;
      if (r.isRecyclable) ecoFriendlyCount += 1;
    }

    return {
      total: rows.length,
      byStatus,
      byType,
      totalStock,
      outOfStockCount,
      ecoFriendlyCount,
    };
  }

  async existsByCode(code: string): Promise<boolean> {
    return (await this.delegate.count({ where: { code } })) > 0;
  }

  async softDelete(id: string, deletedBy?: string): Promise<void> {
    void deletedBy;
    await this.delegate.update({
      where: { id },
      data: { deletedAt: new Date() } as never,
    });
  }
}
