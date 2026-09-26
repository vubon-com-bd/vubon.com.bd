/**
 * CloseSurveyRequestDTO
 * @module support-service/application/dtos/requests/survey
 */
export interface CloseSurveyRequestDTO {
  readonly surveyId: string;
  readonly reason?: string;
}
