/**
 * Cohort Name Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Cohort-এর descriptive name (e.g., "Jan 2025 Signups")।
 * Business Rule:
 * - 3-150 chars
 * - Letters, numbers, spaces, common punctuation
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';

const MIN_LENGTH = 3;
const MAX_LENGTH = 150;

export class CohortNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CohortNameVO {
    if (typeof raw !== 'string') {
      throw new Error('CohortName must be a string');
    }

    const normalized = raw.trim().replace(/\s+/g, ' ');

    if (normalized.length < MIN_LENGTH) {
      throw new Error(`CohortName must be at least ${MIN_LENGTH} chars`);
    }

    if (normalized.length > MAX_LENGTH) {
      throw new Error(`CohortName must be at most ${MAX_LENGTH} chars`);
    }

    if (!/^[\p{L}\p{N}\s.,\-_'()/]+$/u.test(normalized)) {
      throw new Error('CohortName contains invalid characters');
    }

    return new CohortNameVO(normalized);
  }

  /** Period hint আছে কিনা (Jan, Q1, 2025) */
  hasPeriodHint(): boolean {
    return /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Q[1-4]|20\d{2})\b/i.test(
      this.value
    );
  }
}
