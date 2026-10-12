/**
 * KPI Threshold Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * KPI-এর warning/breach threshold (percentage of target)।
 * Business Rule:
 * - Percentage 0-100
 * - Typically 70-90% (warning), 50-70% (at risk)
 * - Immutable
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

const MIN = 0;
const MAX = 100;

export class KpiThresholdVO extends BaseCodeVO {
  private readonly _percent: number;

  private constructor(raw: string, percent: number) {
    super(raw);
    this._percent = percent;
    Object.freeze(this);
  }

  static create(percent: number): KpiThresholdVO {
    if (typeof percent !== 'number' || !Number.isFinite(percent)) {
      throw new Error('KpiThreshold must be a finite number');
    }
    if (percent < MIN || percent > MAX) {
      throw new Error(`KpiThreshold must be ${MIN}-${MAX}%`);
    }
    const rounded = Math.round(percent * 100) / 100;
    return new KpiThresholdVO(String(rounded), rounded);
  }

  /** Warning threshold (default 80%) */
  static warning(): KpiThresholdVO {
    return KpiThresholdVO.create(80);
  }

  /** At-risk threshold (default 60%) */
  static atRisk(): KpiThresholdVO {
    return KpiThresholdVO.create(60);
  }

  get percent(): number {
    return this._percent;
  }

  /** Actual target-এর এই % এর উপরে কিনা */
  isAbove(achievementPercent: number): boolean {
    return achievementPercent >= this._percent;
  }

  /** Actual target-এর এই % এর নিচে কিনা */
  isBelow(achievementPercent: number): boolean {
    return achievementPercent < this._percent;
  }
}
