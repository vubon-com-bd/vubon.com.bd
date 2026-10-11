/**
 * BroadcastPrismaRepository — implements BroadcastRepository
 * @module notification-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  BroadcastRepository,
  BroadcastListOptions,
  BroadcastPaginationResult,
} from '../../../../domain/repositories/broadcast.repository.interface.js';
import { BroadcastEntity } from '../../../../domain/entities/broadcast.entity.js';
import { BroadcastIdVO } from '../../../../domain/value-objects/primitives/broadcast-id.vo.js';
import { BroadcastStatusVO } from '../../../../domain/value-objects/primitives/broadcast-status.vo.js';
import { BroadcastTypeVO } from '../../../../domain/value-objects/primitives/broadcast-type.vo.js';
import { BroadcastPrismaMapper } from '../mappers/broadcast.prisma.mapper.js';

@Injectable()
export class BroadcastPrismaRepository implements BroadcastRepository {
  private readonly logger = new Logger(BroadcastPrismaRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<BroadcastEntity | null> {
    return this.findByIdVO(BroadcastIdVO.reconstitute(id));
  }

  async findByIdVO(id: BroadcastIdVO): Promise<BroadcastEntity | null> {
    const row = await this.prisma.notificationBroadcast.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return row ? BroadcastPrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly BroadcastEntity[]> {
    const rows = await this.prisma.notificationBroadcast.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => BroadcastPrismaMapper.toDomain(r));
  }

  async findByStatus(status: BroadcastStatusVO): Promise<readonly BroadcastEntity[]> {
    const rows = await this.prisma.notificationBroadcast.findMany({
      where: { status: status.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => BroadcastPrismaMapper.toDomain(r));
  }

  async findByType(type: BroadcastTypeVO): Promise<readonly BroadcastEntity[]> {
    const rows = await this.prisma.notificationBroadcast.findMany({
      where: { type: type.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => BroadcastPrismaMapper.toDomain(r));
  }

  async findPaginated(options: BroadcastListOptions): Promise<BroadcastPaginationResult> {
    const where = this.buildWhere(options);
    const orderBy = this.buildOrderBy(options);

    const [rows, total] = await Promise.all([
      this.prisma.notificationBroadcast.findMany({
        where,
        orderBy,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.prisma.notificationBroadcast.count({ where }),
    ]);

    return {
      items: rows.map((r) => BroadcastPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async findDueScheduled(at: Date = new Date()): Promise<readonly BroadcastEntity[]> {
    const rows = await this.prisma.notificationBroadcast.findMany({
      where: { status: 'scheduled', scheduledAt: { lte: at }, deletedAt: null },
    });
    return rows.map((r) => BroadcastPrismaMapper.toDomain(r));
  }

  async findStaleSending(olderThanMinutes: number): Promise<readonly BroadcastEntity[]> {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60 * 1000);
    const rows = await this.prisma.notificationBroadcast.findMany({
      where: {
        status: 'sending',
        startedAt: { lt: cutoff },
        deletedAt: null,
      },
    });
    return rows.map((r) => BroadcastPrismaMapper.toDomain(r));
  }

  async save(entity: BroadcastEntity): Promise<BroadcastEntity> {
    const data = BroadcastPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.notificationBroadcast.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.prisma.notificationBroadcast.update({
        where: { id: entity.id },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: data as any,
      });
      return BroadcastPrismaMapper.toDomain(updated);
    }

    const created = await this.prisma.notificationBroadcast.create({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: data as any,
    });
    return BroadcastPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.notificationBroadcast.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.notificationBroadcast.count({ where: { id } });
    return count > 0;
  }

  private buildWhere(options: BroadcastListOptions): Record<string, unknown> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.type) where['type'] = f.type;
    if (f.status) where['status'] = f.status;
    if (f.templateId) where['templateId'] = f.templateId;
    if (f.createdBy) where['createdBy'] = f.createdBy;
    if (f.fromDate || f.toDate) {
      where['createdAt'] = {
        ...(f.fromDate ? { gte: new Date(f.fromDate) } : {}),
        ...(f.toDate ? { lte: new Date(f.toDate) } : {}),
      };
    }
    return where;
  }

  private buildOrderBy(
    options: BroadcastListOptions,
  ): Record<string, 'asc' | 'desc'> {
    const dir = options.sortDir ?? 'desc';
    const field = options.sortBy ?? 'createdAt';
    return { [field]: dir };
  }
}
