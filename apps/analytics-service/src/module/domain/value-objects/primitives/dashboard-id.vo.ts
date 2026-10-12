/**
 * Dashboard ID Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Analytics dashboard-এর unique identifier।
 * Business Rule:
 * - UUID v4 অথবা slug-style
 * - Immutable
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';

const MIN_LENGTH = 3;
const MAX_LENGTH = 128;

export class DashboardIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DashboardIdVO {
    if (typeof raw !== 'string') {
      throw new Error('DashboardId must be a string');
    }

    const trimmed = raw.trim();

    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new Error(
        `DashboardId must be ${MIN_LENGTH}-${MAX_LENGTH} chars, got ${trimmed.length}`
      );
    }

    if (!REGEX.UUID.test(trimmed) && !/^[a-z][a-z0-9_-]*$/.test(trimmed)) {
      throw new Error(`DashboardId must be UUID or slug-style: "${trimmed}"`);
    }

    return new DashboardIdVO(trimmed);
  }

  isUuid(): boolean {
    return REGEX.UUID.test(this.value);
  }

  isSlugStyle(): boolean {
    return !this.isUuid();
  }
}
