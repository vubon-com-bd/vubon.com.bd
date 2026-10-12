/**
 * Metric ID Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Analytics metric-এর unique identifier।
 * Business Rule:
 * - UUID v4 অথবা slug-style format (e.g., "metric_users_daily")
 * - Empty allowed না
 * - Immutable
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';

const MIN_LENGTH = 3;
const MAX_LENGTH = 128;

export class MetricIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  /**
   * UUID থেকে তৈরি
   */
  static create(raw: string): MetricIdVO {
    if (typeof raw !== 'string') {
      throw new Error('MetricId must be a string');
    }

    const trimmed = raw.trim();

    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new Error(
        `MetricId must be ${MIN_LENGTH}-${MAX_LENGTH} chars, got ${trimmed.length}`
      );
    }

    if (!REGEX.UUID.test(trimmed) && !/^[a-z][a-z0-9_-]*$/.test(trimmed)) {
      throw new Error(
        `MetricId must be UUID or slug-style (lowercase, start with letter): "${trimmed}"`
      );
    }

    return new MetricIdVO(trimmed);
  }

  isUuid(): boolean {
    return REGEX.UUID.test(this.value);
  }

  isSlugStyle(): boolean {
    return !this.isUuid();
  }
}
