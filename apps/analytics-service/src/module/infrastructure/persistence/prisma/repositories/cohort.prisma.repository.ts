import { Injectable } from '@nestjs/common';
import { Cohort as PrismaCohort, Prisma } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { CohortEntity } from '../../../../domain/entities/cohort.entity';
import { CohortIdVO } from '../../../../domain/value-objects/primitives/cohort-id.vo';
import { CohortNameVO } from '../../../../domain/value-objects/primitives/cohort-name.vo';
import { CohortPeriodVO } from '../../../../domain/value-objects/primitives/cohort-period.vo';
import type { CohortRepository } from '../../../../domain/repositories/cohort.repository.interface';

@Injectable()
export class CohortPrismaRepository
  extends BasePrismaRepository<CohortEntity, CohortIdVO>
  implements CohortRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaCohort): CohortEntity {
    const userIds = (raw.userIds as readonly string[]) ?? [];
    return CohortEntity.reconstitute(
      CohortIdVO.create(raw.id),
      {
        name: CohortNameVO.create(raw.name),
        period: CohortPeriodVO.create(raw.period),
        startDate: raw.startDate,
        endDate: raw.endDate,
        userIds: [...userIds],
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: CohortIdVO): Promise<CohortEntity | null> {
    const raw = await this.prisma.cohort.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly CohortEntity[]> {
    const rows = await this.prisma.cohort.findMany({
      where: { deletedAt: null },
      orderBy: { startDate: 'desc' },
      take: 1000,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: CohortEntity): Promise<CohortEntity> {
    const data = {
      name: entity.name.value,
      period: entity.period.value,
      startDate: entity.startDate,
      endDate: entity.endDate,
      userIds: [...entity.userIds] as Prisma.InputJsonValue,
      bucketKey: entity.bucketKey,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.cohort.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: CohortIdVO): Promise<void> {
    await this.prisma.cohort.delete({ where: { id: id.value } });
  }

  async findByPeriod(period: CohortPeriodVO): Promise<readonly CohortEntity[]> {
    const rows = await this.prisma.cohort.findMany({
      where: { period: period.value, deletedAt: null },
      orderBy: { startDate: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByBucketKey(bucketKey: string): Promise<CohortEntity | null> {
    const raw = await this.prisma.cohort.findFirst({
      where: { bucketKey, deletedAt: null },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findContainingUser(userId: string): Promise<readonly CohortEntity[]> {
    const rows = await this.prisma.cohort.findMany({
      where: {
        deletedAt: null,
        userIds: { array_contains: [userId] },
      } as unknown as Prisma.CohortWhereInput,
    });
    return rows.map((r) => this.toDomain(r));
  }
}
