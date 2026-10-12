/**
 * Report Prisma Repository
 * @module analytics-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { AnalyticsBasePrismaRepository } from '../base.prisma.repository.js';
import { AnalyticsPrismaService } from '../prisma.service.js';
import { ReportEntity } from '../../../../domain/entities/report.entity.js';
import { ReportIdVO } from '../../../../domain/value-objects/primitives/report-id.vo.js';
import { ReportTypeVO } from '../../../../domain/value-objects/primitives/report-type.vo.js';
import { ReportFormatVO } from '../../../../domain/value-objects/primitives/report-format.vo.js';
import { ReportStatusVO } from '../../../../domain/value-objects/primitives/report-status.vo.js';
import { ReportFrequencyVO } from '../../../../domain/value-objects/primitives/report-frequency.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { EventTimestampVO } from '../../../../domain/value-objects/primitives/event-timestamp.vo.js';
import { TimeRangeVO } from '../../../../domain/value-objects/composites/time-range.vo.js';
import type { ReportRepository as IReportRepository } from '../../../../domain/repositories/report.repository.interface.js';

type PrismaReportRow = {
  id: string;
  name: string;
  type: string;
  format: string;
  status: string;
  frequency: string;
  ownerId: string;
  nextRunAt: Date | null;
  lastRunAt: Date | null;
  outputUrl: string | null;
  rowCount: number | null;
  failureReason: string | null;
  rangeStart: Date;
  rangeEnd: Date;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

@Injectable()
export class ReportPrismaRepository
  extends AnalyticsBasePrismaRepository<ReportEntity, PrismaReportRow, string>
  implements IReportRepository
{
  protected readonly delegateName = 'analyticsReport';

  constructor(prisma: AnalyticsPrismaService) {
    super(prisma);
  }

  protected toDomain(raw: PrismaReportRow): ReportEntity {
    return ReportEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      props: {
        name: raw.name,
        type: ReportTypeVO.create(raw.type),
        format: ReportFormatVO.create(raw.format),
        status: ReportStatusVO.create(raw.status),
        frequency: ReportFrequencyVO.create(raw.frequency),
        range: TimeRangeVO.create({
          startAt: EventTimestampVO.fromDate(raw.rangeStart),
          endAt: EventTimestampVO.fromDate(raw.rangeEnd),
        }),
        ownerId: UserIdVO.create(raw.ownerId),
        nextRunAt: raw.nextRunAt?.toISOString() ?? null,
        lastRunAt: raw.lastRunAt?.toISOString() ?? null,
        outputUrl: raw.outputUrl,
        rowCount: raw.rowCount ?? undefined,
        failureReason: raw.failureReason,
      },
    });
  }

  protected toPersistence(domain: ReportEntity): Record<string, unknown> {
    return {
      id: domain.id,
      name: domain.name,
      type: domain.type.value,
      format: domain.format.value,
      status: domain.status.value,
      frequency: domain.frequency.value,
      ownerId: domain.ownerId.value,
      nextRunAt: domain.nextRunAt ? new Date(domain.nextRunAt) : null,
      lastRunAt: domain.lastRunAt ? new Date(domain.lastRunAt) : null,
      outputUrl: domain.outputUrl ?? null,
      rowCount: domain.rowCount ?? null,
      failureReason: domain.failureReason ?? null,
      rangeStart: new Date(domain.range.startAt.value.epochMs),
      rangeEnd: new Date(domain.range.endAt.value.epochMs),
      version: domain.version,
    };
  }

  protected idOf(domain: ReportEntity): string {
    return domain.id;
  }

  protected whereForId(id: string): Record<string, unknown> {
    return { id };
  }

  async findByReportId(id: ReportIdVO): Promise<ReportEntity | null> {
    const raw = await this.model.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findByOwner(ownerId: UserIdVO): Promise<readonly ReportEntity[]> {
    const rows = await this.model.findMany({
      where: { ownerId: ownerId.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByStatus(status: ReportStatusVO): Promise<readonly ReportEntity[]> {
    const rows = await this.model.findMany({
      where: { status: status.value, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findDueForRun(now: string, limit: number): Promise<readonly ReportEntity[]> {
    const rows = await this.model.findMany({
      where: {
        nextRunAt: { lte: new Date(now) },
        status: 'pending',
        deletedAt: null,
      },
      orderBy: { nextRunAt: 'asc' },
      take: limit,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findScheduled(): Promise<readonly ReportEntity[]> {
    const rows = await this.model.findMany({
      where: {
        frequency: { not: 'once' },
        deletedAt: null,
      },
      orderBy: { nextRunAt: 'asc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async countByOwner(ownerId: UserIdVO): Promise<number> {
    return this.model.count({
      where: { ownerId: ownerId.value, deletedAt: null },
    });
  }
}
