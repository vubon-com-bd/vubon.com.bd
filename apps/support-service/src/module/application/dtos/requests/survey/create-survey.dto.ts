/**
 * CreateSurveyRequestDTO — matches SurveySchema create shape
 * @module support-service/application/dtos/requests/survey
 */
import type {
  SurveyTypeValue,
  SurveyQuestionTypeValue,
} from '@vubon/shared-types/support';

export interface SurveyOptionInput {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly order: number;
}

export interface SurveyQuestionInput {
  readonly id: string;
  readonly type: SurveyQuestionTypeValue;
  readonly text: string;
  readonly required: boolean;
  readonly options?: readonly SurveyOptionInput[];
  readonly order: number;
  readonly minValue?: number;
  readonly maxValue?: number;
}

export interface CreateSurveyRequestDTO {
  readonly title: string;
  readonly description?: string;
  readonly type: SurveyTypeValue;
  readonly questions: readonly SurveyQuestionInput[];
  readonly isAnonymous?: boolean;
  readonly targetAudience?: readonly string[];
  readonly startAt: string;
  readonly endAt?: string;
  readonly createdBy: string;
}
