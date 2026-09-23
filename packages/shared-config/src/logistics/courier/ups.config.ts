import { getOptionalEnv } from '../../common/env/env.helper';

export const UPS_CONFIG = Object.freeze({
  apiKey: getOptionalEnv('UPS_API_KEY', ''),
  apiUrl: getOptionalEnv('UPS_API_URL', 'https://onlinetools.ups.com'),
  accountNumber: getOptionalEnv('UPS_ACCOUNT_NUMBER', ''),
  timeoutMs: Number(getOptionalEnv('UPS_TIMEOUT_MS', '30000')),
  retryAttempts: Number(getOptionalEnv('UPS_RETRY_ATTEMPTS', '3')),
});
