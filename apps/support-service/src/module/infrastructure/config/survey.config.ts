export const SURVEY_CONFIG = Object.freeze({
  maxQuestionsPerSurvey: 50,
  maxOptionsPerQuestion: 20,
  minQuestionsPerSurvey: 1,
  allowMultipleResponses: false,
  sendDelayMinutes: 30,
} as const);
