/**
 * KPI Target Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * KPI-এর target value (numeric goal)।
 * Business Rule:
 * - Non-negative
 * - Finite number
 * - Max magnitude 1e15
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

const MAX_MAGNITUDE = 1e15;

export class KpiTargetVO extends BaseCodeVO {
  private readonly _numeric: number;

  private constructor(raw: string, numeric: number) {
    super(raw);
    this._numeric = numeric;
    Object.freeze(this);
  }

  static create(raw: number): KpiTargetVO {
    if (typeof raw !== 'number') {
      throw new Error('KpiTarget must be a number');
    }
    if (!Number.isFinite(raw)) {
      throw new Error('KpiTarget must be finite');
    }
    if (raw < 0) {
      throw new Error('KpiTarget cannot be negative');
    }
    if (raw > MAX_MAGNITUDE) {
      throw new Error(`KpiTarget exceeds max magnitude ${MAX_MAGNITUDE}`);
    }
    return new KpiTargetVO(String(raw), raw);
  }

  get numeric(): number {
    return this._numeric;
  }

  isZero(): boolean {
    return this._numeric === 0;
  }

  /** Achievement ratio (actual/target) */
  achievementRatio(actual: number): number {
    if (this._numeric === 0) return 0;
    return actual / this._numeric;
  }

  /** Actual কি target ছাড়িয়েছে? */
  isAchievedBy(actual: number): boolean {
    return actual >= this._numeric;
  }

  /** Actual target-এর কত % */
  achievementPercent(actual: number): number {
    if (this._numeric === 0) return 0;
    return Math.round((actual / this._numeric) * 10000) / 100;
  }
}
