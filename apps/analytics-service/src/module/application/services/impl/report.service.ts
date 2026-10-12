/**
 * Report Service Implementation
 */
import { BaseService } from '@vubon/shared-kernel/application/services';
import { ApplicationNotFoundError, ApplicationValidationError } from '@vubon/shared-kernel/application/errors';
import type { ReportEntity } from '../../../domain/entities/report.entity.js';
import { ReportEntity as ReportEntityClass } from '../../../domain/entities/report.entity.js';
import type { ReportRepository } from '../../../domain/repositories/report.repository.interface.js';
import { ReportIdVO } from '../../../domain/value-objects/primitives/report-id.vo.js';
import { ReportTypeVO } from '../../../domain/value-objects/primitives/report-type.vo.js';
import { ReportFormatVO } from '../../../domain/value-objects/primitives/report-format.vo.js';
import { ReportFrequencyVO } from '../../../domain/value-objects/primitives/report-frequency.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { EventTimestampVO } from '../../../domain/value-objects/primitives/event-timestamp.vo.js';
import { TimeRangeVO } from '../../../domain/value-objects/composites/time-range.vo.js';
import type { IReportService } from '../interfaces/report.service.interface.js';
import type { CreateReportDto } from '../../dtos/requests/report/create-report.dto.js';
import type { GenerateReportDto } from '../../dtos/requests/report/generate-report.dto.js';
import type { ReportResponseData } from '../../dtos/responses/report-response.dto.js';
import { ReportGeneratorService } from '../../../domain/services/report-generator.service.js';

export class ReportService extends BaseService<ReportEntity, string> implements IReportService {
  readonly name = 'ReportService';
  private readonly generator = new ReportGeneratorService();

  constructor(private readonly repository: ReportRepository) {
    super();
  }

  async create(input: CreateReportDto, ownerId: string): Promise<ReportResponseData> {
    const now = new Date().toISOString();
    const nowMs = Date.now();

    const entity = ReportEntityClass.create({
      id: ReportIdVO.create(`report_${nowMs}_${Math.random().toString(36).slice(2, 8)}`),
      name: input.name,
      type: ReportTypeVO.create(input.type),
      format: ReportFormatVO.create(input.format),
      frequency: ReportFrequencyVO.create(input.frequency),
      range: TimeRangeVO.create({
        startAt: EventTimestampVO.fromEpochMs(nowMs - 30 * 86400000),
        endAt: EventTimestampVO.now(),
      }),
      ownerId: UserIdVO.create(ownerId),
      now,
    });
    const saved = await this.repository.save(entity);
    return this.toResponse(saved);
  }

  async generate(id: string, input: GenerateReportDto): Promise<ReportResponseData> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new ApplicationNotFoundError('Report', id);

    if (!entity.isPending()) {
      throw new ApplicationValidationError(`Report not pending (status: ${entity.status.value})`, 'status');
    }

    const now = new Date().toISOString();
    entity.startProcessing(now);

    const result = this.generator.build({
      rows: [],
      metricColumns: [],
      dimensionColumns: [],
      now,
    });
    entity.complete({
      outputUrl: `s3://reports/${entity.id}/${Date.now()}.${entity.format.value}`,
      rowCount: result.rowCount,
      now,
    });

    const saved = await this.repository.save(entity);
    return this.toResponse(saved);
  }

  async findById(id: string): Promise<ReportResponseData | null> {
    const entity = await this.repository.findById(id);
    return entity ? this.toResponse(entity) : null;
  }

  async listByOwner(ownerId: string): Promise<readonly ReportResponseData[]> {
    const entities = await this.repository.findByOwner(UserIdVO.create(ownerId));
    return entities.map((e) => this.toResponse(e));
  }

  async listScheduled(): Promise<readonly ReportResponseData[]> {
    const entities = await this.repository.findScheduled();
    return entities.map((e) => this.toResponse(e));
  }

  async processPending(limit: number): Promise<number> {
    const now = new Date().toISOString();
    const entities = await this.repository.findDueForRun(now, limit);
    let processed = 0;

    for (const entity of entities) {
      try {
        entity.startProcessing(now);
        entity.complete({
          outputUrl: `s3://reports/${entity.id}/${Date.now()}.${entity.format.value}`,
          rowCount: 0,
          now,
        });
        await this.repository.save(entity);
        processed++;
      } catch {
        entity.fail('Processing failed', now);
        await this.repository.save(entity);
      }
    }

    return processed;
  }

  private toResponse(entity: ReportEntity): ReportResponseData {
    return {
      id: entity.id,
      name: entity.name,
      type: entity.type.value,
      format: entity.format.value,
      status: entity.status.value,
      frequency: entity.frequency.value,
      ownerId: entity.ownerId.value,
      nextRunAt: entity.nextRunAt,
      lastRunAt: entity.lastRunAt,
      outputUrl: entity.outputUrl,
      rowCount: entity.rowCount,
      createdAt: entity.createdAt,
    };
  }
}
