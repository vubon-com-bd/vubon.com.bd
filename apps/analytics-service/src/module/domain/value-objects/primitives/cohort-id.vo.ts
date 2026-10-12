/**
 * Cohort ID Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Analytics cohort-এর unique identifier।
 * Business Rule:
 * - UUID বা slug-style
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';

const MIN_LENGTH = 3;
const MAX_LENGTH = 128;

export class CohortIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CohortIdVO {
    if (typeof raw !== 'string') {
      throw new Error('CohortId must be a string');
    }

    const trimmed = raw.trim();

    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new Error(`CohortId must be ${MIN_LENGTH}-${MAX_LENGTH} chars`);
    }

    if (!REGEX.UUID.test(trimmed) && !/^[a-z][a-z0-9_-]*$/.test(trimmed)) {
      throw new Error(`CohortId must be UUID or slug-style: "${trimmed}"`);
    }

    return new CohortIdVO(trimmed);
  }

  isUuid(): boolean {
    return REGEX.UUID.test(this.value);
  }
}
