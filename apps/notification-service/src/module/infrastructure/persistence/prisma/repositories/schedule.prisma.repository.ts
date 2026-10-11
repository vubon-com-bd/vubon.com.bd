/**
 * SchedulePrismaRepository — implements ScheduleRepository
 * @module notification-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  ScheduleRepository,
  ScheduleListOptions,
  SchedulePaginationResult,
} from '../../../../domain/repositories/schedule.repository.interface.js';
import { ScheduleEntity } from '../../../../domain/entities/schedule.entity.js';
import { ScheduleIdVO } from '../../../../domain/value-objects/primitives/schedule-id.vo.js';
import { ScheduleStatusVO } from '../../../../domain/value-objects/primitives/schedule-status.vo.js';
import { ScheduleTypeVO } from '../../../../domain/value-objects/primitives/schedule-type.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { SchedulePrismaMapper } from '../mappers/schedule.prisma.mapper.js';

@Injectable()
export class SchedulePrismaRepository implements ScheduleRepository {
  private readonly logger = new Logger(SchedulePrismaRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<ScheduleEntity | null> {
    return this.findByIdVO(ScheduleIdVO.reconstitute(id));
  }

  async findByIdVO(id: ScheduleIdVO): Promise<ScheduleEntity | null> {
    const row = await this.prisma.notificationSchedule.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return row ? SchedulePrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly ScheduleEntity[]> {
    const rows = await this.prisma.notificationSchedule.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => SchedulePrismaMapper.toDomain(r));
  }

  async findByUserId(userId: UserIdVO): Promise<readonly ScheduleEntity[]> {
    const rows = await this.prisma.notificationSchedule.findMany({
      where: { userId: userId.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => SchedulePrismaMapper.toDomain(r));
  }

  async findByStatus(status: ScheduleStatusVO): Promise<readonly ScheduleEntity[]> {
    const rows = await this.prisma.notificationSchedule.findMany({
      where: { status: status.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => SchedulePrismaMapper.toDomain(r));
  }

  async findByType(type: ScheduleTypeVO): Promise<readonly ScheduleEntity[]> {
    const rows = await this.prisma.notificationSchedule.findMany({
      where: { type: type.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => SchedulePrismaMapper.toDomain(r));
  }

  async findPaginated(options: ScheduleListOptions): Promise<SchedulePaginationResult> {
    const where = this.buildWhere(options);
    const orderBy = this.buildOrderBy(options);

    const [rows, total] = await Promise.all([
      this.prisma.notificationSchedule.findMany({
        where,
        orderBy,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.prisma.notificationSchedule.count({ where }),
    ]);

    return {
      items: rows.map((r) => SchedulePrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async findDue(at: Date = new Date()): Promise<readonly ScheduleEntity[]> {
    const rows = await this.prisma.notificationSchedule.findMany({
      where: {
        status: 'active',
        nextOccurrenceAt: { lte: at },
        deletedAt: null,
      },
    });
    return rows.map((r) => SchedulePrismaMapper.toDomain(r));
  }

  async findUpcoming(withinMinutes: number): Promise<readonly ScheduleEntity[]> {
    const now = new Date();
    const cutoff = new Date(now.getTime() + withinMinutes * 60 * 1000);
    const rows = await this.prisma.notificationSchedule.findMany({
      where: {
        status: 'active',
        nextOccurrenceAt: { gte: now, lte: cutoff },
        deletedAt: null,
      },
    });
    return rows.map((r) => SchedulePrismaMapper.toDomain(r));
  }

  async save(entity: ScheduleEntity): Promise<ScheduleEntity> {
    const data = SchedulePrismaMapper.toPersistence(entity);
    const existing = await this.prisma.notificationSchedule.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.prisma.notificationSchedule.update({
        where: { id: entity.id },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: data as any,
      });
      return SchedulePrismaMapper.toDomain(updated);
    }

    const created = await this.prisma.notificationSchedule.create({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: data as any,
    });
    return SchedulePrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.notificationSchedule.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.notificationSchedule.count({ where: { id } });
    return count > 0;
  }

  private buildWhere(options: ScheduleListOptions): Record<string, unknown> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.userId) where['userId'] = f.userId;
    if (f.type) where['type'] = f.type;
    if (f.status) where['status'] = f.status;
    if (f.templateId) where['notificationTemplateId'] = f.templateId;
    if (f.fromDate || f.toDate) {
      where['scheduledAt'] = {
        ...(f.fromDate ? { gte: new Date(f.fromDate) } : {}),
        ...(f.toDate ? { lte: new Date(f.toDate) } : {}),
      };
    }
    return where;
  }

  private buildOrderBy(
    options: ScheduleListOptions,
  ): Record<string, 'asc' | 'desc'> {
    const dir = options.sortDir ?? 'desc';
    const field = options.sortBy ?? 'createdAt';
    return { [field]: dir };
  }
}
