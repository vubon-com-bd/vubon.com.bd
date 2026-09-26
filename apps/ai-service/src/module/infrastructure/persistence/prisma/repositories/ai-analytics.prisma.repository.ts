import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiAnalytics as PrismaAnalytics } from '@prisma/client';
import { AiAnalyticsEntity } from '../../../../domain/entities/ai-analytics.entity';
import type { AiAnalyticsRepository } from '../../../../domain/repositories/ai-analytics.repository.interface';
import { AiAnalyticsIdVO } from '../../../../domain/value-objects/primitives/ai-analytics-id.vo';
import { AnalyticsTypeVO } from '../../../../domain/value-objects/primitives/analytics-type.vo';
import { AnalyticsReportVO } from '../../../../domain/value-objects/composites/analytics-report.vo';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AiAnalyticsPrismaRepository
  extends BasePrismaRepository<AiAnalyticsEntity, AiAnalyticsIdVO>
  implements AiAnalyticsRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaAnalytics): AiAnalyticsEntity {
    return AiAnalyticsEntity.reconstitute(
      AiAnalyticsIdVO.create(raw.id),
      {
        type: AnalyticsTypeVO.create(raw.type),
        report: AnalyticsReportVO.create({
          type: AnalyticsTypeVO.create(raw.type),
          entries: [],
          periodStart: raw.createdAt,
          periodEnd: raw.updatedAt,
        }),
        modelId: raw.modelId,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: AiAnalyticsIdVO): Promise<AiAnalyticsEntity | null> {
    const raw = await this.prisma.aiAnalytics.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly AiAnalyticsEntity[]> {
    const rows = await this.prisma.aiAnalytics.findMany({ orderBy: { createdAt: 'desc' } });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: AiAnalyticsEntity): Promise<AiAnalyticsEntity> {
    const data = {
      type: entity.type.value,
      modelId: entity.modelId,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiAnalytics.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: AiAnalyticsIdVO): Promise<void> {
    await this.prisma.aiAnalytics.delete({ where: { id: id.value } });
  }

  async findByType(type: string): Promise<readonly AiAnalyticsEntity[]> {
    const rows = await this.prisma.aiAnalytics.findMany({
      where: { type },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByModelId(modelId: string): Promise<readonly AiAnalyticsEntity[]> {
    const rows = await this.prisma.aiAnalytics.findMany({
      where: { modelId },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findRecentByType(type: string, limit: number): Promise<readonly AiAnalyticsEntity[]> {
    const rows = await this.prisma.aiAnalytics.findMany({
      where: { type },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return rows.map((r) => this.toDomain(r));
  }
}
