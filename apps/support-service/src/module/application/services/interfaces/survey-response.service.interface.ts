import type { SurveyResponseEntity } from '../../../domain/entities/survey-response.entity';
import type { RespondSurveyRequestDTO } from '../../dtos/requests/survey';

export interface SurveyResponseServiceInterface {
  respond(input: RespondSurveyRequestDTO): Promise<{ id: string }>;
  findBySurvey(surveyId: string): Promise<readonly SurveyResponseEntity[]>;
}
