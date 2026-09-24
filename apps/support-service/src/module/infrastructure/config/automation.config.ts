export const AUTOMATION_CONFIG = Object.freeze({
  maxAutomations: 200,
  maxActiveAutomations: 100,
  maxStepsPerAutomation: 20,
  maxDelayMinutes: 10080,
  minDelayMinutes: 1,
  evaluationTimeoutMs: 3000,
  retryAttempts: 3,
  retryDelaySeconds: 60,
  retentionDays: 365,
} as const);
