import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import { ReportEntity } from '../../../domain/entities/report.entity';
import { ReportIdVO } from '../../../domain/value-objects/primitives/report-id.vo';
import { ReportFrequencyVO } from '../../../domain/value-objects/primitives/report-frequency.vo';
import { ReportGeneratorService } from '../../../domain/services/report-generator.service';
import { ExportService } from '../../../domain/services/export.service';
import type { ReportRepository } from '../../../domain/repositories/report.repository.interface';
import type { ReportServiceInterface } from '../interfaces/report.service.interface';
import type {
  CreateReportDTO,
  GenerateReportDTO,
  ScheduleReportDTO,
  ExportReportDTO,
} from '../../dtos/requests/report';
import {
  type ReportResponseDTO,
  toReportResponse,
} from '../../dtos/responses';

@Injectable()
export class ReportService
  extends BaseService<ReportEntity, ReportIdVO>
  implements ReportServiceInterface
{
  readonly name = 'ReportService';

  constructor(
    private readonly reportRepo: ReportRepository,
    private readonly generator: ReportGeneratorService,
    private readonly exportService: ExportService,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async create(input: CreateReportDTO): Promise<ReportResponseDTO> {
    const entity = this.generator.generate({
      type: input.type,
      format: input.format,
      ownerId: input.ownerId,
    });
    await this.reportRepo.save(entity);
    return toReportResponse(entity);
  }

  async generate(input: GenerateReportDTO): Promise<ReportResponseDTO> {
    const entity = await this.reportRepo.findById(ReportIdVO.create(input.reportId));
    if (!entity) throw new Error(`Report not found: ${input.reportId}`);

    const rowCount = Object.keys(input.filters ?? {}).length * 100;
    const generated = entity.markGenerated(rowCount);

    await this.reportRepo.save(generated);
    const events = generated.pullDomainEvents();
    for (const e of events) this.eventBus.publish(e as never);
    return toReportResponse(generated);
  }

  async schedule(input: ScheduleReportDTO): Promise<ReportResponseDTO> {
    const entity = await this.reportRepo.findById(ReportIdVO.create(input.reportId));
    if (!entity) throw new Error(`Report not found: ${input.reportId}`);

    // attach frequency by reconstituting with existing props + new frequency
    const withFrequency = ReportEntity.reconstitute(
      entity.id,
      {
        type: entity.type,
        format: entity.format,
        status: entity.status,
        frequency: ReportFrequencyVO.create(input.frequency),
        ownerId: entity.ownerId,
        generatedAt: entity.generatedAt,
        nextRunAt: entity.nextRunAt,
        rowCount: 0,
        filterCount: 0,
      },
      entity.createdAt,
      new Date().toISOString(),
      entity.deletedAt ?? null,
    );

    const scheduled = withFrequency.schedule();
    await this.reportRepo.save(scheduled);
    const events = scheduled.pullDomainEvents();
    for (const e of events) this.eventBus.publish(e as never);
    return toReportResponse(scheduled);
  }

  async export(input: ExportReportDTO): Promise<{
    readonly format: string;
    readonly filename: string;
    readonly mimeType: string;
  }> {
    const entity = await this.reportRepo.findById(ReportIdVO.create(input.reportId));
    if (!entity) throw new Error(`Report not found: ${input.reportId}`);

    const filename = input.filename ?? `report-${input.reportId}`;
    const result = this.exportService.serialize([], input.format, filename);
    return {
      format: result.format,
      filename: result.filename,
      mimeType: result.mimeType,
    };
  }
}
