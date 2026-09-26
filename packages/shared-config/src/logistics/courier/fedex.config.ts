import { getOptionalEnv } from '../../common/env/env.helper';

export const FEDEX_CONFIG = Object.freeze({
  apiKey: getOptionalEnv('FEDEX_API_KEY', ''),
  apiSecret: getOptionalEnv('FEDEX_API_SECRET', ''),
  apiUrl: getOptionalEnv('FEDEX_API_URL', 'https://apis.fedex.com'),
  accountNumber: getOptionalEnv('FEDEX_ACCOUNT_NUMBER', ''),
  timeoutMs: Number(getOptionalEnv('FEDEX_TIMEOUT_MS', '30000')),
  retryAttempts: Number(getOptionalEnv('FEDEX_RETRY_ATTEMPTS', '3')),
});
