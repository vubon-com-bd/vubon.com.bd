/**
 * RespondSurveyRequestDTO
 * @module support-service/application/dtos/requests/survey
 */
export interface SurveyAnswerInput {
  readonly questionId: string;
  readonly value: string | number | readonly string[];
}

export interface RespondSurveyRequestDTO {
  readonly surveyId: string;
  readonly userId?: string;
  readonly answers: readonly SurveyAnswerInput[];
}
