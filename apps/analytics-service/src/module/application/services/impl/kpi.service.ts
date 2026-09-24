import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import { KpiEntity } from '../../../domain/entities/kpi.entity';
import { KpiIdVO } from '../../../domain/value-objects/primitives/kpi-id.vo';
import { KpiNameVO } from '../../../domain/value-objects/primitives/kpi-name.vo';
import { KpiTargetVO } from '../../../domain/value-objects/primitives/kpi-target.vo';
import { KpiThresholdVO } from '../../../domain/value-objects/primitives/kpi-threshold.vo';
import { KpiEvaluatorService } from '../../../domain/services/kpi-evaluator.service';
import type { KpiRepository } from '../../../domain/repositories/kpi.repository.interface';
import type { KpiServiceInterface } from '../interfaces/kpi.service.interface';
import type { CreateKpiDTO, UpdateKpiDTO, EvaluateKpiDTO } from '../../dtos/requests/kpi';
import {
  type KpiResponseDTO,
  type KpiResultResponseDTO,
  toKpiResponse,
  toKpiResultResponse,
} from '../../dtos/responses';

@Injectable()
export class KpiService
  extends BaseService<KpiEntity, KpiIdVO>
  implements KpiServiceInterface
{
  readonly name = 'KpiService';

  constructor(
    private readonly kpiRepo: KpiRepository,
    private readonly evaluator: KpiEvaluatorService,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async create(input: CreateKpiDTO): Promise<KpiResponseDTO> {
    const entity = KpiEntity.create({
      name: KpiNameVO.create(input.name),
      target: KpiTargetVO.create(input.target),
      threshold: KpiThresholdVO.create(input.threshold),
      metricName: input.metricName,
    });
    await this.kpiRepo.save(entity);
    return toKpiResponse(entity);
  }

  async update(input: UpdateKpiDTO): Promise<KpiResponseDTO> {
    const entity = await this.kpiRepo.findById(KpiIdVO.create(input.kpiId));
    if (!entity) throw new Error(`KPI not found: ${input.kpiId}`);

    const updated = KpiEntity.reconstitute(
      entity.id,
      {
        name: input.name ? KpiNameVO.create(input.name) : entity.name,
        target: input.target !== undefined
          ? KpiTargetVO.create(input.target)
          : entity.target,
        threshold: input.threshold !== undefined
          ? KpiThresholdVO.create(input.threshold)
          : entity.threshold,
        metricName: input.metricName ?? entity.metricName,
      },
      entity.createdAt,
      new Date().toISOString(),
      entity.deletedAt ?? null,
    );
    await this.kpiRepo.save(updated);
    return toKpiResponse(updated);
  }

  async evaluate(input: EvaluateKpiDTO): Promise<KpiResultResponseDTO> {
    const kpi = await this.kpiRepo.findById(KpiIdVO.create(input.kpiId));
    if (!kpi) throw new Error(`KPI not found: ${input.kpiId}`);

    const result = this.evaluator.evaluate(kpi, input.actual);
    await this.kpiRepo.save(kpi);
    const events = kpi.pullDomainEvents();
    for (const evt of events) this.eventBus.publish(evt as never);

    return toKpiResultResponse(result);
  }
}
