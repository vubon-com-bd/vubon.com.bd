/**
 * ReturnReasonPrismaRepository — implements ReturnReasonRepository
 */
import { Injectable } from '@nestjs/common';
import type {
  ReturnReasonRepository,
  ReturnReasonListOptions,
  ReturnReasonPaginationResult,
  ReturnReasonStats,
} from '@domain/repositories/return-reason.repository.interface';
import type { ReturnReasonEntity } from '@domain/entities/return-reason.entity';
import type { ReturnReasonIdVO } from '@domain/value-objects/primitives/return-reason-id.vo';
import { LogisticsPrismaService } from '../prisma.service.js';
import { ReturnReasonPrismaMapper, type LogisticsReturnReasonRow } from '../mappers/return-reason.prisma.mapper.js';

const MODEL = 'logisticsReturnReason';

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
export class ReturnReasonPrismaRepository implements ReturnReasonRepository {
  constructor(private readonly prisma: LogisticsPrismaService) {}

  private get delegate(): PrismaDelegate {
    return this.prisma.getModel<PrismaDelegate>(MODEL);
  }

  async findById(id: string): Promise<ReturnReasonEntity | null> {
    return this.findByIdVO({ value: id } as ReturnReasonIdVO);
  }

  async findByIdVO(id: ReturnReasonIdVO): Promise<ReturnReasonEntity | null> {
    const raw = (await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    })) as LogisticsReturnReasonRow | null;
    return raw ? ReturnReasonPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ReturnReasonEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { priority: 'desc' },
    })) as LogisticsReturnReasonRow[];
    return rows.map((r) => ReturnReasonPrismaMapper.toDomain(r));
  }

  async save(entity: ReturnReasonEntity): Promise<ReturnReasonEntity> {
    const data = ReturnReasonPrismaMapper.toPersistence(entity);
    const existing = (await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    })) as { id: string } | null;
    if (existing) {
      const updated = (await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      })) as LogisticsReturnReasonRow;
      return ReturnReasonPrismaMapper.toDomain(updated);
    }
    const created = (await this.delegate.create({ data: data as never })) as LogisticsReturnReasonRow;
    return ReturnReasonPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    return (await this.delegate.count({ where: { id } })) > 0;
  }

  async findByCode(code: string): Promise<ReturnReasonEntity | null> {
    const raw = (await this.delegate.findFirst({
      where: { code, deletedAt: null },
    })) as LogisticsReturnReasonRow | null;
    return raw ? ReturnReasonPrismaMapper.toDomain(raw) : null;
  }

  async findByType(type: string): Promise<readonly ReturnReasonEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { type, deletedAt: null },
    })) as LogisticsReturnReasonRow[];
    return rows.map((r) => ReturnReasonPrismaMapper.toDomain(r));
  }

  async findActive(): Promise<readonly ReturnReasonEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { isActive: true, deletedAt: null },
      orderBy: { priority: 'desc' },
    })) as LogisticsReturnReasonRow[];
    return rows.map((r) => ReturnReasonPrismaMapper.toDomain(r));
  }

  async findPaginated(options: ReturnReasonListOptions): Promise<ReturnReasonPaginationResult> {
    const page = options.page ?? 1;
    const limit = options.limit ?? 20;
    const filter = options.filter ?? {};

    const where: Record<string, unknown> = { deletedAt: null };
    if (filter.isActive !== undefined) where['isActive'] = filter.isActive;
    if (filter.type) where['type'] = filter.type;
    if (filter.faultCategory) where['faultCategory'] = filter.faultCategory;
    if (filter.requiresPhoto !== undefined) where['requiresPhoto'] = filter.requiresPhoto;
    if (filter.search) where['OR'] = [
      { code: { contains: filter.search, mode: 'insensitive' } },
      { name: { contains: filter.search, mode: 'insensitive' } },
    ];

    const orderBy = { [options.sortBy ?? 'priority']: options.sortDir ?? 'desc' };

    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where: where as never,
        orderBy: orderBy as never,
        skip: (page - 1) * limit,
        take: limit,
      }) as Promise<LogisticsReturnReasonRow[]>,
      this.delegate.count({ where: where as never }),
    ]);

    return {
      items: rows.map((r) => ReturnReasonPrismaMapper.toDomain(r)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getStats(): Promise<ReturnReasonStats> {
    const rows = (await this.delegate.findMany({
      where: { deletedAt: null },
      select: { isActive: true, type: true },
    })) as Array<{ isActive: boolean; type: string }>;

    let activeCount = 0;
    const byCategory: Record<string, number> = {};

    for (const r of rows) {
      if (r.isActive) activeCount += 1;
      byCategory[r.type] = (byCategory[r.type] ?? 0) + 1;
    }

    return {
      total: rows.length,
      activeCount,
      byCategory,
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
