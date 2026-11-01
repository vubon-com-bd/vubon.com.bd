/**
 * ActionUrl Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MAX_LENGTH = 2048;
const ALLOWED_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:'];

export class ActionUrlVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ActionUrlVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('ActionUrl cannot be empty', 'actionUrl');
    }
    const trimmed = raw.trim();
    if (trimmed.length > MAX_LENGTH) {
      throw new ValidationError(`ActionUrl exceeds ${MAX_LENGTH} chars`, 'actionUrl');
    }
    let parsed: URL;
    try {
      parsed = new URL(trimmed);
    } catch {
      throw new ValidationError('ActionUrl must be a valid URL', 'actionUrl');
    }
    if (!ALLOWED_PROTOCOLS.includes(parsed.protocol)) {
      throw new ValidationError(
        `ActionUrl protocol "${parsed.protocol}" not allowed`,
        'actionUrl',
      );
    }
    return new ActionUrlVO(trimmed);
  }

  static reconstitute(raw: string): ActionUrlVO {
    return new ActionUrlVO(raw);
  }

  get protocol(): string { return new URL(this.value).protocol; }
  get isExternal(): boolean {
    const p = this.protocol;
    return p === 'http:' || p === 'https:';
  }
}
