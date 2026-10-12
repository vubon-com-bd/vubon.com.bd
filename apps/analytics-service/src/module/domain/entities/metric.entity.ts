/**
 * Metric Entity (Aggregate Root)
 * @module analytics-service/domain/entities
 *
 * Metric aggregate — records + aggregates metric values।
 * Business Rule:
 * - Aggregation type fixed at creation
 * - Value updates tracked via version
 * - Time-series data
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base';
import { MetricIdVO } from '../value-objects/primitives/metric-id.vo.js';
import { MetricNameVO } from '../value-objects/primitives/metric-name.vo.js';
import { MetricValueVO } from '../value-objects/primitives/metric-value.vo.js';
import { MetricUnitVO } from '../value-objects/primitives/metric-unit.vo.js';
import { MetricTypeVO } from '../value-objects/primitives/metric-type.vo.js';
import { MetricRecordedEvent } from '../events/metric.events.js';
import { MetricAggregatedEvent } from '../events/metric.events.js';

export interface MetricEntityProps {
  readonly name: MetricNameVO;
  readonly unit: MetricUnitVO;
  readonly type: MetricTypeVO;
  currentValue: MetricValueVO;
  sampleCount: number;
  minValue?: MetricValueVO;
  maxValue?: MetricValueVO;
  readonly seriesKey: string;
}

export class MetricEntity extends AggregateRoot<string> {
  private props: MetricEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: MetricEntityProps
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static create(params: {
    id: MetricIdVO;
    name: MetricNameVO;
    unit: MetricUnitVO;
    type: MetricTypeVO;
    seriesKey: string;
    initialValue: MetricValueVO;
    now: string;
  }): MetricEntity {
    if (!params.id || !params.name || !params.unit || !params.type) {
      throw new Error('MetricEntity requires id, name, unit, type');
    }
    if (!params.seriesKey || params.seriesKey.trim().length === 0) {
      throw new Error('MetricEntity seriesKey required');
    }

    const entity = new MetricEntity(
      params.id.value,
      params.now,
      params.now,
      {
        name: params.name,
        unit: params.unit,
        type: params.type,
        currentValue: params.initialValue,
        sampleCount: 1,
        minValue: params.initialValue,
        maxValue: params.initialValue,
        seriesKey: params.seriesKey,
      }
    );

    entity.addDomainEvent(
      new MetricRecordedEvent(
        params.id.value,
        params.name.value,
        params.initialValue.numeric,
        params.now
      )
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: MetricEntityProps;
  }): MetricEntity {
    return new MetricEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props
    );
  }

  get name(): MetricNameVO { return this.props.name; }
  get unit(): MetricUnitVO { return this.props.unit; }
  get type(): MetricTypeVO { return this.props.type; }
  get currentValue(): MetricValueVO { return this.props.currentValue; }
  get sampleCount(): number { return this.props.sampleCount; }
  get minValue(): MetricValueVO | undefined { return this.props.minValue; }
  get maxValue(): MetricValueVO | undefined { return this.props.maxValue; }
  get seriesKey(): string { return this.props.seriesKey; }

  /**
   * Business Action: Record new sample
   */
  record(value: MetricValueVO, now: string): void {
    if (!this.unit.isValueInRange(value.numeric)) {
      throw new Error(
        `Value ${value.numeric} out of range for unit ${this.unit.value}`
      );
    }

    // Type-specific update
    if (this.type.isCounter()) {
      this.props.currentValue = this.props.currentValue.add(value);
    } else if (this.type.isGauge()) {
      this.props.currentValue = value;
    } else if (this.type.isHistogram() || this.type.isSummary()) {
      this.props.currentValue = this.props.currentValue.add(value);
    } else {
      // Derived — replace
      this.props.currentValue = value;
    }

    this.props.sampleCount += 1;

    // Track min/max
    if (!this.props.minValue || value.numeric < this.props.minValue.numeric) {
      this.props.minValue = value;
    }
    if (!this.props.maxValue || value.numeric > this.props.maxValue.numeric) {
      this.props.maxValue = value;
    }

    this.addDomainEvent(
      new MetricRecordedEvent(
        this.id,
        this.name.value,
        value.numeric,
        now
      )
    );
    this.incrementVersion();
  }

  /**
   * Business Action: Aggregate batch
   */
  aggregate(total: number, sampleCount: number, now: string): void {
    if (sampleCount <= 0) {
      throw new Error('sampleCount must be positive');
    }
    const avg = MetricValueVO.create(total / sampleCount);
    this.props.currentValue = avg;
    this.props.sampleCount += sampleCount;

    this.addDomainEvent(
      new MetricAggregatedEvent(
        this.id,
        this.name.value,
        total,
        sampleCount,
        now
      )
    );
    this.incrementVersion();
  }

  /**
   * Average value
   */
  average(): number {
    if (this.props.sampleCount === 0) return 0;
    return Math.round((this.props.currentValue.numeric / this.props.sampleCount) * 100) / 100;
  }

  /**
   * Range (max - min)
   */
  range(): number {
    if (!this.props.minValue || !this.props.maxValue) return 0;
    return Math.round((this.props.maxValue.numeric - this.props.minValue.numeric) * 100) / 100;
  }

  isRate(): boolean {
    return this.name.isRate() || this.unit.isPercentage();
  }

  isRevenue(): boolean {
    return this.name.isRevenue() || this.unit.isCurrency();
  }
}
