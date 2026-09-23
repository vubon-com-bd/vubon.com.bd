import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const SOCIAL_CONFIG = Object.freeze({
  defaultPlatform: getOptionalEnv('SOCIAL_DEFAULT_PLATFORM', 'facebook'),
  maxPostsPerDay: getOptionalEnvInt('SOCIAL_MAX_POSTS_PER_DAY', 10),
  schedulingWindowDays: getOptionalEnvInt('SOCIAL_SCHEDULING_WINDOW_DAYS', 30),
} as const);
