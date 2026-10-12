/**
 * Funnel Analysis Prisma Repository
 * @module analytics-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AnalyticsBasePrismaRepository } from '../base.prisma.repository.js';
import { AnalyticsPrismaService } from '../prisma.service.js';
import { FunnelAnalysisEntity } from '../../../../domain/entities/funnel-analysis.entity.js';
import { FunnelAnalysisVO } from '../../../../domain/value-objects/composites/funnel-analysis.vo.js';
import { FunnelIdVO } from '../../../../domain/value-objects/primitives/funnel-id.vo.js';
import { TimeRangeVO } from '../../../../domain/value-objects/composites/time-range.vo.js';
import { EventTimestampVO } from '../../../../domain/value-objects/primitives/event-timestamp.vo.js';
import type { FunnelAnalysisRepository as IFunnelAnalysisRepository } from '../../../../domain/repositories/funnel-analysis.repository.interface.js';

type PrismaFunnelAnalysisRow = {
  id: string;
  funnelId: string;
  stepCounts: unknown;
  entryCount: number;
  finalCount: number;
  conversionRate: { toString(): string } | number;
  analyzedAt: Date;
  createdAt: Date;
};

@Injectable()
export class FunnelAnalysisPrismaRepository
  extends AnalyticsBasePrismaRepository<FunnelAnalysisEntity, PrismaFunnelAnalysisRow, string>
  implements IFunnelAnalysisRepository
{
  protected readonly delegateName = 'analyticsFunnelAnalysis';

  constructor(prisma: AnalyticsPrismaService) {
    super(prisma);
  }

  protected toDomain(raw: PrismaFunnelAnalysisRow): FunnelAnalysisEntity {
    const stepCounts = Array.isArray(raw.stepCounts) ? (raw.stepCounts as number[]) : [];
    return FunnelAnalysisEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.createdAt.toISOString(),
      props: {
        analysis: FunnelAnalysisVO.create({
          funnelId: FunnelIdVO.create(raw.funnelId),
          stepCounts,
        }),
        analyzedAt: raw.analyzedAt.toISOString(),
      },
    });
  }

  protected toPersistence(domain: FunnelAnalysisEntity): Record<string, unknown> {
    return {
      id: domain.id,
      funnelId: domain.analysis.funnelId.value,
      stepCounts: domain.analysis.stepCounts,
      entryCount: domain.analysis.entryCount(),
      finalCount: domain.analysis.finalCount(),
      conversionRate: domain.analysis.overallConversionRate(),
      analyzedAt: new Date(domain.analyzedAt),
    };
  }

  protected idOf(domain: FunnelAnalysisEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  async findByFunnelId(funnelId: FunnelIdVO): Promise<readonly FunnelAnalysisEntity[]> {
    const rows = await this.model.findMany({
      where: { funnelId: funnelId.value },
      orderBy: { analyzedAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findLatestByFunnel(funnelId: FunnelIdVO): Promise<FunnelAnalysisEntity | null> {
    const raw = await this.model.findFirst({
      where: { funnelId: funnelId.value },
      orderBy: { analyzedAt: 'desc' },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findByFunnelInRange(
    funnelId: FunnelIdVO,
    range: TimeRangeVO
  ): Promise<readonly FunnelAnalysisEntity[]> {
    const rows = await this.model.findMany({
      where: {
        funnelId: funnelId.value,
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
