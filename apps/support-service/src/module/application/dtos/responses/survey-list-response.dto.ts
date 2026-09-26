/**
 * SurveyListResponseDTO
 * @module support-service/application/dtos/responses
 */
import type { SurveyResponseDTO } from './survey-response.dto';

export interface SurveyListResponseDTO {
  readonly items: readonly SurveyResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
