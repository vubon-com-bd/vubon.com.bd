/**
 * KPI Service Implementation
 */
import { BaseService } from '@vubon/shared-kernel/application/services';
import { ApplicationNotFoundError, ApplicationValidationError } from '@vubon/shared-kernel/application/errors';
import type { KpiEntity } from '../../../domain/entities/kpi.entity.js';
import { KpiEntity as KpiEntityClass } from '../../../domain/entities/kpi.entity.js';
import type { KpiRepository } from '../../../domain/repositories/kpi.repository.interface.js';
import { KpiIdVO } from '../../../domain/value-objects/primitives/kpi-id.vo.js';
import { KpiNameVO } from '../../../domain/value-objects/primitives/kpi-name.vo.js';
import { KpiTargetVO } from '../../../domain/value-objects/primitives/kpi-target.vo.js';
import { KpiThresholdVO } from '../../../domain/value-objects/primitives/kpi-threshold.vo.js';
import { MetricNameVO } from '../../../domain/value-objects/primitives/metric-name.vo.js';
import type { IKpiService } from '../interfaces/kpi.service.interface.js';
import type { CreateKpiDto } from '../../dtos/requests/kpi/create-kpi.dto.js';
import type { UpdateKpiDto } from '../../dtos/requests/kpi/update-kpi.dto.js';
import type { KpiResponseData } from '../../dtos/responses/kpi-response.dto.js';
import type { KpiResultResponseData } from '../../dtos/responses/kpi-result-response.dto.js';
import { KpiEvaluatorService } from '../../../domain/services/kpi-evaluator.service.js';

export class KpiService extends BaseService<KpiEntity, string> implements IKpiService {
  readonly name = 'KpiService';
  private readonly evaluator = new KpiEvaluatorService();

  constructor(private readonly repository: KpiRepository) {
    super();
  }

  async create(input: CreateKpiDto): Promise<KpiResponseData> {
    const now = new Date().toISOString();
    const entity = KpiEntityClass.create({
      id: KpiIdVO.create(`kpi_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`),
      name: KpiNameVO.create(input.name),
      target: KpiTargetVO.create(input.target),
      threshold: KpiThresholdVO.create(input.thresholdPercent ?? 80),
      metric: MetricNameVO.create(input.metric),
      higherIsBetter: input.higherIsBetter ?? true,
      now,
    });
    const saved = await this.repository.save(entity);
    return this.toResponse(saved);
  }

  async update(id: string, input: UpdateKpiDto): Promise<KpiResponseData> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new ApplicationNotFoundError('KPI', id);

    if (input.name !== undefined) {
      throw new ApplicationValidationError('KPI name cannot be modified after creation', 'name');
    }
    if (input.isActive !== undefined) {
      if (input.isActive) entity.activate();
      else entity.deactivate();
    }

    const saved = await this.repository.save(entity);
    return this.toResponse(saved);
  }

  async evaluate(id: string, actual: number): Promise<KpiResultResponseData> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new ApplicationNotFoundError('KPI', id);
    if (!entity.isActive) throw new ApplicationValidationError('KPI is inactive', 'isActive');

    const now = new Date().toISOString();
    entity.evaluate(actual, now);
    await this.repository.save(entity);

    const evaluation = this.evaluator.evaluate(entity, actual);
    return {
      kpiId: evaluation.kpiId,
      kpiName: evaluation.kpiName,
      actual: evaluation.actual,
      target: evaluation.target,
      achievementPercent: evaluation.achievementPercent,
      status: evaluation.status,
      requiresAlert: evaluation.requiresAlert,
      evaluatedAt: now,
    };
  }

  async findById(id: string): Promise<KpiResponseData | null> {
    const entity = await this.repository.findById(id);
    return entity ? this.toResponse(entity) : null;
  }

  async listActive(): Promise<readonly KpiResponseData[]> {
    const entities = await this.repository.findAllActive();
    return entities.map((e) => this.toResponse(e));
  }

  async listAll(): Promise<readonly KpiResponseData[]> {
    const entities = await this.repository.findAll();
    return entities.map((e) => this.toResponse(e));
  }

  private toResponse(entity: KpiEntity): KpiResponseData {
    return {
      id: entity.id,
      name: entity.name.value,
      metric: entity.metric.value,
      target: entity.target.numeric,
      thresholdPercent: entity.threshold.percent,
      higherIsBetter: entity.higherIsBetter,
      isActive: entity.isActive,
      lastActualValue: entity.lastActualValue,
      lastEvaluatedAt: entity.lastEvaluatedAt,
    };
  }
}
