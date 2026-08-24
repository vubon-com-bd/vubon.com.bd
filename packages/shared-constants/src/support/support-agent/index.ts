/**
 * Support Agent Constants Index
 * Export all support agent constants and types for easy importing
 */

// Support Agent Constants
export {
  SUPPORT_AGENT,
  supportAgentGetTypeLabel,
  supportAgentGetStatusLabel,
  supportAgentGetRoleLabel,
  supportAgentGetLevelLabel,
  supportAgentIsAvailable,
  supportAgentIsOnline,
  supportAgentCanHandleWork,
  supportAgentGetSkillLabel,
  supportAgentGetShiftTypeLabel,
} from './support-agent.constants';

export type {
  SupportAgentType,
  SupportAgentStatus,
  SupportAgentRole,
  SupportAgentSkill,
  SupportAgentLevel,
  SupportAgentShiftType,
} from './support-agent.constants';

// Support Agent Status Constants
export {
  SUPPORT_AGENT_STATUS,
  supportAgentStatusGetLabel,
  supportAgentStatusIsAvailable,
  supportAgentStatusIsOnline,
  supportAgentStatusCanHandleWork,
  supportAgentStatusGetCategory,
  supportAgentStatusCanTransition,
} from './support-agent-status.constants';

export type {
  SupportAgentStatusType,
  SupportAgentStatusCategory,
  SupportAgentStatusColor,
  SupportAgentStatusIcon,
  SupportAgentStatusTransition,
} from './support-agent-status.constants';

// Support Agent Role Constants
export {
  SUPPORT_AGENT_ROLE,
  supportAgentRoleGetLabel,
  supportAgentRoleGetLevel,
  supportAgentRoleGetColor,
  supportAgentRoleGetIcon,
  supportAgentRoleGetResponsibilities,
  supportAgentRoleGetPermissions,
  supportAgentRoleHasPermission,
} from './support-agent-role.constants';

export type {
  SupportAgentRoleType,
  SupportAgentRoleLevel,
  SupportAgentRolePermission,
  SupportAgentRoleColor,
  SupportAgentRoleIcon,
} from './support-agent-role.constants';
