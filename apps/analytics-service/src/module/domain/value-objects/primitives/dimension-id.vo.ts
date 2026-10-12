/**
 * Dimension ID Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Analytics dimension-এর unique identifier।
 * Business Rule:
 * - UUID অথবা slug-style
 * - Immutable
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';

const MIN_LENGTH = 3;
const MAX_LENGTH = 128;

export class DimensionIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DimensionIdVO {
    if (typeof raw !== 'string') {
      throw new Error('DimensionId must be a string');
    }

    const trimmed = raw.trim();

    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new Error(
        `DimensionId must be ${MIN_LENGTH}-${MAX_LENGTH} chars, got ${trimmed.length}`
      );
    }

    if (!REGEX.UUID.test(trimmed) && !/^[a-z][a-z0-9_-]*$/.test(trimmed)) {
      throw new Error(
        `DimensionId must be UUID or slug-style: "${trimmed}"`
      );
    }

    return new DimensionIdVO(trimmed);
  }

  isUuid(): boolean {
    return REGEX.UUID.test(this.value);
  }
}
