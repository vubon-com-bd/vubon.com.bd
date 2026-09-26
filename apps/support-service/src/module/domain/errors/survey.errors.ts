/**
 * Survey domain errors
 * @module support-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { SurveyIdVO } from '../value-objects/primitives/survey-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export class SurveyNotFoundError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_SURVEY_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(public readonly surveyId: SurveyIdVO) {
    super(`Survey not found: ${surveyId.value}`, { surveyId: surveyId.value });
    this.name = 'SurveyNotFoundError';
  }
}

export class SurveyAlreadyCompletedError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_SURVEY_ALREADY_COMPLETED;
  readonly httpStatus = 409;
  constructor(public readonly surveyId: SurveyIdVO, public readonly userId: UserIdVO) {
    super(`Survey already completed by user ${userId.value}`, {
      surveyId: surveyId.value, userId: userId.value,
    });
    this.name = 'SurveyAlreadyCompletedError';
  }
}

export class SurveyNotAcceptingResponsesError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_SURVEY_NOT_ACCEPTING;
  readonly httpStatus = 409;
  constructor(public readonly surveyId: SurveyIdVO) {
    super(`Survey is not accepting responses: ${surveyId.value}`, { surveyId: surveyId.value });
    this.name = 'SurveyNotAcceptingResponsesError';
  }
}

export class SurveyAlreadyClosedError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_SURVEY_NOT_ACCEPTING;
  readonly httpStatus = 409;
  constructor(public readonly surveyId: SurveyIdVO) {
    super(`Survey already closed: ${surveyId.value}`, { surveyId: surveyId.value });
    this.name = 'SurveyAlreadyClosedError';
  }
}
