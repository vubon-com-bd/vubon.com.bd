export const LIVE_CHAT_STATUS = {
  OFFLINE: 'offline',
  ONLINE: 'online',
  AWAY: 'away',
  BUSY: 'busy',
  IN_CHAT: 'in_chat',
} as const;

export const LIVE_CHAT_SESSION_STATUS = {
  WAITING: 'waiting',
  ACTIVE: 'active',
  ON_HOLD: 'on_hold',
  ENDED: 'ended',
  ABANDONED: 'abandoned',
  TRANSFERRED: 'transferred',
} as const;

export const LIVE_CHAT_TRIGGER = {
  PAGE_LOAD: 'page_load',
  TIME_ON_SITE: 'time_on_site',
  SCROLL_DEPTH: 'scroll_depth',
  EXIT_INTENT: 'exit_intent',
  MANUAL: 'manual',
  URL_MATCH: 'url_match',
  CUSTOM_EVENT: 'custom_event',
} as const;

export const LIVE_CHAT = {
  STATUS: LIVE_CHAT_STATUS,
  SESSION_STATUS: LIVE_CHAT_SESSION_STATUS,
  TRIGGER: LIVE_CHAT_TRIGGER,
  MAX_CONCURRENT_CHATS_PER_AGENT: 5,
  MAX_WAIT_SECONDS: 300,
  IDLE_TIMEOUT_MINUTES: 5,
  SESSION_TIMEOUT_MINUTES: 30,
  TYPING_INDICATOR_SECONDS: 3,
  AUTO_GREETING_DELAY_SECONDS: 5,
  TRANSCRIPT_EMAIL_ENABLED: true,
  RATING_ENABLED: true,
  RETENTION_DAYS: 365,
} as const;

export type LiveChatStatusType = (typeof LIVE_CHAT_STATUS)[keyof typeof LIVE_CHAT_STATUS];
export type LiveChatSessionStatusType =
  (typeof LIVE_CHAT_SESSION_STATUS)[keyof typeof LIVE_CHAT_SESSION_STATUS];
export type LiveChatTriggerType = (typeof LIVE_CHAT_TRIGGER)[keyof typeof LIVE_CHAT_TRIGGER];
