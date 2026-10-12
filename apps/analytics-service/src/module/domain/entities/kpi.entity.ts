/**
 * KPI Entity (Aggregate Root)
 * @module analytics-service/domain/entities
 *
 * KPI definition + lifecycle.
 * Business Rule:
 * - Target positive
 * - Threshold < 100
 * - Can be activated/deactivated
 * - Threshold breach publishes event
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base';
import { KpiIdVO } from '../value-objects/primitives/kpi-id.vo.js';
import { KpiNameVO } from '../value-objects/primitives/kpi-name.vo.js';
import { KpiTargetVO } from '../value-objects/primitives/kpi-target.vo.js';
import { KpiThresholdVO } from '../value-objects/primitives/kpi-threshold.vo.js';
import { MetricNameVO } from '../value-objects/primitives/metric-name.vo.js';
import { KpiThresholdReachedEvent } from '../events/kpi.events.js';
import { KpiBreachEvent } from '../events/kpi.events.js';

export interface KpiEntityProps {
  readonly name: KpiNameVO;
  readonly target: KpiTargetVO;
  readonly threshold: KpiThresholdVO;
  readonly metric: MetricNameVO;
  readonly higherIsBetter: boolean;
  isActive: boolean;
  lastEvaluatedAt?: string;
  lastActualValue?: number;
}

export class KpiEntity extends AggregateRoot<string> {
  private props: KpiEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: KpiEntityProps
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static create(params: {
    id: KpiIdVO;
    name: KpiNameVO;
    target: KpiTargetVO;
    threshold: KpiThresholdVO;
    metric: MetricNameVO;
    higherIsBetter: boolean;
    now: string;
  }): KpiEntity {
    if (!params.id || !params.name || !params.target || !params.threshold || !params.metric) {
      throw new Error('KpiEntity requires id, name, target, threshold, metric');
    }
    if (params.target.isZero()) {
      throw new Error('KPI target must be positive');
    }

    return new KpiEntity(
      params.id.value,
      params.now,
      params.now,
      {
        name: params.name,
        target: params.target,
        threshold: params.threshold,
        metric: params.metric,
        higherIsBetter: params.higherIsBetter,
        isActive: true,
      }
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: KpiEntityProps;
  }): KpiEntity {
    return new KpiEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props
    );
  }

  get name(): KpiNameVO { return this.props.name; }
  get target(): KpiTargetVO { return this.props.target; }
  get threshold(): KpiThresholdVO { return this.props.threshold; }
  get metric(): MetricNameVO { return this.props.metric; }
  get higherIsBetter(): boolean { return this.props.higherIsBetter; }
  get isActive(): boolean { return this.props.isActive; }
  get lastEvaluatedAt(): string | undefined { return this.props.lastEvaluatedAt; }
  get lastActualValue(): number | undefined { return this.props.lastActualValue; }

  /**
   * Business Action: Evaluate against actual value
   */
  evaluate(actual: number, now: string): void {
    if (!this.props.isActive) {
      throw new Error('Cannot evaluate inactive KPI');
    }
    if (!Number.isFinite(actual)) {
      throw new Error('Actual value must be finite');
    }

    const percent = this.props.target.achievementPercent(actual);

    this.props.lastActualValue = actual;
    this.props.lastEvaluatedAt = now;

    // Threshold reached (>= warning level)
    if (percent >= this.props.threshold.percent && percent < 100) {
      this.addDomainEvent(
        new KpiThresholdReachedEvent(
          this.id,
          this.props.name.value,
          actual,
          this.props.target.numeric,
          percent,
          now
        )
      );
    }

    // Breach (< 50% achievement)
    if (percent < 50) {
      this.addDomainEvent(
        new KpiBreachEvent(
          this.id,
          this.props.name.value,
          actual,
          this.props.target.numeric,
          percent,
          now
        )
      );
    }

    this.incrementVersion();
  }

  deactivate(): void {
    if (!this.props.isActive) return;
    this.props.isActive = false;
    this.incrementVersion();
  }

  activate(): void {
    if (this.props.isActive) return;
    this.props.isActive = true;
    this.incrementVersion();
  }

  isAchieved(actual: number): boolean {
    return this.props.target.isAchievedBy(actual);
  }

  achievementPercent(actual: number): number {
    return this.props.target.achievementPercent(actual);
  }

  isBreach(actual: number): boolean {
    return this.achievementPercent(actual) < 50;
  }

  isAtRisk(actual: number): boolean {
    const pct = this.achievementPercent(actual);
    return pct < this.props.threshold.percent && pct >= 50;
  }
}
