export const LIVE_CHAT_CONFIG = Object.freeze({
  maxConcurrentChatsPerAgent: 5,
  maxWaitSeconds: 300,
  idleTimeoutMinutes: 5,
  sessionTimeoutMinutes: 30,
  typingIndicatorSeconds: 3,
  autoGreetingDelaySeconds: 5,
  transcriptEmailEnabled: true,
  ratingEnabled: true,
  retentionDays: 365,
} as const);
