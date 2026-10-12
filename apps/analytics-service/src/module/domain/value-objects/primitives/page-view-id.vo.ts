/**
 * Page View ID Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Page view event-এর unique identifier।
 * Business Rule:
 * - UUID অথবা custom format
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';

const MIN_LENGTH = 3;
const MAX_LENGTH = 128;

export class PageViewIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PageViewIdVO {
    if (typeof raw !== 'string') {
      throw new Error('PageViewId must be a string');
    }

    const trimmed = raw.trim();

    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new Error(`PageViewId must be ${MIN_LENGTH}-${MAX_LENGTH} chars`);
    }

    if (!REGEX.UUID.test(trimmed) && !/^[a-zA-Z0-9_:-]+$/.test(trimmed)) {
      throw new Error(`PageViewId must be UUID or alphanumeric: "${trimmed}"`);
    }

    return new PageViewIdVO(trimmed);
  }

  isUuid(): boolean {
    return REGEX.UUID.test(this.value);
  }
}
