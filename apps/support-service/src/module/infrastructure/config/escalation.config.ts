export const ESCALATION_CONFIG = Object.freeze({
  maxLevels: 4,
  autoEscalateAfterMinutes: 120,
  notifyOnEscalation: true,
  requireReason: true,
  defaultLevel: 'L1' as const,
} as const);
