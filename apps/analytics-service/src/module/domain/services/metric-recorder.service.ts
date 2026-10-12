/**
 * Metric Recorder Service
 * @module analytics-service/domain/services
 *
 * Event থেকে metric record করে।
 * Business Rule:
 * - Counter: increment
 * - Gauge: replace
 * - Histogram/Summary: add
 * - Unit mismatch → reject
 */
import { MetricEntity } from '../entities/metric.entity.js';
import { MetricValueVO } from '../value-objects/primitives/metric-value.vo.js';
import { MetricUnitVO } from '../value-objects/primitives/metric-unit.vo.js';
import { MetricTypeVO } from '../value-objects/primitives/metric-type.vo.js';

export interface RecordMetricInput {
  readonly existingMetric?: MetricEntity;
  readonly value: number;
  readonly now: string;
}

export interface RecordMetricOutput {
  readonly updated: boolean;
  readonly entity?: MetricEntity;
  readonly reason?: string;
}

export class MetricRecorderService {
  /**
   * Record a single metric value
   */
  record(input: RecordMetricInput): RecordMetricOutput {
    if (!input.existingMetric) {
      return {
        updated: false,
        reason: 'Metric entity required — use create instead',
      };
    }

    const metric = input.existingMetric;

    // 1. Unit range check
    if (!metric.unit.isValueInRange(input.value)) {
      return {
        updated: false,
        reason: `Value ${input.value} out of range for ${metric.unit.value}`,
        entity: metric,
      };
    }

    // 2. Type-specific validations
    if (metric.type.isCounter() && input.value < 0) {
      return {
        updated: false,
        reason: 'Counter metric cannot decrease',
        entity: metric,
      };
    }

    // 3. Record
    const valueVO = MetricValueVO.create(input.value);
    metric.record(valueVO, input.now);

    return {
      updated: true,
      entity: metric,
    };
  }

  /**
   * Create metric entity if not exists
   */
  createOrRecord(params: {
    existingMetric?: MetricEntity;
    id: string;
    name: string;
    value: number;
    unit: string;
    type: string;
    seriesKey: string;
    now: string;
  }): MetricEntity {
    if (params.existingMetric) {
      const result = this.record({
        existingMetric: params.existingMetric,
        value: params.value,
        now: params.now,
      });
      return result.entity ?? params.existingMetric;
    }

    // Create new — caller passes VOs via domain factory
    // This is a placeholder — actual creation via MetricEntity.create
    throw new Error('Metric creation requires VO inputs');
  }

  /**
   * Batch record values (for time-series ingestion)
   */
  recordBatch(
    metric: MetricEntity,
    values: readonly number[],
    now: string
  ): { readonly recorded: number; readonly rejected: number } {
    let recorded = 0;
    let rejected = 0;

    for (const v of values) {
      const result = this.record({
        existingMetric: metric,
        value: v,
        now,
      });
      if (result.updated) recorded++;
      else rejected++;
    }

    return { recorded, rejected };
  }
}
