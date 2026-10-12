/**
 * Event ID Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Analytics event-এর unique identifier।
 * Business Rule:
 * - UUID v4 format হতে হবে
 * - Empty/whitespace allowed না
 * - Immutable, case-sensitive
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';

export class EventIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  /**
   * UUID থেকে EventIdVO তৈরি করে
   * @throws Error if not valid UUID
   */
  static create(raw: string): EventIdVO {
    if (typeof raw !== 'string') {
      throw new Error('EventId must be a string');
    }

    const trimmed = raw.trim();

    if (trimmed.length === 0) {
      throw new Error('EventId cannot be empty');
    }

    if (trimmed.length !== 36) {
      throw new Error(
        `EventId must be 36 chars (UUID v4), got ${trimmed.length}`
      );
    }

    if (!REGEX.UUID.test(trimmed)) {
      throw new Error(`Invalid EventId format: ${trimmed}`);
    }

    return new EventIdVO(trimmed);
  }

  /**
   * Generic ID থেকে তৈরি — non-UUID analytics event-এর জন্য
   * (e.g., "evt_abc123" — third-party ID)
   */
  static fromGeneric(raw: string): EventIdVO {
    if (typeof raw !== 'string') {
      throw new Error('EventId must be a string');
    }

    const trimmed = raw.trim();

    if (trimmed.length < 3 || trimmed.length > 128) {
      throw new Error('EventId must be 3-128 characters');
    }

    if (!/^[a-zA-Z0-9_:-]+$/.test(trimmed)) {
      throw new Error(
        'EventId can only contain alphanumeric, underscore, colon, hyphen'
      );
    }

    return new EventIdVO(trimmed);
  }

  /**
   * UUID কিনা চেক
   */
  isUuid(): boolean {
    return REGEX.UUID.test(this.value);
  }

  /**
   * Third-party ID কিনা চেক
   */
  isGeneric(): boolean {
    return !this.isUuid();
  }
}
