import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { Survey } from './survey.types';

export interface SurveyAnswer {
  questionId: string;
  answer: unknown;
}

export interface SurveyResponse extends BaseEntity {
  responseId: string;
  surveyId: string;
  survey: Survey;
  userId?: string;
  user?: User;
  answers: SurveyAnswer[];
  isCompleted: boolean;
  startedAt: Date;
  completedAt?: Date;
  metadata: Record<string, unknown>;
}
