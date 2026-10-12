/**
 * KPI Result Prisma Repository
 * @module analytics-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AnalyticsBasePrismaRepository } from '../base.prisma.repository.js';
import { AnalyticsPrismaService } from '../prisma.service.js';
import { KpiResultEntity } from '../../../../domain/entities/kpi-result.entity.js';
import { KpiResultVO } from '../../../../domain/value-objects/composites/kpi-result.vo.js';
import { KpiIdVO } from '../../../../domain/value-objects/primitives/kpi-id.vo.js';
import { TimeRangeVO } from '../../../../domain/value-objects/composites/time-range.vo.js';
import { EventTimestampVO } from '../../../../domain/value-objects/primitives/event-timestamp.vo.js';
import type { KpiResultRepository as IKpiResultRepository } from '../../../../domain/repositories/kpi-result.repository.interface.js';

type PrismaKpiResultRow = {
  id: string;
  kpiId: string;
  actual: { toString(): string } | number;
  target: { toString(): string } | number;
  achievementPercent: { toString(): string } | number;
  status: string;
  evaluatedAt: Date;
  createdAt: Date;
};

function toNumber(v: { toString(): string } | number): number {
  return typeof v === 'number' ? v : Number(v.toString());
}

@Injectable()
export class KpiResultPrismaRepository
  extends AnalyticsBasePrismaRepository<KpiResultEntity, PrismaKpiResultRow, string>
  implements IKpiResultRepository
{
  protected readonly delegateName = 'analyticsKpiResult';

  constructor(prisma: AnalyticsPrismaService) {
    super(prisma);
  }

  protected toDomain(raw: PrismaKpiResultRow): KpiResultEntity {
    return KpiResultEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.createdAt.toISOString(),
      props: {
        result: KpiResultVO.evaluate({
          kpiId: KpiIdVO.create(raw.kpiId),
          actual: toNumber(raw.actual),
          target: toNumber(raw.target),
          thresholdPercent: toNumber(raw.achievementPercent),
        }),
        evaluatedAt: raw.evaluatedAt.toISOString(),
      },
    });
  }

  protected toPersistence(domain: KpiResultEntity): Record<string, unknown> {
    return {
      id: domain.id,
      kpiId: domain.result.kpiId.value,
      actual: domain.result.actual,
      target: domain.result.target,
      achievementPercent: domain.result.achievementPercent,
      status: domain.result.status,
      evaluatedAt: new Date(domain.evaluatedAt),
    };
  }

  protected idOf(domain: KpiResultEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  async findByKpiId(kpiId: KpiIdVO): Promise<readonly KpiResultEntity[]> {
    const rows = await this.model.findMany({
      where: { kpiId: kpiId.value },
      orderBy: { evaluatedAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByKpiInRange(
    kpiId: KpiIdVO,
    range: TimeRangeVO
  ): Promise<readonly KpiResultEntity[]> {
    const rows = await this.model.findMany({
      where: {
        kpiId: kpiId.value,
        evaluatedAt: {
          gte: new Date(range.startAt.value.epochMs),
          lte: new Date(range.endAt.value.epochMs),
        },
      },
      orderBy: { evaluatedAt: 'asc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findLatestByKpi(kpiId: KpiIdVO): Promise<KpiResultEntity | null> {
    const raw = await this.model.findFirst({
      where: { kpiId: kpiId.value },
      orderBy: { evaluatedAt: 'desc' },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findBreached(limit: number): Promise<readonly KpiResultEntity[]> {
    const rows = await this.model.findMany({
      where: { status: 'breached' },
      orderBy: { evaluatedAt: 'desc' },
      take: limit,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async deleteOlderThan(cutoff: string): Promise<number> {
    const result = await this.model.deleteMany({
      where: { evaluatedAt: { lt: new Date(cutoff) } },
    });
    return result.count;
  }
}
