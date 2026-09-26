import { Injectable } from '@nestjs/common';
import { MarketingAnalytics as PrismaMarketingAnalytics } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { MarketingAnalyticsEntity } from '../../../../domain/entities/marketing-analytics.entity';
import { AnalyticsMetricVO } from '../../../../domain/value-objects/primitives/analytics-metric.vo';
import { AnalyticsGranularityVO } from '../../../../domain/value-objects/primitives/analytics-granularity.vo';
import type { MarketingAnalyticsRepository } from '../../../../domain/repositories/marketing-analytics.repository.interface';

@Injectable()
export class MarketingAnalyticsPrismaRepository
  extends BasePrismaRepository<MarketingAnalyticsEntity, string>
  implements MarketingAnalyticsRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaMarketingAnalytics): MarketingAnalyticsEntity {
    return MarketingAnalyticsEntity.reconstitute(
      raw.id,
      {
        metric: AnalyticsMetricVO.create(raw.metric),
        value: raw.value,
        granularity: AnalyticsGranularityVO.create(raw.granularity),
        recordedAt: raw.recordedAt,
      },
      raw.createdAt.toISOString(),
      raw.createdAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<MarketingAnalyticsEntity | null> {
    const raw = await this.prisma.marketingAnalytics.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly MarketingAnalyticsEntity[]> {
    const rows = await this.prisma.marketingAnalytics.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: MarketingAnalyticsEntity): Promise<MarketingAnalyticsEntity> {
    const data = {
      metric: entity.metric.value,
      value: entity.value,
      granularity: entity.granularity.value,
      recordedAt: entity.recordedAt,
    };
    const raw = await this.prisma.marketingAnalytics.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.marketingAnalytics.delete({ where: { id } });
  }

  async findByMetric(metric: AnalyticsMetricVO): Promise<readonly MarketingAnalyticsEntity[]> {
    const rows = await this.prisma.marketingAnalytics.findMany({ where: { metric: metric.value } });
    return rows.map((r) => this.toDomain(r));
  }
}
