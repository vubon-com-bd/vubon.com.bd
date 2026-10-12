/**
 * Dashboard Name Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Dashboard-এর human-readable name (e.g., "Revenue Overview Q4")।
 * Business Rule:
 * - 3-150 chars
 * - Letters, numbers, spaces, common punctuation
 * - No emoji, no control chars
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';

const MIN_LENGTH = 3;
const MAX_LENGTH = 150;

export class DashboardNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DashboardNameVO {
    if (typeof raw !== 'string') {
      throw new Error('DashboardName must be a string');
    }

    const normalized = raw.trim().replace(/\s+/g, ' ');

    if (normalized.length < MIN_LENGTH) {
      throw new Error(`DashboardName must be at least ${MIN_LENGTH} chars`);
    }

    if (normalized.length > MAX_LENGTH) {
      throw new Error(`DashboardName must be at most ${MAX_LENGTH} chars`);
    }

    // Reject control chars + emoji ranges
    if (/[\u0000-\u001F\u007F\uD800-\uDFFF]/.test(normalized)) {
      throw new Error('DashboardName contains invalid control/emoji characters');
    }

    if (!/^[\p{L}\p{N}\s.,\-_'&()/]+$/u.test(normalized)) {
      throw new Error('DashboardName contains invalid characters');
    }

    return new DashboardNameVO(normalized);
  }

  isShort(): boolean {
    return this.value.length <= 40;
  }

  /** Numeric suffix বা period আছে কিনা (e.g., "Q4", "2025") */
  hasPeriodHint(): boolean {
    return /\b(Q[1-4]|20\d{2}|FY\d{2,4})\b/i.test(this.value);
  }
}
