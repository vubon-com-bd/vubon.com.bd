// Note: Cannot import from higher layer (layer isolation) — hardcode + comment
export const SUPPORT_PERMISSION = {
  TICKET_VIEW: 'support:ticket:view',
  TICKET_CREATE: 'support:ticket:create',
  TICKET_UPDATE: 'support:ticket:update',
  TICKET_DELETE: 'support:ticket:delete',
  TICKET_ASSIGN: 'support:ticket:assign',
  TICKET_ESCALATE: 'support:ticket:escalate',
  TICKET_CLOSE: 'support:ticket:close',
  TICKET_REOPEN: 'support:ticket:reopen',
  TICKET_MERGE: 'support:ticket:merge',

  CONVERSATION_VIEW: 'support:conversation:view',
  CONVERSATION_MANAGE: 'support:conversation:manage',

  MESSAGE_VIEW: 'support:message:view',
  MESSAGE_SEND: 'support:message:send',
  MESSAGE_DELETE: 'support:message:delete',

  FAQ_VIEW: 'support:faq:view',
  FAQ_MANAGE: 'support:faq:manage',

  KNOWLEDGE_BASE_VIEW: 'support:kb:view',
  KNOWLEDGE_BASE_MANAGE: 'support:kb:manage',

  FEEDBACK_VIEW: 'support:feedback:view',
  FEEDBACK_MANAGE: 'support:feedback:manage',

  COMPLAINT_VIEW: 'support:complaint:view',
  COMPLAINT_MANAGE: 'support:complaint:manage',

  SURVEY_VIEW: 'support:survey:view',
  SURVEY_MANAGE: 'support:survey:manage',

  LIVE_CHAT_VIEW: 'support:live_chat:view',
  LIVE_CHAT_MANAGE: 'support:live_chat:manage',
  LIVE_CHAT_TAKEOVER: 'support:live_chat:takeover',

  CHATBOT_VIEW: 'support:chatbot:view',
  CHATBOT_MANAGE: 'support:chatbot:manage',

  AGENT_VIEW: 'support:agent:view',
  AGENT_MANAGE: 'support:agent:manage',

  TEAM_VIEW: 'support:team:view',
  TEAM_MANAGE: 'support:team:manage',

  RULE_VIEW: 'support:rule:view',
  RULE_MANAGE: 'support:rule:manage',

  AUTOMATION_VIEW: 'support:automation:view',
  AUTOMATION_MANAGE: 'support:automation:manage',

  ANALYTICS_VIEW: 'support:analytics:view',
  ANALYTICS_EXPORT: 'support:analytics:export',

  ADMIN_VIEW: 'admin:view',
  ADMIN_MANAGE: 'admin:manage',
} as const;

export type SupportPermissionType = (typeof SUPPORT_PERMISSION)[keyof typeof SUPPORT_PERMISSION];
