/**
 * Metric Value Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Analytics metric-এর numeric value।
 * Business Rule:
 * - Finite number হতে হবে (NaN/Infinity allowed না)
 * - Max magnitude 1e15 (overflow protection)
 * - Precision: max 6 decimals (analytics-এ 6 decimal enough)
 * - Negative allowed না (সব analytics metric non-negative; delta আলাদা VO)
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

const MAX_MAGNITUDE = 1e15;
const MAX_DECIMALS = 6;

export class MetricValueVO extends BaseCodeVO {
  private readonly _numeric: number;

  private constructor(raw: string, numeric: number) {
    super(raw);
    this._numeric = numeric;
    Object.freeze(this);
  }

  static create(raw: number): MetricValueVO {
    if (typeof raw !== 'number') {
      throw new Error('MetricValue must be a number');
    }
    if (!Number.isFinite(raw)) {
      throw new Error('MetricValue must be finite (no NaN/Infinity)');
    }
    if (raw < 0) {
      throw new Error('MetricValue cannot be negative');
    }
    if (raw > MAX_MAGNITUDE) {
      throw new Error(`MetricValue exceeds max magnitude ${MAX_MAGNITUDE}`);
    }

    // Clamp precision to 6 decimals
    const factor = Math.pow(10, MAX_DECIMALS);
    const rounded = Math.round(raw * factor) / factor;

    return new MetricValueVO(String(rounded), rounded);
  }

  static zero(): MetricValueVO {
    return MetricValueVO.create(0);
  }

  /** Numeric value */
  get numeric(): number {
    return this._numeric;
  }

  isZero(): boolean {
    return this._numeric === 0;
  }

  isPositive(): boolean {
    return this._numeric > 0;
  }

  /** Add two metric values (same unit ধরে নিয়ে) */
  add(other: MetricValueVO): MetricValueVO {
    return MetricValueVO.create(this._numeric + other._numeric);
  }

  /** Safe divide (0 divisor → 0) */
  safeDivide(divisor: MetricValueVO): MetricValueVO {
    if (divisor.isZero()) return MetricValueVO.zero();
    return MetricValueVO.create(this._numeric / divisor.numeric);
  }

  /** Percentage of total */
  percentageOf(total: MetricValueVO): MetricValueVO {
    if (total.isZero()) return MetricValueVO.zero();
    return MetricValueVO.create((this._numeric / total.numeric) * 100);
  }

  /** Round to N decimals */
  roundTo(decimals: number): MetricValueVO {
    if (!Number.isInteger(decimals) || decimals < 0 || decimals > MAX_DECIMALS) {
      throw new Error(`decimals must be 0-${MAX_DECIMALS}`);
    }
    const factor = Math.pow(10, decimals);
    return MetricValueVO.create(Math.round(this._numeric * factor) / factor);
  }
}
