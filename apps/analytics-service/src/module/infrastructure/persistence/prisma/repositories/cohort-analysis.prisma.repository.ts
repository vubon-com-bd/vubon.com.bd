import { Injectable } from '@nestjs/common';
import { CohortAnalysis as PrismaCohortAnalysis, Prisma } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { CohortAnalysisEntity } from '../../../../domain/entities/cohort-analysis.entity';
import { CohortIdVO } from '../../../../domain/value-objects/primitives/cohort-id.vo';
import type { CohortAnalysisRepository } from '../../../../domain/repositories/cohort-analysis.repository.interface';

@Injectable()
export class CohortAnalysisPrismaRepository
  extends BasePrismaRepository<CohortAnalysisEntity, string>
  implements CohortAnalysisRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaCohortAnalysis): CohortAnalysisEntity {
    const retained = (raw.retainedJson as readonly number[]) ?? [];
    return CohortAnalysisEntity.reconstitute(
      raw.id,
      {
        cohortId: CohortIdVO.create(raw.cohortId),
        initialSize: raw.initialSize,
        retainedAtDay: [...retained],
        analyzedAt: raw.analyzedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<CohortAnalysisEntity | null> {
    const raw = await this.prisma.cohortAnalysis.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly CohortAnalysisEntity[]> {
    const rows = await this.prisma.cohortAnalysis.findMany({
      orderBy: { analyzedAt: 'desc' },
      take: 1000,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: CohortAnalysisEntity): Promise<CohortAnalysisEntity> {
    const data = {
      cohortId: entity.cohortId.value,
      initialSize: entity.initialSize,
      retainedJson: [...entity.retainedAtDay] as Prisma.InputJsonValue,
      day1Retention: entity.rateAt(1),
      day7Retention: entity.rateAt(7),
      day30Retention: entity.rateAt(30),
      analyzedAt: entity.analyzedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.cohortAnalysis.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.cohortAnalysis.delete({ where: { id } });
  }

  async findByCohortId(cohortId: CohortIdVO): Promise<readonly CohortAnalysisEntity[]> {
    const rows = await this.prisma.cohortAnalysis.findMany({
      where: { cohortId: cohortId.value },
      orderBy: { analyzedAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findLatestByCohortId(cohortId: CohortIdVO): Promise<CohortAnalysisEntity | null> {
    const raw = await this.prisma.cohortAnalysis.findFirst({
      where: { cohortId: cohortId.value },
      orderBy: { analyzedAt: 'desc' },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
