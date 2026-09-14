/**
 * Survey configuration
 * @module shared-config/support/survey
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const SURVEY_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('SURVEY_ENABLED', true),
  maxQuestions: getOptionalEnvInt('SURVEY_MAX_QUESTIONS', 50),
  maxOptionsPerQuestion: getOptionalEnvInt('SURVEY_MAX_OPTIONS', 20),
  maxResponses: getOptionalEnvInt('SURVEY_MAX_RESPONSES', 1000000),
  minResponseTimeSeconds: getOptionalEnvInt('SURVEY_MIN_RESPONSE_TIME', 10),
  reminderAfterHours: getOptionalEnvInt('SURVEY_REMINDER_AFTER_HOURS', 48),
  maxReminders: getOptionalEnvInt('SURVEY_MAX_REMINDERS', 3),
  anonymousAllowed: getOptionalEnvBool('SURVEY_ANONYMOUS_ALLOWED', true),
  retentionDays: getOptionalEnvInt('SURVEY_RETENTION_DAYS', 1095),
});
