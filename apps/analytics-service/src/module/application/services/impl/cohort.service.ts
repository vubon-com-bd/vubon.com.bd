/**
 * Cohort Service Implementation
 */
import { BaseService } from '@vubon/shared-kernel/application/services';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors';
import type { CohortEntity } from '../../../domain/entities/cohort.entity.js';
import { CohortEntity as CohortEntityClass } from '../../../domain/entities/cohort.entity.js';
import type { CohortRepository } from '../../../domain/repositories/cohort.repository.interface.js';
import { CohortIdVO } from '../../../domain/value-objects/primitives/cohort-id.vo.js';
import { CohortNameVO } from '../../../domain/value-objects/primitives/cohort-name.vo.js';
import { CohortPeriodVO } from '../../../domain/value-objects/primitives/cohort-period.vo.js';
import { EventTimestampVO } from '../../../domain/value-objects/primitives/event-timestamp.vo.js';
import { TimeRangeVO } from '../../../domain/value-objects/composites/time-range.vo.js';
import { CohortAnalysisVO } from '../../../domain/value-objects/composites/cohort-analysis.vo.js';
import type { ICohortService } from '../interfaces/cohort.service.interface.js';
import type { CreateCohortDto } from '../../dtos/requests/cohort/create-cohort.dto.js';
import type { CohortResponseData } from '../../dtos/responses/cohort-response.dto.js';
import type { CohortAnalysisResponseData } from '../../dtos/responses/cohort-analysis-response.dto.js';

export class CohortService extends BaseService<CohortEntity, string> implements ICohortService {
  readonly name = 'CohortService';

  constructor(private readonly repository: CohortRepository) {
    super();
  }

  async create(input: CreateCohortDto): Promise<CohortResponseData> {
    const now = new Date().toISOString();
    const entity = CohortEntityClass.create({
      id: CohortIdVO.create(`cohort_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`),
      name: CohortNameVO.create(input.name),
      period: CohortPeriodVO.create(input.period),
      range: TimeRangeVO.create({
        startAt: EventTimestampVO.fromIso(input.fromDate),
        endAt: EventTimestampVO.fromIso(input.toDate),
      }),
      description: input.description,
      now,
    });
    const saved = await this.repository.save(entity);
    return this.toResponse(saved);
  }

  async analyze(id: string, maxPeriods: number): Promise<CohortAnalysisResponseData> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new ApplicationNotFoundError('Cohort', id);

    const now = new Date().toISOString();
    const periodCount = Math.min(maxPeriods, entity.maxRetentionPeriods());
    const cohortSize = 100;
    const rates = [1.0];
    for (let i = 1; i < periodCount; i++) {
      rates.push(Math.max(0.05, 1 - i * 0.08));
    }

    const analysis = CohortAnalysisVO.create({
      cohortId: CohortIdVO.create(entity.id),
      cohortSize,
      retentionRates: rates,
    });
    entity.recordAnalysis(analysis, now);
    await this.repository.save(entity);

    return {
      cohortId: entity.id,
      cohortSize,
      retentionRates: rates,
      retention1: analysis.retention1(),
      retention7: analysis.retention7(),
      retention30: analysis.retention30(),
      decayRate: analysis.decayRate(),
      longTermRetention: analysis.longTermRetention(),
      isHealthy: analysis.retention1() >= 0.3,
    };
  }

  async findById(id: string): Promise<CohortResponseData | null> {
    const entity = await this.repository.findById(id);
    return entity ? this.toResponse(entity) : null;
  }

  async listActive(): Promise<readonly CohortResponseData[]> {
    const entities = await this.repository.findAllActive();
    return entities.map((e) => this.toResponse(e));
  }

  async activate(id: string): Promise<void> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new ApplicationNotFoundError('Cohort', id);
    entity.activate();
    await this.repository.save(entity);
  }

  async deactivate(id: string): Promise<void> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new ApplicationNotFoundError('Cohort', id);
    entity.deactivate();
    await this.repository.save(entity);
  }

  private toResponse(entity: CohortEntity): CohortResponseData {
    return {
      id: entity.id,
      name: entity.name.value,
      period: entity.period.value,
      fromDate: entity.range.startAt.toISOString(),
      toDate: entity.range.endAt.toISOString(),
      isActive: entity.isActive,
      bucketCount: entity.bucketCount(),
      cohortSize: entity.lastAnalysis?.cohortSize,
      lastAnalyzedAt: entity.lastAnalyzedAt,
    };
  }
}
