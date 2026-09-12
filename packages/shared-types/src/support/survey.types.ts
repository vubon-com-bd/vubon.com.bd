import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { SURVEY } from '@vubon/shared-constants/src/support/survey.constants';

export interface SurveyQuestion {
  questionId: string;
  type: 'text' | 'textarea' | 'radio' | 'checkbox' | 'select' | 'rating' | 'scale';
  question: string;
  description?: string;
  options?: string[];
  required: boolean;
  order: number;
}

export interface Survey extends BaseEntity {
  surveyId: string;
  title: string;
  description?: string;
  type: keyof typeof SURVEY.SURVEY_TYPES | string;
  status: keyof typeof SURVEY.STATUS | string;
  questions: SurveyQuestion[];
  createdBy: string;
  createdByUser: User;
  targetAudience: string[];
  responseCount: number;
  maxResponses?: number;
  startsAt: Date;
  endsAt: Date;
  isActive: boolean;
  metadata: Record<string, unknown>;
}
