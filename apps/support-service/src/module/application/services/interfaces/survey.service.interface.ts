import type { SurveyEntity } from '../../../domain/entities/survey.entity';
import type { SurveyIdVO } from '../../../domain/value-objects/primitives/survey-id.vo';
import type { CreateSurveyRequestDTO } from '../../dtos/requests/survey';
import type { SurveyResponseDTO } from '../../dtos/responses/survey-response.dto';

export interface SurveyServiceInterface {
  create(input: CreateSurveyRequestDTO): Promise<SurveyResponseDTO>;
  findById(id: SurveyIdVO): Promise<SurveyEntity | null>;
  close(id: SurveyIdVO): Promise<void>;
}
