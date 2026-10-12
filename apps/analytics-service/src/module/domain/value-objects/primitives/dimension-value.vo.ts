/**
 * Dimension Value Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Analytics dimension-এর actual value (e.g., "BD", "mobile", "organic")।
 * Business Rule:
 * - String value only (analytics query-তে সব dimension value string হিসেবে normalize)
 * - Max 255 chars
 * - Empty allowed না
 * - Null/undefined allowed না
 * - Sensitive data blocked
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

const MAX_LENGTH = 255;
const SENSITIVE_PATTERNS: readonly RegExp[] = [
  /password/i,
  /token/i,
  /secret/i,
  /cvv|cvc/i,
  /ssn/i,
];

export class DimensionValueVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string | number | boolean): DimensionValueVO {
    if (raw === null || raw === undefined) {
      throw new Error('DimensionValue cannot be null/undefined');
    }

    let normalized: string;

    if (typeof raw === 'string') {
      normalized = raw.trim();
    } else if (typeof raw === 'number') {
      if (!Number.isFinite(raw)) {
        throw new Error('DimensionValue number must be finite');
      }
      normalized = String(raw);
    } else if (typeof raw === 'boolean') {
      normalized = String(raw);
    } else {
      throw new Error('DimensionValue must be string | number | boolean');
    }

    if (normalized.length === 0) {
      throw new Error('DimensionValue cannot be empty');
    }

    if (normalized.length > MAX_LENGTH) {
      throw new Error(`DimensionValue must be at most ${MAX_LENGTH} chars`);
    }

    for (const pattern of SENSITIVE_PATTERNS) {
      if (pattern.test(normalized)) {
        throw new Error('DimensionValue contains sensitive data');
      }
    }

    return new DimensionValueVO(normalized);
  }

  /** Numeric parse attempt (returns null if not numeric) */
  toNumber(): number | null {
    const n = Number(this.value);
    return Number.isFinite(n) ? n : null;
  }

  /** Boolean parse attempt */
  toBoolean(): boolean | null {
    if (this.value === 'true') return true;
    if (this.value === 'false') return false;
    return null;
  }

  /** Low-cardinality value কিনা (display hint) */
  isShort(): boolean {
    return this.value.length <= 32;
  }
}
