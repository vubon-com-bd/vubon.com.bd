/**
 * Survey Types
 * @module shared-types/support
 */

import type {
  SURVEY_TYPE,
  SURVEY_STATUS,
  SURVEY_QUESTION_TYPE,
} from '@vubon/shared-constants/support';
import type { BaseEntity } from '../common/base';
import type { UserId } from '../common/primitives';

export type SurveyTypeValue = (typeof SURVEY_TYPE)[keyof typeof SURVEY_TYPE];

export type SurveyStatusValue = (typeof SURVEY_STATUS)[keyof typeof SURVEY_STATUS];

export type SurveyQuestionTypeValue =
  (typeof SURVEY_QUESTION_TYPE)[keyof typeof SURVEY_QUESTION_TYPE];

export interface Survey extends BaseEntity<string> {
  readonly title: string;
  readonly description?: string;
  readonly type: SurveyTypeValue;
  readonly status: SurveyStatusValue;
  readonly questions: readonly SurveyQuestion[];
  readonly isAnonymous: boolean;
  readonly targetAudience?: readonly string[];
  readonly startAt: string;
  readonly endAt?: string;
  readonly responseCount: number;
  readonly createdBy: UserId;
}

export interface SurveyQuestion {
  readonly id: string;
  readonly type: SurveyQuestionTypeValue;
  readonly text: string;
  readonly required: boolean;
  readonly options?: readonly SurveyOption[];
  readonly order: number;
  readonly minValue?: number;
  readonly maxValue?: number;
}

export interface SurveyOption {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly order: number;
}

export interface SurveyResponse {
  readonly id: string;
  readonly surveyId: string;
  readonly userId?: UserId;
  readonly answers: readonly SurveyAnswer[];
  readonly submittedAt: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface SurveyAnswer {
  readonly questionId: string;
  readonly value: string | number | readonly string[];
}

export interface SurveyPublic {
  readonly id: string;
  readonly title: string;
  readonly type: SurveyTypeValue;
  readonly status: SurveyStatusValue;
  readonly startAt: string;
  readonly endAt?: string;
}
