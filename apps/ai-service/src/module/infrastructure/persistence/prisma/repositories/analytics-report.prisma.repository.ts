import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import type { AiAnalyticsReport as PrismaReport } from '@prisma/client';
import { AnalyticsReportEntity } from '../../../../domain/entities/analytics-report.entity';
import type { AnalyticsReportRepository } from '../../../../domain/repositories/analytics-report.repository.interface';
import { AiAnalyticsIdVO } from '../../../../domain/value-objects/primitives/ai-analytics-id.vo';
import { AnalyticsTypeVO } from '../../../../domain/value-objects/primitives/analytics-type.vo';
import { AnalyticsReportVO } from '../../../../domain/value-objects/composites/analytics-report.vo';
import { PrismaService } from '../prisma.service';

interface ReportEntry {
  readonly metric: string;
  readonly value: number;
  readonly unit: string;
}

@Injectable()
export class AnalyticsReportPrismaRepository
  extends BasePrismaRepository<AnalyticsReportEntity, AiAnalyticsIdVO>
  implements AnalyticsReportRepository
{
  constructor(protected readonly prisma: PrismaService) { super(prisma); }

  private toDomain(raw: PrismaReport): AnalyticsReportEntity {
    const entries = (raw.entries as unknown as ReportEntry[]) ?? [];
    return AnalyticsReportEntity.reconstitute(
      AiAnalyticsIdVO.create(raw.analyticsId),
      {
        report: AnalyticsReportVO.create({
          type: AnalyticsTypeVO.create(raw.type),
          entries: entries.map((e) => ({
            metric: { value: e.metric } as never,
            value: e.value,
            unit: e.unit,
          })),
          periodStart: raw.periodStart,
          periodEnd: raw.periodEnd,
        }),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: AiAnalyticsIdVO): Promise<AnalyticsReportEntity | null> {
    const raw = await this.prisma.aiAnalyticsReport.findUnique({ where: { analyticsId: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly AnalyticsReportEntity[]> {
    const rows = await this.prisma.aiAnalyticsReport.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: AnalyticsReportEntity): Promise<AnalyticsReportEntity> {
    const data = {
      type: entity.report.type.value,
      entries: entity.report.entries.map((e) => ({
        metric: e.metric.value,
        value: e.value,
        unit: e.unit,
      })) as unknown as object,
      periodStart: entity.report.periodStart,
      periodEnd: entity.report.periodEnd,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.aiAnalyticsReport.upsert({
      where: { analyticsId: entity.id.value },
      create: { id: entity.id.value, analyticsId: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: AiAnalyticsIdVO): Promise<void> {
    await this.prisma.aiAnalyticsReport.delete({ where: { analyticsId: id.value } });
  }

  async findByAnalyticsId(analyticsId: AiAnalyticsIdVO): Promise<AnalyticsReportEntity | null> {
    const raw = await this.prisma.aiAnalyticsReport.findUnique({ where: { analyticsId: analyticsId.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findInPeriod(start: Date, end: Date): Promise<readonly AnalyticsReportEntity[]> {
    const rows = await this.prisma.aiAnalyticsReport.findMany({
      where: { periodStart: { gte: start }, periodEnd: { lte: end } },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
