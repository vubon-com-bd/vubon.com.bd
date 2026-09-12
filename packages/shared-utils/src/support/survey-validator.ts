import { SURVEY } from '@vubon/shared-constants/src/support/survey.constants';

export interface SurveyInput {
  title: string;
  questions: unknown[];
  status: string;
  type: string;
}

export const validateSurvey = (
  survey: Partial<SurveyInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!survey.title) errors.push('Survey title is required');
  if (!survey.questions || survey.questions.length === 0) {
    errors.push('At least one question is required');
  }
  if (survey.status && !Object.keys(SURVEY.STATUS).includes(survey.status)) {
    errors.push('Invalid survey status');
  }
  if (survey.type && !Object.keys(SURVEY.SURVEY_TYPES).includes(survey.type)) {
    errors.push('Invalid survey type');
  }
  return { isValid: errors.length === 0, errors };
};
