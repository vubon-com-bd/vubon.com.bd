/**
 * Media domain errors
 * @module product-service/domain/errors
 */
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class MediaNotFoundError extends NotFoundError {
  constructor(mediaId: string) {
    super('ProductMedia', mediaId);
    this.name = 'MediaNotFoundError';
  }
}

export class MediaLimitExceededError extends BusinessRuleError {
  constructor(current: number, max: number) {
    super(`Media limit exceeded: ${current}/${max}`, 'MEDIA_LIMIT_EXCEEDED', { current, max });
    this.name = 'MediaLimitExceededError';
  }
}

export class InvalidMediaTypeError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid media type "${value}". Allowed: ${allowed.join(', ')}`, 'mediaType');
    this.name = 'InvalidMediaTypeError';
  }
}

export class MediaSizeExceededError extends BusinessRuleError {
  constructor(sizeMb: number, maxMb: number) {
    super(`Media size ${sizeMb}MB exceeds max ${maxMb}MB`, 'MEDIA_SIZE_EXCEEDED', { sizeMb, maxMb });
    this.name = 'MediaSizeExceededError';
  }
}
