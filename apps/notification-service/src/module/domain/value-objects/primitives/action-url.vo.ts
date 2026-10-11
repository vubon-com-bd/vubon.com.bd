/**
 * ActionUrl Value Object — deep link / URL for a notification action
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MAX = 2048;

export class ActionUrlVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ActionUrlVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Action URL must be a string', 'actionUrl');
    }
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new ValidationError('Action URL cannot be empty', 'actionUrl');
    }
    if (trimmed.length > MAX) {
      throw new ValidationError(`Action URL exceeds ${MAX} chars`, 'actionUrl');
    }
    // Accept either https URLs or app-scheme deep links (myapp://...)
    const isHttpUrl = REGEX.URL.test(trimmed);
    const isDeepLink = /^[a-z][a-z0-9+\-.]*:\/\//i.test(trimmed);
    if (!isHttpUrl && !isDeepLink) {
      throw new ValidationError(`Invalid action URL: ${trimmed}`, 'actionUrl');
    }
    return new ActionUrlVO(trimmed);
  }

  static reconstitute(raw: string): ActionUrlVO {
    return new ActionUrlVO(raw);
  }

  isHttp(): boolean {
    return REGEX.URL.test(this.value);
  }

  isDeepLink(): boolean {
    return !this.isHttp();
  }

  get scheme(): string {
    const idx = this.value.indexOf('://');
    return idx > 0 ? this.value.slice(0, idx) : '';
  }
}
