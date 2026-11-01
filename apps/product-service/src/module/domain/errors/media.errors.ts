/**
 * Media Domain Errors
 * @module product-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class InvalidMediaTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid media type "${value}". Allowed: ${allowed.join(', ')}`, 'mediaType');
    this.name = 'InvalidMediaTypeError';
  }
}

export class MediaLimitExceededError extends BusinessRuleError {
  constructor(limit: number, current: number) {
    super(
      `Media limit exceeded: max ${limit}, current ${current}`,
      'MEDIA_LIMIT_EXCEEDED',
      { limit, current },
    );
    this.name = 'MediaLimitExceededError';
  }
}

export class MediaFileTooLargeError extends ValidationError {
  constructor(sizeMb: number, maxMb: number) {
    super(`Media file too large (${sizeMb}MB > ${maxMb}MB)`, 'mediaSize');
    this.name = 'MediaFileTooLargeError';
  }
}

export class InvalidMediaUrlError extends ValidationError {
  constructor(url: string) {
    super(`Invalid media URL "${url}"`, 'mediaUrl');
    this.name = 'InvalidMediaUrlError';
  }
}
