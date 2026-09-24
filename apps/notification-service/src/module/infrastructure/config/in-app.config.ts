import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const IN_APP_CONFIG = Object.freeze({
  position: getOptionalEnv('IN_APP_POSITION', 'top'),
  maxPerDay: getOptionalEnvInt('IN_APP_MAX_PER_DAY', 500),
  autoDismissMs: getOptionalEnvInt('IN_APP_AUTO_DISMISS_MS', 5000),
  maxUnread: getOptionalEnvInt('IN_APP_MAX_UNREAD', 1000),
});
