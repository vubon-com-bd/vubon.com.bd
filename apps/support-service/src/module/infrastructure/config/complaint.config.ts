export const COMPLAINT_CONFIG = Object.freeze({
  maxContentLength: 5000,
  autoEscalateForSeverity: ['critical', 'high'] as const,
  requireResolution: true,
  notifyOnCreate: true,
} as const);
