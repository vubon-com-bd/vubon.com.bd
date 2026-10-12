/**
 * KPI Result Value Object (Composite)
 * @module analytics-service/domain/value-objects/composites
 *
 * KPI evaluation result।
 * Business Rule:
 * - Status determined by achievement vs target
 * - `on_track`: >= threshold
 * - `at_risk`: < threshold but > breach
 * - `breached`: < 50%
 * - `achieved`: >= target
 * - `exceeded`: > target by 10%
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base';
import { ANALYTICS_KPI_STATUS } from '@vubon/shared-constants/platform/analytics';
import { KpiIdVO } from '../primitives/kpi-id.vo.js';

type KpiStatus = (typeof ANALYTICS_KPI_STATUS)[keyof typeof ANALYTICS_KPI_STATUS];

export interface KpiResultVOProps {
  readonly kpiId: KpiIdVO;
  readonly actual: number;
  readonly target: number;
  readonly achievementPercent: number;
  readonly status: KpiStatus;
}

export class KpiResultVO extends BaseVO<KpiResultVOProps> {
  private constructor(props: KpiResultVOProps) {
    super(props);
    Object.freeze(this);
  }

  static evaluate(params: {
    kpiId: KpiIdVO;
    actual: number;
    target: number;
    thresholdPercent: number;
  }): KpiResultVO {
    if (!params.kpiId) {
      throw new Error('KpiResultVO requires kpiId');
    }
    if (!Number.isFinite(params.actual) || !Number.isFinite(params.target)) {
      throw new Error('KpiResultVO actual and target must be finite');
    }
    if (params.target <= 0) {
      throw new Error('KpiResultVO target must be positive');
    }

    const percent =
      Math.round((params.actual / params.target) * 10000) / 100;

    let status: KpiStatus;
    if (percent >= 110) {
      status = ANALYTICS_KPI_STATUS.EXCEEDED;
    } else if (percent >= 100) {
      status = ANALYTICS_KPI_STATUS.ACHIEVED;
    } else if (percent >= params.thresholdPercent) {
      status = ANALYTICS_KPI_STATUS.ON_TRACK;
    } else if (percent >= 50) {
      status = ANALYTICS_KPI_STATUS.AT_RISK;
    } else {
      status = ANALYTICS_KPI_STATUS.BREACHED;
    }

    return new KpiResultVO({
      kpiId: params.kpiId,
      actual: params.actual,
      target: params.target,
      achievementPercent: percent,
      status,
    });
  }

  get kpiId(): KpiIdVO {
    return this.value.kpiId;
  }

  get actual(): number {
    return this.value.actual;
  }

  get target(): number {
    return this.value.target;
  }

  get achievementPercent(): number {
    return this.value.achievementPercent;
  }

  get status(): KpiStatus {
    return this.value.status;
  }

  isBreached(): boolean {
    return this.value.status === ANALYTICS_KPI_STATUS.BREACHED;
  }

  isAtRisk(): boolean {
    return this.value.status === ANALYTICS_KPI_STATUS.AT_RISK;
  }

  isOnTrack(): boolean {
    return this.value.status === ANALYTICS_KPI_STATUS.ON_TRACK;
  }

  isAchieved(): boolean {
    return (
      this.value.status === ANALYTICS_KPI_STATUS.ACHIEVED ||
      this.value.status === ANALYTICS_KPI_STATUS.EXCEEDED
    );
  }

  isExceeded(): boolean {
    return this.value.status === ANALYTICS_KPI_STATUS.EXCEEDED;
  }

  /** Alert needed কিনা */
  requiresAlert(): boolean {
    return this.isBreached() || this.isAtRisk();
  }
}
