/**
 * Survey application errors
 * @module support-service/application/errors
 *
 * Registry: extends ApplicationError
 * Rule: `code` must be a known ERROR_CODE value; `httpStatus` required
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class SurveyNotFoundException extends ApplicationError {
  readonly code = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(public readonly surveyId: string) {
    super(`Survey not found: ${surveyId}`, { surveyId });
    this.name = 'SurveyNotFoundException';
  }
}

export class SurveyNotAcceptingException extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(public readonly surveyId: string) {
    super(`Survey is not accepting responses: ${surveyId}`, { surveyId });
    this.name = 'SurveyNotAcceptingException';
  }
}

export class SurveyAlreadyClosedException extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(public readonly surveyId: string) {
    super(`Survey already closed: ${surveyId}`, { surveyId });
    this.name = 'SurveyAlreadyClosedException';
  }
}
