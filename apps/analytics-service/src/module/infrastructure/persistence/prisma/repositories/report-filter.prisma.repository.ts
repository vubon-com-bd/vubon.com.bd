/**
 * Report Filter Prisma Repository
 * @module analytics-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AnalyticsBasePrismaRepository } from '../base.prisma.repository.js';
import { AnalyticsPrismaService } from '../prisma.service.js';
import { ReportFilterEntity } from '../../../../domain/entities/report-filter.entity.js';
import { ReportIdVO } from '../../../../domain/value-objects/primitives/report-id.vo.js';
import { ReportFilterVO } from '../../../../domain/value-objects/composites/report-filter.vo.js';
import type { ReportFilterRepository as IReportFilterRepository } from '../../../../domain/repositories/report-filter.repository.interface.js';

type PrismaReportFilterRow = {
  id: string;
  reportId: string;
  logic: string;
  conditions: unknown;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class ReportFilterPrismaRepository
  extends AnalyticsBasePrismaRepository<ReportFilterEntity, PrismaReportFilterRow, string>
  implements IReportFilterRepository
{
  protected readonly delegateName = 'analyticsReportFilter';

  constructor(prisma: AnalyticsPrismaService) {
    super(prisma);
  }

  protected toDomain(raw: PrismaReportFilterRow): ReportFilterEntity {
    return ReportFilterEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      props: {
        reportId: ReportIdVO.create(raw.reportId),
        filter: ReportFilterVO.create({
          logic: raw.logic as never,
          conditions: (Array.isArray(raw.conditions) ? raw.conditions : []) as never,
        }),
      },
    });
  }

  protected toPersistence(domain: ReportFilterEntity): Record<string, unknown> {
    return {
      id: domain.id,
      reportId: domain.reportId.value,
      logic: domain.filter.logic,
      conditions: domain.filter.conditions,
    };
  }

  protected idOf(domain: ReportFilterEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  async findByReportId(reportId: ReportIdVO): Promise<readonly ReportFilterEntity[]> {
    const rows = await this.model.findMany({
      where: { reportId: reportId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async deleteByReportId(reportId: ReportIdVO): Promise<number> {
    const result = await this.model.deleteMany({
      where: { reportId: reportId.value },
    });
    return result.count;
  }

  async existsByReportId(reportId: ReportIdVO): Promise<boolean> {
    const count = await this.model.count({
      where: { reportId: reportId.value },
    });
    return count > 0;
  }
}
