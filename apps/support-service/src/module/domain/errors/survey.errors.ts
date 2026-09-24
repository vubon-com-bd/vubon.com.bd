import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';

export class SurveyNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(surveyId: string) {
    super(`Survey not found: ${surveyId}`, { surveyId });
  }
}

export class SurveyAlreadyCompletedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 409;

  constructor(surveyId: string, userId: string) {
    super(`Survey already completed by user: ${surveyId}/${userId}`, {
      surveyId,
      userId,
    });
  }
}
