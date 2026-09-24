import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import { MetricEntity } from '../../../domain/entities/metric.entity';
import { MetricIdVO } from '../../../domain/value-objects/primitives/metric-id.vo';
import { MetricNameVO } from '../../../domain/value-objects/primitives/metric-name.vo';
import { MetricValueVO } from '../../../domain/value-objects/primitives/metric-value.vo';
import { MetricUnitVO } from '../../../domain/value-objects/primitives/metric-unit.vo';
import { MetricTypeVO } from '../../../domain/value-objects/primitives/metric-type.vo';
import { MetricAggregatorService } from '../../../domain/services/metric-aggregator.service';
import type { MetricRepository } from '../../../domain/repositories/metric.repository.interface';
import type { MetricServiceInterface } from '../interfaces/metric.service.interface';
import type { QueryMetricDTO, AggregateMetricDTO } from '../../dtos/requests/metric';
import {
  type MetricResponseDTO,
  type MetricAggregationResponseDTO,
  toMetricResponse,
} from '../../dtos/responses';
import { resolveGranularity } from '../../dtos/requests/metric';

@Injectable()
export class MetricService
  extends BaseService<MetricEntity, MetricIdVO>
  implements MetricServiceInterface
{
  readonly name = 'MetricService';

  constructor(
    private readonly metricRepo: MetricRepository,
    private readonly aggregator: MetricAggregatorService,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async queryMetrics(input: QueryMetricDTO): Promise<readonly MetricResponseDTO[]> {
    const out: MetricResponseDTO[] = [];
    for (const name of input.metricNames) {
      const found = await this.metricRepo.findByName(MetricNameVO.create(name));
      for (const e of found) out.push(toMetricResponse(e));
    }
    return out;
  }

  async aggregate(
    input: AggregateMetricDTO,
  ): Promise<readonly MetricAggregationResponseDTO[]> {
    const granularity = resolveGranularity(input);
    const fromMs = new Date(input.fromDate).getTime();
    const toMs = new Date(input.toDate).getTime();
    const out: MetricAggregationResponseDTO[] = [];

    for (const name of input.metricNames) {
      const total = await this.metricRepo.aggregateByName(
        MetricNameVO.create(name),
        fromMs,
        toMs,
      );
      const found = await this.metricRepo.findByName(MetricNameVO.create(name));
      const sampleSize = found.length;
      const unit = found[0]?.unit ?? MetricUnitVO.create('count');

      out.push({
        aggregation: input.aggregation,
        value: total,
        unit: unit.value,
        sampleSize,
        confidenceLevel: sampleSize >= 1000 ? 'high' : sampleSize >= 100 ? 'medium' : 'low',
        isReliable: sampleSize >= 30,
      });
      void granularity;
    }
    return out;
  }
}
