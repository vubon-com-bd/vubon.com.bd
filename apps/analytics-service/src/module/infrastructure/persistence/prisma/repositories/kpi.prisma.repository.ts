/**
 * KPI Prisma Repository
 * @module analytics-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AnalyticsBasePrismaRepository } from '../base.prisma.repository.js';
import { AnalyticsPrismaService } from '../prisma.service.js';
import { KpiEntity } from '../../../../domain/entities/kpi.entity.js';
import { KpiIdVO } from '../../../../domain/value-objects/primitives/kpi-id.vo.js';
import { KpiNameVO } from '../../../../domain/value-objects/primitives/kpi-name.vo.js';
import { KpiTargetVO } from '../../../../domain/value-objects/primitives/kpi-target.vo.js';
import { KpiThresholdVO } from '../../../../domain/value-objects/primitives/kpi-threshold.vo.js';
import { MetricNameVO } from '../../../../domain/value-objects/primitives/metric-name.vo.js';
import type { KpiRepository as IKpiRepository } from '../../../../domain/repositories/kpi.repository.interface.js';

type PrismaKpiRow = {
  id: string;
  name: string;
  metric: string;
  target: { toString(): string } | number;
  thresholdPercent: { toString(): string } | number;
  higherIsBetter: boolean;
  isActive: boolean;
  lastActualValue: { toString(): string } | number | null;
  lastEvaluatedAt: Date | null;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

function toNumber(v: { toString(): string } | number | null): number | undefined {
  if (v === null) return undefined;
  return typeof v === 'number' ? v : Number(v.toString());
}

@Injectable()
export class KpiPrismaRepository
  extends AnalyticsBasePrismaRepository<KpiEntity, PrismaKpiRow, string>
  implements IKpiRepository
{
  protected readonly delegateName = 'analyticsKpi';

  constructor(prisma: AnalyticsPrismaService) {
    super(prisma);
  }

  protected toDomain(raw: PrismaKpiRow): KpiEntity {
    return KpiEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      props: {
        name: KpiNameVO.create(raw.name),
        target: KpiTargetVO.create(toNumber(raw.target) ?? 0),
        threshold: KpiThresholdVO.create(toNumber(raw.thresholdPercent) ?? 0),
        metric: MetricNameVO.create(raw.metric),
        higherIsBetter: raw.higherIsBetter,
        isActive: raw.isActive,
        lastActualValue: toNumber(raw.lastActualValue),
        lastEvaluatedAt: raw.lastEvaluatedAt?.toISOString(),
      },
    });
  }

  protected toPersistence(domain: KpiEntity): Record<string, unknown> {
    return {
      id: domain.id,
      name: domain.name.value,
      metric: domain.metric.value,
      target: domain.target.numeric,
      thresholdPercent: domain.threshold.percent,
      higherIsBetter: domain.higherIsBetter,
      isActive: domain.isActive,
      lastActualValue: domain.lastActualValue ?? null,
      lastEvaluatedAt: domain.lastEvaluatedAt ? new Date(domain.lastEvaluatedAt) : null,
      version: domain.version,
    };
  }

  protected idOf(domain: KpiEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  async findByKpiId(id: KpiIdVO): Promise<KpiEntity | null> {
    const raw = await this.model.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findByMetric(metric: MetricNameVO): Promise<readonly KpiEntity[]> {
    const rows = await this.model.findMany({
      where: { metric: metric.value, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findAllActive(): Promise<readonly KpiEntity[]> {
    const rows = await this.model.findMany({
      where: { isActive: true, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findInactive(): Promise<readonly KpiEntity[]> {
    const rows = await this.model.findMany({
      where: { isActive: false, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
