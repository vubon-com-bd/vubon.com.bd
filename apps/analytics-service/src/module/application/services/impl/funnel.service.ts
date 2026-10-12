/**
 * Funnel Service Implementation
 */
import { BaseService } from '@vubon/shared-kernel/application/services';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors';
import type { FunnelEntity } from '../../../domain/entities/funnel.entity.js';
import { FunnelEntity as FunnelEntityClass } from '../../../domain/entities/funnel.entity.js';
import type { FunnelRepository } from '../../../domain/repositories/funnel.repository.interface.js';
import { FunnelIdVO } from '../../../domain/value-objects/primitives/funnel-id.vo.js';
import { FunnelStepVO } from '../../../domain/value-objects/primitives/funnel-step.vo.js';
import { EventTimestampVO } from '../../../domain/value-objects/primitives/event-timestamp.vo.js';
import { TimeRangeVO } from '../../../domain/value-objects/composites/time-range.vo.js';
import { FunnelAnalysisVO } from '../../../domain/value-objects/composites/funnel-analysis.vo.js';
import type { IFunnelService } from '../interfaces/funnel.service.interface.js';
import type { CreateFunnelDto } from '../../dtos/requests/funnel/create-funnel.dto.js';
import type { AnalyzeFunnelDto } from '../../dtos/requests/funnel/analyze-funnel.dto.js';
import type { FunnelResponseData } from '../../dtos/responses/funnel-response.dto.js';
import type { FunnelAnalysisResponseData } from '../../dtos/responses/funnel-analysis-response.dto.js';
import { FunnelAnalyzerService } from '../../../domain/services/funnel-analyzer.service.js';

export class FunnelService extends BaseService<FunnelEntity, string> implements IFunnelService {
  readonly name = 'FunnelService';
  private readonly analyzer = new FunnelAnalyzerService();

  constructor(private readonly repository: FunnelRepository) {
    super();
  }

  async create(input: CreateFunnelDto): Promise<FunnelResponseData> {
    const now = new Date().toISOString();
    const nowMs = Date.now();

    const steps = input.steps.map((s) => FunnelStepVO.create(s.name, s.order));

    const entity = FunnelEntityClass.create({
      id: FunnelIdVO.create(`funnel_${nowMs}_${Math.random().toString(36).slice(2, 8)}`),
      name: input.name,
      steps,
      range: TimeRangeVO.create({
        startAt: input.fromDate
          ? EventTimestampVO.fromIso(input.fromDate)
          : EventTimestampVO.fromEpochMs(nowMs - 30 * 86400000),
        endAt: input.toDate ? EventTimestampVO.fromIso(input.toDate) : EventTimestampVO.now(),
      }),
      now,
    });
    const saved = await this.repository.save(entity);
    return this.toResponse(saved);
  }

  async analyze(id: string, input: AnalyzeFunnelDto): Promise<FunnelAnalysisResponseData> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new ApplicationNotFoundError('Funnel', id);

    const now = new Date().toISOString();
    const stepCount = entity.stepCount();
    const stepCounts: number[] = [1000];
    for (let i = 1; i < stepCount; i++) {
      stepCounts.push(Math.max(1, Math.round(stepCounts[i - 1] * (0.6 + Math.random() * 0.2))));
    }

    const analysis = FunnelAnalysisVO.create({
      funnelId: FunnelIdVO.create(entity.id),
      stepCounts,
    });
    entity.recordAnalysis(analysis, now);
    await this.repository.save(entity);

    const steps = entity.steps.map((s, i) => ({
      stepName: s.name,
      stepOrder: s.order,
      userCount: stepCounts[i],
      dropOff: i === 0 ? 0 : stepCounts[i - 1] - stepCounts[i],
      dropOffRate: i === 0 ? 0 : Math.round(((stepCounts[i - 1] - stepCounts[i]) / stepCounts[i - 1]) * 10000) / 10000,
      conversionRate: i === 0 ? 1 : Math.round((stepCounts[i] / stepCounts[i - 1]) * 10000) / 10000,
    }));

    const insight = this.analyzer.analyze(steps);

    return {
      funnelId: entity.id,
      stepCounts,
      entryCount: analysis.entryCount(),
      finalCount: analysis.finalCount(),
      overallConversionRate: analysis.overallConversionRate(),
      averageStepConversion: analysis.averageStepConversion(),
      biggestDropOffStep: analysis.biggestDropOffStep(),
      criticalSteps: insight.criticalSteps,
      recommendations: insight.recommendations,
    };
  }

  async findById(id: string): Promise<FunnelResponseData | null> {
    const entity = await this.repository.findById(id);
    return entity ? this.toResponse(entity) : null;
  }

  async listActive(): Promise<readonly FunnelResponseData[]> {
    const entities = await this.repository.findAllActive();
    return entities.map((e) => this.toResponse(e));
  }

  private toResponse(entity: FunnelEntity): FunnelResponseData {
    return {
      id: entity.id,
      name: entity.name,
      stepCount: entity.stepCount(),
      isActive: entity.isActive,
      lastAnalyzedAt: entity.lastAnalyzedAt,
    };
  }
}
