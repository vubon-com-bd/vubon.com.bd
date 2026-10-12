/**
 * KPI Value Object (Composite)
 * @module analytics-service/domain/value-objects/composites
 *
 * KPI definition — name + target + threshold + metric।
 * Business Rule:
 * - Target positive
 * - Threshold < 100
 * - Metric + KPI one-to-one mapping
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base';
import { KpiIdVO } from '../primitives/kpi-id.vo.js';
import { KpiNameVO } from '../primitives/kpi-name.vo.js';
import { KpiTargetVO } from '../primitives/kpi-target.vo.js';
import { KpiThresholdVO } from '../primitives/kpi-threshold.vo.js';
import { MetricNameVO } from '../primitives/metric-name.vo.js';

export interface KpiVOProps {
  readonly id: KpiIdVO;
  readonly name: KpiNameVO;
  readonly target: KpiTargetVO;
  readonly threshold: KpiThresholdVO;
  readonly metric: MetricNameVO;
  readonly higherIsBetter: boolean;
}

export class KpiVO extends BaseVO<KpiVOProps> {
  private constructor(props: KpiVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: KpiVOProps): KpiVO {
    if (!props.id || !props.name || !props.target || !props.threshold || !props.metric) {
      throw new Error('KpiVO requires id, name, target, threshold, metric');
    }

    if (props.target.isZero()) {
      throw new Error('KPI target must be positive');
    }

    return new KpiVO(props);
  }

  get id(): KpiIdVO {
    return this.value.id;
  }

  get name(): KpiNameVO {
    return this.value.name;
  }

  get target(): KpiTargetVO {
    return this.value.target;
  }

  get threshold(): KpiThresholdVO {
    return this.value.threshold;
  }

  get metric(): MetricNameVO {
    return this.value.metric;
  }

  get higherIsBetter(): boolean {
    return this.value.higherIsBetter;
  }

  /** Actual value কি target ছাড়িয়েছে? */
  isAchieved(actual: number): boolean {
    return this.target.isAchievedBy(actual);
  }

  /** Warning threshold-এর নিচে কিনা */
  isAtRisk(actual: number): boolean {
    return this.threshold.isBelow(this.target.achievementPercent(actual));
  }

  /** Actual achievement percentage */
  achievementPercent(actual: number): number {
    return this.target.achievementPercent(actual);
  }
}
