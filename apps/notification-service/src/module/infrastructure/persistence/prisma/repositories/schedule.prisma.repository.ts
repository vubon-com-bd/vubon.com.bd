import { Injectable } from '@nestjs/common';
import { Schedule as PrismaSchedule } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { ScheduleEntity } from '../../../../domain/entities/schedule.entity';
import { ScheduleIdVO } from '../../../../domain/value-objects/primitives/schedule-id.vo';
import { ScheduleStatusVO } from '../../../../domain/value-objects/primitives/schedule-status.vo';
import { ScheduleTypeVO } from '../../../../domain/value-objects/primitives/schedule-type.vo';
import { ScheduleFrequencyVO } from '../../../../domain/value-objects/primitives/schedule-frequency.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { ScheduleRepository } from '../../../../domain/repositories/schedule.repository.interface';

@Injectable()
export class SchedulePrismaRepository
  extends BasePrismaRepository<ScheduleEntity, ScheduleIdVO>
  implements ScheduleRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaSchedule): ScheduleEntity {
    return ScheduleEntity.reconstitute(
      ScheduleIdVO.create(raw.id),
      {
        userId: UserIdVO.create(raw.userId),
        type: ScheduleTypeVO.create(raw.type),
        status: ScheduleStatusVO.create(raw.status),
        frequency: ScheduleFrequencyVO.create(raw.frequency),
        nextRunAt: raw.nextRunAt,
        lastRunAt: raw.lastRunAt,
        payload: (raw.payload ?? {}) as Record<string, unknown>,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: ScheduleIdVO): Promise<ScheduleEntity | null> {
    const raw = await this.prisma.schedule.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ScheduleEntity[]> {
    const rows = await this.prisma.schedule.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ScheduleEntity): Promise<ScheduleEntity> {
    const data = {
      userId: entity.userId.value,
      type: entity.type.value,
      status: entity.status.value,
      frequency: entity.frequency.value,
      nextRunAt: entity.nextRunAt,
      lastRunAt: entity.lastRunAt,
      payload: entity.payload as object,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.schedule.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: ScheduleIdVO): Promise<void> {
    await this.prisma.schedule.delete({ where: { id: id.value } });
  }

  async findDue(now: Date, limit: number = 100): Promise<readonly ScheduleEntity[]> {
    const rows = await this.prisma.schedule.findMany({
      where: { nextRunAt: { lte: now }, status: 'active' },
      orderBy: { nextRunAt: 'asc' },
      take: limit,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findActive(): Promise<readonly ScheduleEntity[]> {
    const rows = await this.prisma.schedule.findMany({
      where: { status: 'active' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByUser(userId: UserIdVO): Promise<readonly ScheduleEntity[]> {
    const rows = await this.prisma.schedule.findMany({
      where: { userId: userId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
