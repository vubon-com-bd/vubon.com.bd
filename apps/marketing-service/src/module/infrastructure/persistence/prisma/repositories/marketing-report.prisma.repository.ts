import { Injectable } from '@nestjs/common';
import { MarketingReport as PrismaMarketingReport } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { MarketingReportEntity } from '../../../../domain/entities/marketing-report.entity';
import { MarketingReportIdVO } from '../../../../domain/value-objects/primitives/marketing-report-id.vo';
import { ReportTypeVO } from '../../../../domain/value-objects/primitives/report-type.vo';
import { ReportFormatVO } from '../../../../domain/value-objects/primitives/report-format.vo';
import type { MarketingReportRepository } from '../../../../domain/repositories/marketing-report.repository.interface';

@Injectable()
export class MarketingReportPrismaRepository
  extends BasePrismaRepository<MarketingReportEntity, MarketingReportIdVO>
  implements MarketingReportRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaMarketingReport): MarketingReportEntity {
    return MarketingReportEntity.reconstitute(
      MarketingReportIdVO.create(raw.id),
      {
        name: raw.name,
        type: ReportTypeVO.create(raw.type),
        format: ReportFormatVO.create(raw.format),
        generatedAt: raw.generatedAt,
        data: (raw.data ?? null) as Readonly<Record<string, unknown>> | null,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: MarketingReportIdVO): Promise<MarketingReportEntity | null> {
    const raw = await this.prisma.marketingReport.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly MarketingReportEntity[]> {
    const rows = await this.prisma.marketingReport.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: MarketingReportEntity): Promise<MarketingReportEntity> {
    const data = {
      name: entity.name,
      type: entity.type.value,
      format: entity.format.value,
      generatedAt: entity.generatedAt,
      data: (entity.data ?? null) as never,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.marketingReport.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: MarketingReportIdVO): Promise<void> {
    await this.prisma.marketingReport.delete({ where: { id: id.value } });
  }

  async findByType(type: ReportTypeVO): Promise<readonly MarketingReportEntity[]> {
    const rows = await this.prisma.marketingReport.findMany({ where: { type: type.value } });
    return rows.map((r) => this.toDomain(r));
  }
}
