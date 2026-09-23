import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const AUTOMATION_CONFIG = Object.freeze({
  maxStepsPerWorkflow: getOptionalEnvInt('AUTOMATION_MAX_STEPS', 20),
  executionTimeoutSeconds: getOptionalEnvInt('AUTOMATION_EXECUTION_TIMEOUT', 300),
  maxRetries: getOptionalEnvInt('AUTOMATION_MAX_RETRIES', 3),
} as const);
