/**
 * Session ID Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Analytics user session-এর unique identifier।
 * Business Rule:
 * - UUID অথবা custom session format (e.g., "sess_abc123")
 * - Immutable
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';

const MIN_LENGTH = 6;
const MAX_LENGTH = 128;

export class SessionIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SessionIdVO {
    if (typeof raw !== 'string') {
      throw new Error('SessionId must be a string');
    }

    const trimmed = raw.trim();

    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new Error(`SessionId must be ${MIN_LENGTH}-${MAX_LENGTH} chars`);
    }

    if (!REGEX.UUID.test(trimmed) && !/^[a-zA-Z0-9_:-]+$/.test(trimmed)) {
      throw new Error(
        `SessionId must be UUID or alphanumeric with _:- : "${trimmed}"`
      );
    }

    return new SessionIdVO(trimmed);
  }

  isUuid(): boolean {
    return REGEX.UUID.test(this.value);
  }

  hasPrefix(): boolean {
    return /^(sess|session)_/i.test(this.value);
  }
}
