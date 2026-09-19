export const SUPPORT_AGENT_STATUS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  AWAY: 'away',
  BUSY: 'busy',
  BREAK: 'break',
  IN_MEETING: 'in_meeting',
} as const;

export const SUPPORT_AGENT_LEVEL = {
  L1: 'l1',
  L2: 'l2',
  L3: 'l3',
  SPECIALIST: 'specialist',
  TEAM_LEAD: 'team_lead',
  MANAGER: 'manager',
} as const;

export const SUPPORT_AGENT_SKILL = {
  GENERAL: 'general',
  TECHNICAL: 'technical',
  BILLING: 'billing',
  ORDER: 'order',
  PAYMENT: 'payment',
  RETURNS: 'returns',
  PRODUCT: 'product',
  LANGUAGE_BN: 'language_bn',
  LANGUAGE_EN: 'language_en',
} as const;

export const SUPPORT_AGENT = {
  STATUS: SUPPORT_AGENT_STATUS,
  LEVEL: SUPPORT_AGENT_LEVEL,
  SKILL: SUPPORT_AGENT_SKILL,
  MAX_CONCURRENT_TICKETS: 10,
  MAX_CONCURRENT_CHATS: 5,
  MAX_TICKETS_PER_DAY: 100,
  AUTO_ASSIGN: true,
  ROUND_ROBIN: true,
  SKILL_BASED_ROUTING: true,
  LANGUAGE_ROUTING: true,
  AVAILABILITY_CHECK: true,
  IDLE_TIMEOUT_MINUTES: 15,
} as const;

export type SupportAgentStatusType =
  (typeof SUPPORT_AGENT_STATUS)[keyof typeof SUPPORT_AGENT_STATUS];
export type SupportAgentLevelType = (typeof SUPPORT_AGENT_LEVEL)[keyof typeof SUPPORT_AGENT_LEVEL];
export type SupportAgentSkillType = (typeof SUPPORT_AGENT_SKILL)[keyof typeof SUPPORT_AGENT_SKILL];
