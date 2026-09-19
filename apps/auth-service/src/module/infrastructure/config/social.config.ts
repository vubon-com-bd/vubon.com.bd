import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const SOCIAL_CONFIG = Object.freeze({
  enabledProviders: Object.freeze([
    'google',
    'facebook',
    'github',
    'apple',
    'microsoft',
  ] as const),
  autoLinkByEmail: getOptionalEnvBool('SOCIAL_AUTO_LINK_EMAIL', true),
  stateTtlSeconds: getOptionalEnvInt('SOCIAL_STATE_TTL', 600),
} as const);
