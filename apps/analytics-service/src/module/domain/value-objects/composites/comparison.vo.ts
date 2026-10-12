/**
 * Comparison Value Object (Composite)
 * @module analytics-service/domain/value-objects/composites
 *
 * Metric comparison between two periods।
 * Business Rule:
 * - currentValue, previousValue
 * - changePercent = (current - previous) / |previous| * 100
 * - changeType: increase | decrease | no_change | new
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base';
import { ANALYTICS_CHANGE_TYPE } from '@vubon/shared-constants/platform/analytics';

type ChangeType = (typeof ANALYTICS_CHANGE_TYPE)[keyof typeof ANALYTICS_CHANGE_TYPE];

export interface ComparisonVOProps {
  readonly currentValue: number;
  readonly previousValue: number;
  readonly change: number;
  readonly changePercent: number;
  readonly changeType: ChangeType;
  readonly currentPeriod: string;
  readonly previousPeriod: string;
}

export class ComparisonVO extends BaseVO<ComparisonVOProps> {
  private constructor(props: ComparisonVOProps) {
    super(props);
    Object.freeze(this);
  }

  static compare(params: {
    currentValue: number;
    previousValue: number;
    currentPeriod: string;
    previousPeriod: string;
  }): ComparisonVO {
    if (!Number.isFinite(params.currentValue) || !Number.isFinite(params.previousValue)) {
      throw new Error('ComparisonVO values must be finite');
    }

    const change = params.currentValue - params.previousValue;

    let changePercent = 0;
    if (params.previousValue === 0) {
      changePercent = params.currentValue === 0 ? 0 : 100;
    } else {
      changePercent = Math.round(
        (change / Math.abs(params.previousValue)) * 10000
      ) / 100;
    }

    let changeType: ChangeType;
    if (params.previousValue === 0 && params.currentValue > 0) {
      changeType = ANALYTICS_CHANGE_TYPE.NEW;
    } else if (change > 0) {
      changeType = ANALYTICS_CHANGE_TYPE.INCREASE;
    } else if (change < 0) {
      changeType = ANALYTICS_CHANGE_TYPE.DECREASE;
    } else {
      changeType = ANALYTICS_CHANGE_TYPE.NO_CHANGE;
    }

    return new ComparisonVO({
      currentValue: params.currentValue,
      previousValue: params.previousValue,
      change,
      changePercent,
      changeType,
      currentPeriod: params.currentPeriod,
      previousPeriod: params.previousPeriod,
    });
  }

  get currentValue(): number {
    return this.value.currentValue;
  }

  get previousValue(): number {
    return this.value.previousValue;
  }

  get change(): number {
    return this.value.change;
  }

  get changePercent(): number {
    return this.value.changePercent;
  }

  get changeType(): ChangeType {
    return this.value.changeType;
  }

  get currentPeriod(): string {
    return this.value.currentPeriod;
  }

  get previousPeriod(): string {
    return this.value.previousPeriod;
  }

  isIncrease(): boolean {
    return this.changeType === ANALYTICS_CHANGE_TYPE.INCREASE;
  }

  isDecrease(): boolean {
    return this.changeType === ANALYTICS_CHANGE_TYPE.DECREASE;
  }

  isNew(): boolean {
    return this.changeType === ANALYTICS_CHANGE_TYPE.NEW;
  }

  isStable(): boolean {
    return this.changeType === ANALYTICS_CHANGE_TYPE.NO_CHANGE;
  }

  /** Significant change (>5%) */
  isSignificant(thresholdPercent = 5): boolean {
    return Math.abs(this.changePercent) >= thresholdPercent;
  }

  /** Positive sentiment কিনা (higherIsBetter based) */
  isFavorable(higherIsBetter = true): boolean {
    if (this.isStable()) return true;
    return higherIsBetter ? this.isIncrease() : this.isDecrease();
  }
}
