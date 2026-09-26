/**
 * Live chat configuration
 * @module shared-config/support/live-chat
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const LIVE_CHAT_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('LIVE_CHAT_ENABLED', false),
  maxConcurrentChatsPerAgent: getOptionalEnvInt('LIVE_CHAT_MAX_PER_AGENT', 5),
  maxWaitSeconds: getOptionalEnvInt('LIVE_CHAT_MAX_WAIT_SECONDS', 300),
  idleTimeoutMinutes: getOptionalEnvInt('LIVE_CHAT_IDLE_TIMEOUT_MIN', 5),
  sessionTimeoutMinutes: getOptionalEnvInt('LIVE_CHAT_SESSION_TIMEOUT_MIN', 30),
  typingIndicatorSeconds: getOptionalEnvInt('LIVE_CHAT_TYPING_SECONDS', 3),
  autoGreetingDelaySeconds: getOptionalEnvInt('LIVE_CHAT_AUTO_GREETING_DELAY', 5),
  transcriptEmailEnabled: getOptionalEnvBool('LIVE_CHAT_TRANSCRIPT_EMAIL', true),
  ratingEnabled: getOptionalEnvBool('LIVE_CHAT_RATING_ENABLED', true),
  offlineMessageEnabled: getOptionalEnvBool('LIVE_CHAT_OFFLINE_MESSAGE', true),
});
