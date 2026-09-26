import { Injectable } from '@nestjs/common';
import { Report as PrismaReport } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { ReportEntity } from '../../../../domain/entities/report.entity';
import { ReportIdVO } from '../../../../domain/value-objects/primitives/report-id.vo';
import { ReportTypeVO } from '../../../../domain/value-objects/primitives/report-type.vo';
import { ReportFormatVO } from '../../../../domain/value-objects/primitives/report-format.vo';
import { ReportStatusVO } from '../../../../domain/value-objects/primitives/report-status.vo';
import { ReportFrequencyVO } from '../../../../domain/value-objects/primitives/report-frequency.vo';
import type { ReportRepository } from '../../../../domain/repositories/report.repository.interface';

@Injectable()
export class ReportPrismaRepository
  extends BasePrismaRepository<ReportEntity, ReportIdVO>
  implements ReportRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaReport): ReportEntity {
    return ReportEntity.reconstitute(
      ReportIdVO.create(raw.id),
      {
        type: ReportTypeVO.create(raw.type),
        format: ReportFormatVO.create(raw.format),
        status: ReportStatusVO.create(raw.status),
        frequency: raw.frequency ? ReportFrequencyVO.create(raw.frequency) : null,
        ownerId: raw.ownerId,
        generatedAt: raw.generatedAt,
        nextRunAt: raw.nextRunAt,
        rowCount: raw.rowCount,
        filterCount: raw.filterCount,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: ReportIdVO): Promise<ReportEntity | null> {
    const raw = await this.prisma.report.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ReportEntity[]> {
    const rows = await this.prisma.report.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: 1000,
    });
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ReportEntity): Promise<ReportEntity> {
    const data = {
      type: entity.type.value,
      format: entity.format.value,
      status: entity.status.value,
      frequency: entity.frequency?.value ?? null,
      ownerId: entity.ownerId,
      generatedAt: entity.generatedAt,
      nextRunAt: entity.nextRunAt,
      rowCount: entity.rowCount,
      filterCount: entity.filterCount,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.report.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: ReportIdVO): Promise<void> {
    await this.prisma.report.delete({ where: { id: id.value } });
  }

  async findByOwner(ownerId: string): Promise<readonly ReportEntity[]> {
    const rows = await this.prisma.report.findMany({
      where: { ownerId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findScheduledDue(now: Date): Promise<readonly ReportEntity[]> {
    const rows = await this.prisma.report.findMany({
      where: {
        nextRunAt: { lte: now },
        deletedAt: null,
      },
      orderBy: { nextRunAt: 'asc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly ReportEntity[]> {
    const rows = await this.prisma.report.findMany({
      where: { status, deletedAt: null },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
