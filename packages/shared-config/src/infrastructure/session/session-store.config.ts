/**
 * Session store configuration
 * @module shared-config/infrastructure/session
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const SESSION_STORE_CONFIG = Object.freeze({
  driver: getOptionalEnv('SESSION_STORE_DRIVER', 'redis'),
  prefix: getOptionalEnv('SESSION_STORE_PREFIX', 'vubon:session:'),
  ttlSeconds: getOptionalEnvInt('SESSION_STORE_TTL_SECONDS', 86400),
  touchAfterSeconds: getOptionalEnvInt('SESSION_STORE_TOUCH_AFTER_SECONDS', 300),
  disableTouch: getOptionalEnvBool('SESSION_STORE_DISABLE_TOUCH', false),
  serialize: getOptionalEnv('SESSION_STORE_SERIALIZE', 'json'), // json | msgpack
  encrypt: getOptionalEnvBool('SESSION_STORE_ENCRYPT', false),
  keyPrefix: getOptionalEnv('SESSION_STORE_KEY_PREFIX', 'vubon:sess:'),
} as const);

export type SessionStoreConfig = typeof SESSION_STORE_CONFIG;
