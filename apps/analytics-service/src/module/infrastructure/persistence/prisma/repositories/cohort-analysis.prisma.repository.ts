/**
 * Cohort Analysis Prisma Repository
 * @module analytics-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AnalyticsBasePrismaRepository } from '../base.prisma.repository.js';
import { AnalyticsPrismaService } from '../prisma.service.js';
import { CohortAnalysisEntity } from '../../../../domain/entities/cohort-analysis.entity.js';
import { CohortAnalysisVO } from '../../../../domain/value-objects/composites/cohort-analysis.vo.js';
import { CohortIdVO } from '../../../../domain/value-objects/primitives/cohort-id.vo.js';
import { TimeRangeVO } from '../../../../domain/value-objects/composites/time-range.vo.js';
import { EventTimestampVO } from '../../../../domain/value-objects/primitives/event-timestamp.vo.js';
import type { CohortAnalysisRepository as ICohortAnalysisRepository } from '../../../../domain/repositories/cohort-analysis.repository.interface.js';

type PrismaCohortAnalysisRow = {
  id: string;
  cohortId: string;
  cohortSize: number;
  periodCount: number;
  rates: unknown;
  analyzedAt: Date;
  createdAt: Date;
};

@Injectable()
export class CohortAnalysisPrismaRepository
  extends AnalyticsBasePrismaRepository<CohortAnalysisEntity, PrismaCohortAnalysisRow, string>
  implements ICohortAnalysisRepository
{
  protected readonly delegateName = 'analyticsCohortAnalysis';

  constructor(prisma: AnalyticsPrismaService) {
    super(prisma);
  }

  protected toDomain(raw: PrismaCohortAnalysisRow): CohortAnalysisEntity {
    const rates = Array.isArray(raw.rates) ? (raw.rates as number[]) : [];
    return CohortAnalysisEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.createdAt.toISOString(),
      props: {
        analysis: CohortAnalysisVO.create({
          cohortId: CohortIdVO.create(raw.cohortId),
          cohortSize: raw.cohortSize,
          retentionRates: rates,
        }),
        analyzedAt: raw.analyzedAt.toISOString(),
      },
    });
  }

  protected toPersistence(domain: CohortAnalysisEntity): Record<string, unknown> {
    return {
      id: domain.id,
      cohortId: domain.analysis.cohortId.value,
      cohortSize: domain.analysis.cohortSize,
      periodCount: domain.analysis.periodCount(),
      rates: domain.analysis.retentionRates,
      analyzedAt: new Date(domain.analyzedAt),
    };
  }

  protected idOf(domain: CohortAnalysisEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  async findByCohortId(cohortId: CohortIdVO): Promise<readonly CohortAnalysisEntity[]> {
    const rows = await this.model.findMany({
      where: { cohortId: cohortId.value },
      orderBy: { analyzedAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findLatestByCohort(cohortId: CohortIdVO): Promise<CohortAnalysisEntity | null> {
    const raw = await this.model.findFirst({
      where: { cohortId: cohortId.value },
      orderBy: { analyzedAt: 'desc' },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findByCohortInRange(
    cohortId: CohortIdVO,
    range: TimeRangeVO
  ): Promise<readonly CohortAnalysisEntity[]> {
    const rows = await this.model.findMany({
      where: {
        cohortId: cohortId.value,
        analyzedAt: {
          gte: new Date(range.startAt.value.epochMs),
          lte: new Date(range.endAt.value.epochMs),
        },
      },
      orderBy: { analyzedAt: 'asc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async deleteOlderThan(cutoff: string): Promise<number> {
    const result = await this.model.deleteMany({
      where: { analyzedAt: { lt: new Date(cutoff) } },
    });
    return result.count;
  }
}
