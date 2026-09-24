import { Injectable } from '@nestjs/common';
import { ReportFilter as PrismaReportFilter, Prisma } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { ReportFilterEntity } from '../../../../domain/entities/report-filter.entity';
import { ReportIdVO } from '../../../../domain/value-objects/primitives/report-id.vo';
import {
  ReportFilterVO,
  type ReportFilterValue,
} from '../../../../domain/value-objects/composites/report-filter.vo';
import type { ReportFilterRepository } from '../../../../domain/repositories/report-filter.repository.interface';

@Injectable()
export class ReportFilterPrismaRepository
  extends BasePrismaRepository<ReportFilterEntity, string>
  implements ReportFilterRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomainGroup(
    reportId: ReportIdVO,
    rows: readonly PrismaReportFilter[],
  ): ReportFilterEntity {
    const filters = rows.map((r) =>
      ReportFilterVO.create({
        field: r.field,
        operator: r.operator,
        filterValue: r.valueJson as ReportFilterValue,
      }),
    );
    const logic = (rows[0]?.logic ?? 'and') as 'and' | 'or';

    return ReportFilterEntity.reconstitute(
      reportId.value,
      {
        reportId,
        filters,
        logic,
      },
      rows[0]?.createdAt.toISOString() ?? new Date().toISOString(),
      rows[0]?.updatedAt.toISOString() ?? new Date().toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<ReportFilterEntity | null> {
    const raw = await this.prisma.reportFilter.findUnique({ where: { id } });
    if (!raw) return null;
    return this.toDomainGroup(ReportIdVO.create(raw.reportId), [raw]);
  }

  async findAll(): Promise<readonly ReportFilterEntity[]> {
    const rows = await this.prisma.reportFilter.findMany({
      where: { deletedAt: null },
      take: 1000,
    });
    return rows.map((r) =>
      this.toDomainGroup(ReportIdVO.create(r.reportId), [r]),
    );
  }

  async save(entity: ReportFilterEntity): Promise<ReportFilterEntity> {
    await this.prisma.reportFilter.deleteMany({
      where: { reportId: entity.reportId.value },
    });
    for (const f of entity.filters) {
      const data = {
        reportId: entity.reportId.value,
        field: f.field,
        operator: f.operator,
        valueJson: f.filterValue as unknown as Prisma.InputJsonValue,
        logic: entity.logic,
        updatedAt: new Date(),
      };
      await this.prisma.reportFilter.create({ data });
    }
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.reportFilter.delete({ where: { id } });
  }

  async findByReportId(reportId: ReportIdVO): Promise<readonly ReportFilterEntity[]> {
    const rows = await this.prisma.reportFilter.findMany({
      where: { reportId: reportId.value, deletedAt: null },
    });
    if (rows.length === 0) return [];
    return [this.toDomainGroup(reportId, rows)];
  }
}
