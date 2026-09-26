/**
 * SurveyServiceInterface
 * @module support-service/application/services/interfaces
 */
import type { CreateSurveyRequestDTO } from '../../dtos/requests/survey/create-survey.dto';
import type { RespondSurveyRequestDTO } from '../../dtos/requests/survey/respond-survey.dto';
import type { CloseSurveyRequestDTO } from '../../dtos/requests/survey/close-survey.dto';
import type { SurveyResponseDTO } from '../../dtos/responses/survey-response.dto';
import type { SurveyListResponseDTO } from '../../dtos/responses/survey-list-response.dto';

export interface SurveyServiceInterface {
  create(input: CreateSurveyRequestDTO): Promise<SurveyResponseDTO>;
  respond(input: RespondSurveyRequestDTO): Promise<SurveyResponseDTO>;
  close(input: CloseSurveyRequestDTO): Promise<SurveyResponseDTO>;
  getById(surveyId: string): Promise<SurveyResponseDTO>;
  list(page: number, limit: number): Promise<SurveyListResponseDTO>;
}
