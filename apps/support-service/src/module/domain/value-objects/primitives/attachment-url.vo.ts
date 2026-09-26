/**
 * AttachmentUrlVO — URL to stored attachment
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseCodeVO
 * Uses: REGEX.URL from @shared/constants/common
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VALIDATION, REGEX } from '@vubon/shared-constants/common';

const URL_PATTERN = /^https?:\/\/[^\s]+$/i;
const ALLOWED_PROTOCOLS: ReadonlySet<string> = new Set(['http:', 'https:']);

export class AttachmentUrlVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AttachmentUrlVO {
    BaseCodeVO.validateNonEmpty(raw, 'AttachmentUrl');
    const trimmed = raw.trim();
    if (trimmed.length > VALIDATION.URL_MAX_LENGTH) {
      throw new ValidationError(
        `AttachmentUrl too long (max ${VALIDATION.URL_MAX_LENGTH})`,
        'attachmentUrl',
      );
    }
    if (!URL_PATTERN.test(trimmed)) {
      throw new ValidationError(
        'AttachmentUrl must be a valid HTTP(S) URL',
        'attachmentUrl',
      );
    }
    try {
      const parsed = new URL(trimmed);
      if (!ALLOWED_PROTOCOLS.has(parsed.protocol)) {
        throw new ValidationError(
          `AttachmentUrl protocol not allowed: ${parsed.protocol}`,
          'attachmentUrl',
        );
      }
    } catch {
      throw new ValidationError(
        'AttachmentUrl is not a parseable URL',
        'attachmentUrl',
      );
    }
    return new AttachmentUrlVO(trimmed);
  }

  get protocol(): string {
    return new URL(this.value).protocol;
  }

  get hostname(): string {
    return new URL(this.value).hostname;
  }

  get filename(): string {
    const path = new URL(this.value).pathname;
    const segments = path.split('/').filter(Boolean);
    return segments[segments.length - 1] ?? '';
  }

  isSecure(): boolean {
    return this.value.startsWith('https://');
  }
}
