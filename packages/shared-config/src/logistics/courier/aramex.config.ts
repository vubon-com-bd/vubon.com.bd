import { getOptionalEnv } from '../../common/env/env.helper';

export const ARAMEX_CONFIG = Object.freeze({
  apiKey: getOptionalEnv('ARAMEX_API_KEY', ''),
  apiUrl: getOptionalEnv('ARAMEX_API_URL', 'https://ws.aramex.net'),
  accountNumber: getOptionalEnv('ARAMEX_ACCOUNT_NUMBER', ''),
  timeoutMs: Number(getOptionalEnv('ARAMEX_TIMEOUT_MS', '30000')),
  retryAttempts: Number(getOptionalEnv('ARAMEX_RETRY_ATTEMPTS', '3')),
});
