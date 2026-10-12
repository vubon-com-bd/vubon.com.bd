/**
 * Metric Aggregator Service (internal)
 */
import { Injectable, Logger } from '@nestjs/common';
import { MetricPrismaRepository } from '../../persistence/prisma/repositories/metric.prisma.repository.js';
import { MetricAggregatorService as DomainAggregator } from '../../../domain/services/metric-aggregator.service.js';
import { TimeRangeVO } from '../../../domain/value-objects/composites/time-range.vo.js';
import { EventTimestampVO } from '../../../domain/value-objects/primitives/event-timestamp.vo.js';

export interface MetricAggregationResult {
  readonly metricName: string;
  readonly aggregation: string;
  readonly value: number;
  readonly sampleCount: number;
}

@Injectable()
export class MetricAggregatorInternalService {
  private readonly logger = new Logger(MetricAggregatorInternalService.name);
  private readonly aggregator = new DomainAggregator();

  constructor(private readonly metricRepo: MetricPrismaRepository) {}

  async aggregateRange(
    metricName: string,
    aggregation: 'sum' | 'avg' | 'min' | 'max' | 'count',
    fromDate: string,
    toDate: string
  ): Promise<MetricAggregationResult | null> {
    const range = TimeRangeVO.create({
      startAt: EventTimestampVO.fromIso(fromDate),
      endAt: EventTimestampVO.fromIso(toDate),
    });

    const metrics = await this.metricRepo.findActiveInRange(range);
    const values = metrics.map((m) => m.currentValue.numeric);
    const result = this.aggregator.aggregate(values, aggregation);

    if (!result) return null;

    return {
      metricName,
      aggregation,
      value: result.value,
      sampleCount: result.sampleCount,
    };
  }
}
