export const SUPPORT_TEAM_TYPE = {
  GENERAL: 'general',
  TECHNICAL: 'technical',
  BILLING: 'billing',
  ORDER: 'order',
  RETURNS: 'returns',
  VIP: 'vip',
  ESCALATION: 'escalation',
  SPECIALIZED: 'specialized',
} as const;

export const SUPPORT_TEAM_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  ARCHIVED: 'archived',
} as const;

export const SUPPORT_TEAM_ROUTING = {
  ROUND_ROBIN: 'round_robin',
  LOAD_BALANCED: 'load_balanced',
  SKILL_BASED: 'skill_based',
  PRIORITY_BASED: 'priority_based',
  MANUAL: 'manual',
  AI_BASED: 'ai_based',
} as const;

export const SUPPORT_TEAM = {
  TYPE: SUPPORT_TEAM_TYPE,
  STATUS: SUPPORT_TEAM_STATUS,
  ROUTING: SUPPORT_TEAM_ROUTING,
  NAME_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
  MAX_MEMBERS: 200,
  MIN_MEMBERS: 1,
  MAX_TEAMS: 100,
  DEFAULT_ROUTING: SUPPORT_TEAM_ROUTING.SKILL_BASED,
  AUTO_ASSIGN: true,
  ESCALATION_ENABLED: true,
  MAX_ESCALATION_LEVELS: 5,
} as const;

export type SupportTeamTypeType = (typeof SUPPORT_TEAM_TYPE)[keyof typeof SUPPORT_TEAM_TYPE];
export type SupportTeamStatusType = (typeof SUPPORT_TEAM_STATUS)[keyof typeof SUPPORT_TEAM_STATUS];
export type SupportTeamRoutingType =
  (typeof SUPPORT_TEAM_ROUTING)[keyof typeof SUPPORT_TEAM_ROUTING];
