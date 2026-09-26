/**
 * MessageContentVO — Message body (chat/ticket reply)
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseCodeVO
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VALIDATION } from '@vubon/shared-constants/common';

const MESSAGE_MIN_LENGTH = 1;
const MESSAGE_MAX_LENGTH = VALIDATION.COMMENT_MAX_LENGTH;
const FORBIDDEN_PATTERNS: readonly RegExp[] = [
  /<script/i,
  /javascript:/i,
  /on\w+\s*=/i,
];

export class MessageContentVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): MessageContentVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('MessageContent must be a string', 'messageContent');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MESSAGE_MIN_LENGTH) {
      throw new ValidationError(
        `MessageContent too short (min ${MESSAGE_MIN_LENGTH})`,
        'messageContent',
      );
    }
    if (trimmed.length > MESSAGE_MAX_LENGTH) {
      throw new ValidationError(
        `MessageContent too long (max ${MESSAGE_MAX_LENGTH})`,
        'messageContent',
      );
    }
    for (const pattern of FORBIDDEN_PATTERNS) {
      if (pattern.test(trimmed)) {
        throw new ValidationError(
          'MessageContent contains forbidden content',
          'messageContent',
        );
      }
    }
    return new MessageContentVO(trimmed);
  }

  get wordCount(): number {
    return this.value.split(/\s+/).filter(Boolean).length;
  }

  get isLong(): boolean {
    return this.value.length > 1000;
  }

  get sanitized(): string {
    return this.value
      .replace(/<[^>]*>/g, '')
      .replace(/javascript:/gi, '')
      .trim();
  }
}
