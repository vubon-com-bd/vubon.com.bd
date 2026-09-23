import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class SocialPostNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SOCIAL_POST_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(postId: string) {
    super(`Social post not found: ${postId}`, { postId });
  }
}
