/**
 * Survey Constants Index
 * Export all survey constants and types for easy importing
 */

// Survey Status Constants
export {
  SURVEY_STATUS,
  surveyStatusGetLabel,
  surveyStatusIsActive,
  surveyStatusIsCompleted,
  surveyStatusIsPending,
  surveyStatusGetCategory,
  surveyStatusCanTransition,
} from './survey-status.constants';

export type {
  SurveyStatusType,
  SurveyStatusCategory,
  SurveyStatusColor,
  SurveyStatusIcon,
  SurveyStatusTransition,
} from './survey-status.constants';

// Survey Type Constants
export {
  SURVEY_TYPE,
  surveyTypeGetLabel,
  surveyTypeGetIcon,
  surveyTypeGetColor,
  surveyTypeGetDuration,
  surveyTypeGetCategory,
} from './survey-type.constants';

export type {
  SurveyTypeType,
  SurveyTypeCategory,
  SurveyTypeIcon,
  SurveyTypeColor,
} from './survey-type.constants';
