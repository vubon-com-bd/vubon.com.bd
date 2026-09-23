import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class SeoKeywordError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SEO_KEYWORD_ERROR;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`SEO keyword error: ${reason}`, { reason });
  }
}
