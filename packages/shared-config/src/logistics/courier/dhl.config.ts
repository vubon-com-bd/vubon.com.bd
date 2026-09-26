import { getOptionalEnv } from '../../common/env/env.helper';

export const DHL_CONFIG = Object.freeze({
  apiKey: getOptionalEnv('DHL_API_KEY', ''),
  apiUrl: getOptionalEnv('DHL_API_URL', 'https://api.dhl.com'),
  accountNumber: getOptionalEnv('DHL_ACCOUNT_NUMBER', ''),
  timeoutMs: Number(getOptionalEnv('DHL_TIMEOUT_MS', '30000')),
  retryAttempts: Number(getOptionalEnv('DHL_RETRY_ATTEMPTS', '3')),
});
