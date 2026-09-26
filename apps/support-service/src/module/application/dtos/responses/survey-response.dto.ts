/**
 * SurveyResponseDTO
 * @module support-service/application/dtos/responses
 */
import type {
  SurveyTypeValue,
  SurveyStatusValue,
  SurveyQuestionTypeValue,
} from '@vubon/shared-types/support';

export interface SurveyQuestionResponseDTO {
  readonly id: string;
  readonly type: SurveyQuestionTypeValue;
  readonly text: string;
  readonly required: boolean;
  readonly order: number;
}

export interface SurveyResponseDTO {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly type: SurveyTypeValue;
  readonly status: SurveyStatusValue;
  readonly questions: readonly SurveyQuestionResponseDTO[];
  readonly isAnonymous: boolean;
  readonly targetAudience?: readonly string[];
  readonly startAt: string;
  readonly endAt?: string;
  readonly responseCount: number;
  readonly createdBy: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
