/**
 * Metric Service Implementation
 */
import { BaseService } from '@vubon/shared-kernel/application/services';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors';
import type { MetricEntity } from '../../../domain/entities/metric.entity.js';
import { MetricEntity as MetricEntityClass } from '../../../domain/entities/metric.entity.js';
import type { MetricRepository } from '../../../domain/repositories/metric.repository.interface.js';
import { MetricIdVO } from '../../../domain/value-objects/primitives/metric-id.vo.js';
import { MetricNameVO } from '../../../domain/value-objects/primitives/metric-name.vo.js';
import { MetricUnitVO } from '../../../domain/value-objects/primitives/metric-unit.vo.js';
import { MetricTypeVO } from '../../../domain/value-objects/primitives/metric-type.vo.js';
import { MetricValueVO } from '../../../domain/value-objects/primitives/metric-value.vo.js';
import type { IMetricService } from '../interfaces/metric.service.interface.js';
import type { MetricResponseData } from '../../dtos/responses/metric-response.dto.js';
import type { AggregateMetricDto } from '../../dtos/requests/metric/aggregate-metric.dto.js';
import type { MetricAggregationResponseData } from '../../dtos/responses/metric-aggregation-response.dto.js';
import { MetricAggregatorService } from '../../../domain/services/metric-aggregator.service.js';
import { TimeRangeVO } from '../../../domain/value-objects/composites/time-range.vo.js';
import { EventTimestampVO } from '../../../domain/value-objects/primitives/event-timestamp.vo.js';

export class MetricService extends BaseService<MetricEntity, string> implements IMetricService {
  readonly name = 'MetricService';
  private readonly aggregator = new MetricAggregatorService();

  constructor(private readonly repository: MetricRepository) {
    super();
  }

  async record(input: { name: string; value: number; unit: string; type: string; seriesKey: string }): Promise<MetricResponseData> {
    const now = new Date().toISOString();

    const existing = await this.repository.findBySeriesKey(input.seriesKey);
    if (existing) {
      existing.record(MetricValueVO.create(input.value), now);
      const saved = await this.repository.save(existing);
      return this.toResponse(saved);
    }

    const entity = MetricEntityClass.create({
      id: MetricIdVO.create(input.seriesKey),
      name: MetricNameVO.create(input.name),
      unit: MetricUnitVO.create(input.unit),
      type: MetricTypeVO.create(input.type),
      seriesKey: input.seriesKey,
      initialValue: MetricValueVO.create(input.value),
      now,
    });

    const saved = await this.repository.save(entity);
    return this.toResponse(saved);
  }

  async findById(id: string): Promise<MetricResponseData | null> {
    const entity = await this.repository.findById(id);
    return entity ? this.toResponse(entity) : null;
  }

  async findBySeriesKey(seriesKey: string): Promise<MetricResponseData | null> {
    const entity = await this.repository.findBySeriesKey(seriesKey);
    return entity ? this.toResponse(entity) : null;
  }

  async aggregate(input: AggregateMetricDto): Promise<MetricAggregationResponseData> {
    const now = Date.now();
    const days = 30;
    const range = TimeRangeVO.create({
      startAt: EventTimestampVO.fromEpochMs(now - days * 86400000),
      endAt: EventTimestampVO.now(),
    });

    const metrics = await this.repository.findActiveInRange(range);
    const values = metrics.map((m) => m.currentValue.numeric);
    const aggType = this.mapAggregation(input.aggregation);
    const result = this.aggregator.aggregate(values, aggType);

    return {
      metric: input.metric,
      aggregation: input.aggregation,
      value: result?.value ?? 0,
      sampleCount: result?.sampleCount,
      fromDate: new Date(now - days * 86400000).toISOString(),
      toDate: new Date(now).toISOString(),
    };
  }

  private mapAggregation(agg: string): 'sum' | 'avg' | 'min' | 'max' | 'count' | 'median' | 'stddev' {
    const map: Record<string, 'sum' | 'avg' | 'min' | 'max' | 'count' | 'median' | 'stddev'> = {
      sum: 'sum', avg: 'avg', min: 'min', max: 'max', count: 'count', median: 'median', stddev: 'stddev',
    };
    return map[agg] ?? 'sum';
  }

  private toResponse(entity: MetricEntity): MetricResponseData {
    return {
      id: entity.id,
      name: entity.name.value,
      value: entity.currentValue.numeric,
      unit: entity.unit.value,
      type: entity.type.value,
      sampleCount: entity.sampleCount,
      min: entity.minValue?.numeric,
      max: entity.maxValue?.numeric,
    };
  }
}
