import { Injectable } from '@nestjs/common';
import { CampaignPerformance as PrismaCampaignPerformance } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { CampaignPerformanceEntity } from '../../../../domain/entities/campaign-performance.entity';
import { CampaignPerformanceVO } from '../../../../domain/value-objects/composites/campaign-performance.vo';
import { CampaignIdVO } from '../../../../domain/value-objects/primitives/campaign-id.vo';
import { AnalyticsMetricVO } from '../../../../domain/value-objects/primitives/analytics-metric.vo';
import { AnalyticsGranularityVO } from '../../../../domain/value-objects/primitives/analytics-granularity.vo';
import type { CampaignPerformanceRepository } from '../../../../domain/repositories/campaign-performance.repository.interface';

@Injectable()
export class CampaignPerformancePrismaRepository
  extends BasePrismaRepository<CampaignPerformanceEntity, string>
  implements CampaignPerformanceRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaCampaignPerformance): CampaignPerformanceEntity {
    return CampaignPerformanceEntity.reconstitute(
      raw.id,
      {
        campaignId: CampaignIdVO.create(raw.campaignId),
        performance: CampaignPerformanceVO.create({
          metric: AnalyticsMetricVO.create(raw.metric),
          numericValue: raw.value,
          granularity: AnalyticsGranularityVO.create(raw.granularity),
          recordedAt: raw.recordedAt,
        }),
      },
      raw.createdAt.toISOString(),
      raw.createdAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<CampaignPerformanceEntity | null> {
    const raw = await this.prisma.campaignPerformance.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly CampaignPerformanceEntity[]> {
    const rows = await this.prisma.campaignPerformance.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: CampaignPerformanceEntity): Promise<CampaignPerformanceEntity> {
    const data = {
      campaignId: entity.campaignId.value,
      metric: entity.performance.metric.value,
      value: entity.performance.value_,
      granularity: entity.performance.granularity.value,
      recordedAt: entity.performance.recordedAt,
    };
    const raw = await this.prisma.campaignPerformance.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.campaignPerformance.delete({ where: { id } });
  }

  async findByCampaignId(campaignId: CampaignIdVO): Promise<readonly CampaignPerformanceEntity[]> {
    const rows = await this.prisma.campaignPerformance.findMany({
      where: { campaignId: campaignId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
