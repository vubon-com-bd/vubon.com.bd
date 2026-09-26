/**
 * Support-service cache keys (local)
 * @module support-service/infrastructure/persistence/cache
 */
export const SUPPORT_CACHE_PREFIX = Object.freeze({
  TICKET: 'support:ticket:',
  TICKET_LIST: 'support:ticket:list:',
  CONVERSATION: 'support:conversation:',
  MESSAGE: 'support:message:',
  FAQ: 'support:faq:',
  KB_ARTICLE: 'support:kb:',
  FEEDBACK: 'support:feedback:',
  COMPLAINT: 'support:complaint:',
  SURVEY: 'support:survey:',
  LIVE_CHAT: 'support:livechat:',
  CHATBOT: 'support:chatbot:',
  AGENT: 'support:agent:',
  TEAM: 'support:team:',
  SLA: 'support:sla:',
  RULE: 'support:rule:',
  AUTOMATION: 'support:automation:',
  TEMPLATE: 'support:template:',
} as const);

export type SupportCachePrefix =
  (typeof SUPPORT_CACHE_PREFIX)[keyof typeof SUPPORT_CACHE_PREFIX];
