/**
 * KPI Name Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * KPI-এর human-readable name (e.g., "Monthly Revenue Target")।
 * Business Rule:
 * - Display name only — canonical name নয়
 * - 3-150 chars
 * - Letters, numbers, space, hyphen, dot, comma, underscore allowed
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';

const MIN_LENGTH = 3;
const MAX_LENGTH = 150;

export class KpiNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): KpiNameVO {
    if (typeof raw !== 'string') {
      throw new Error('KpiName must be a string');
    }

    const normalized = raw.trim().replace(/\s+/g, ' ');

    if (normalized.length < MIN_LENGTH) {
      throw new Error(`KpiName must be at least ${MIN_LENGTH} chars`);
    }

    if (normalized.length > MAX_LENGTH) {
      throw new Error(`KpiName must be at most ${MAX_LENGTH} chars`);
    }

    if (!/^[\p{L}\p{N}\s.,\-_'()]+$/u.test(normalized)) {
      throw new Error('KpiName contains invalid characters');
    }

    return new KpiNameVO(normalized);
  }

  /** Length category */
  isShort(): boolean {
    return this.value.length <= 40;
  }
}
