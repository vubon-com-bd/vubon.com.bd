/**
 * SSLWireless SMS configuration
 * @module shared-config/platform/notification
 */
import { getOptionalEnv, getOptionalEnvBool } from '../../common/env/env.helper.js';

export const SSLWIRELESS_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('SSLWIRELESS_ENABLED', false),
  apiKey: getOptionalEnv('SSLWIRELESS_API_KEY', ''),
  senderId: getOptionalEnv('SSLWIRELESS_SENDER_ID', 'VUBON'),
  baseUrl: getOptionalEnv('SSLWIRELESS_BASE_URL', 'https://esms.mimsms.com'),
});
