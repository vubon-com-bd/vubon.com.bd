/**
 * DigestPrismaRepository — implements DigestRepository
 * @module notification-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  DigestRepository,
  DigestListOptions,
  DigestPaginationResult,
} from '../../../../domain/repositories/digest.repository.interface.js';
import { DigestEntity } from '../../../../domain/entities/digest.entity.js';
import { DigestIdVO } from '../../../../domain/value-objects/primitives/digest-id.vo.js';
import { DigestStatusVO } from '../../../../domain/value-objects/primitives/digest-status.vo.js';
import { DigestFrequencyVO } from '../../../../domain/value-objects/primitives/digest-frequency.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { DigestPrismaMapper } from '../mappers/digest.prisma.mapper.js';

@Injectable()
export class DigestPrismaRepository implements DigestRepository {
  private readonly logger = new Logger(DigestPrismaRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<DigestEntity | null> {
    return this.findByIdVO(DigestIdVO.reconstitute(id));
  }

  async findByIdVO(id: DigestIdVO): Promise<DigestEntity | null> {
    const row = await this.prisma.notificationDigest.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return row ? DigestPrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly DigestEntity[]> {
    const rows = await this.prisma.notificationDigest.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => DigestPrismaMapper.toDomain(r));
  }

  async findByUserId(userId: UserIdVO): Promise<readonly DigestEntity[]> {
    const rows = await this.prisma.notificationDigest.findMany({
      where: { userId: userId.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => DigestPrismaMapper.toDomain(r));
  }

  async findByStatus(status: DigestStatusVO): Promise<readonly DigestEntity[]> {
    const rows = await this.prisma.notificationDigest.findMany({
      where: { status: status.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => DigestPrismaMapper.toDomain(r));
  }

  async findByFrequency(
    frequency: DigestFrequencyVO,
  ): Promise<readonly DigestEntity[]> {
    const rows = await this.prisma.notificationDigest.findMany({
      where: { frequency: frequency.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => DigestPrismaMapper.toDomain(r));
  }

  async findLatestByUserId(userId: UserIdVO): Promise<DigestEntity | null> {
    const row = await this.prisma.notificationDigest.findFirst({
      where: { userId: userId.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return row ? DigestPrismaMapper.toDomain(row) : null;
  }

  async findPaginated(options: DigestListOptions): Promise<DigestPaginationResult> {
    const where = this.buildWhere(options);
    const orderBy = this.buildOrderBy(options);

    const [rows, total] = await Promise.all([
      this.prisma.notificationDigest.findMany({
        where,
        orderBy,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.prisma.notificationDigest.count({ where }),
    ]);

    return {
      items: rows.map((r) => DigestPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async findReadyToSend(): Promise<readonly DigestEntity[]> {
    const rows = await this.prisma.notificationDigest.findMany({
      where: { status: 'ready', deletedAt: null },
      orderBy: { periodStart: 'asc' },
    });
    return rows.map((r) => DigestPrismaMapper.toDomain(r));
  }

  async save(entity: DigestEntity): Promise<DigestEntity> {
    const data = DigestPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.notificationDigest.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.prisma.notificationDigest.update({
        where: { id: entity.id },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: data as any,
      });
      return DigestPrismaMapper.toDomain(updated);
    }

    const created = await this.prisma.notificationDigest.create({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: data as any,
    });
    return DigestPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.notificationDigest.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.notificationDigest.count({ where: { id } });
    return count > 0;
  }

  private buildWhere(options: DigestListOptions): Record<string, unknown> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.userId) where['userId'] = f.userId;
    if (f.status) where['status'] = f.status;
    if (f.frequency) where['frequency'] = f.frequency;
    if (f.fromDate || f.toDate) {
      where['periodStart'] = {
        ...(f.fromDate ? { gte: new Date(f.fromDate) } : {}),
        ...(f.toDate ? { lte: new Date(f.toDate) } : {}),
      };
    }
    return where;
  }

  private buildOrderBy(
    options: DigestListOptions,
  ): Record<string, 'asc' | 'desc'> {
    const dir = options.sortDir ?? 'desc';
    const field = options.sortBy ?? 'createdAt';
    return { [field]: dir };
  }
}
