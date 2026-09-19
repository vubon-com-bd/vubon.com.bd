/**
 * Web Push (VAPID) configuration
 * @module shared-config/platform/notification
 */
import { getOptionalEnv, getOptionalEnvBool } from '../../common/env/env.helper';

export const WEB_PUSH_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('WEB_PUSH_ENABLED', false),
  vapidPublicKey: getOptionalEnv('WEB_PUSH_VAPID_PUBLIC', ''),
  vapidPrivateKey: getOptionalEnv('WEB_PUSH_VAPID_PRIVATE', ''),
  subject: getOptionalEnv('WEB_PUSH_SUBJECT', 'mailto:admin@vubon.com.bd'),
  ttlSeconds: 2419200,
});
