/**
 * Support SLA Constants Index
 * Export all support SLA constants and types for easy importing
 */

// Support SLA Constants
export {
  SUPPORT_SLA,
  supportSLAGetTypeLabel,
  supportSLAGetPriorityLabel,
  supportSLAGetStatusLabel,
  supportSLAGetResponseTime,
  supportSLAGetResolutionTime,
  supportSLAGetFirstResponseTime,
  supportSLAIsActive,
  supportSLAIsViolated,
  supportSLAGetEscalationLevel,
  supportSLAIsWithinBusinessHours,
} from './support-sla.constants';

export type {
  SupportSLAType,
  SupportSLAPriority,
  SupportSLAStatus,
  SupportSLATimeUnit,
  SupportSLAEscalationLevel,
  SupportSLAPenalty,
} from './support-sla.constants';

// Support SLA Status Constants
export {
  SUPPORT_SLA_STATUS,
  supportSLAStatusGetLabel,
  supportSLAStatusIsActive,
  supportSLAStatusIsViolated,
  supportSLAStatusIsCompleted,
  supportSLAStatusGetCategory,
  supportSLAStatusCanTransition,
} from './support-sla-status.constants';

export type {
  SupportSLAStatusType,
  SupportSLAStatusCategory,
  SupportSLAStatusColor,
  SupportSLAStatusIcon,
  SupportSLAStatusTransition,
} from './support-sla-status.constants';
