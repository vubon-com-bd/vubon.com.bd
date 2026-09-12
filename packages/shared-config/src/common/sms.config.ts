import { getOptionalEnv } from './env/env.validation';

export const smsConfig = {
  provider: getOptionalEnv('SMS_PROVIDER', 'twilio'),
  apiKey: getOptionalEnv('SMS_API_KEY', ''),
  apiSecret: getOptionalEnv('SMS_API_SECRET', ''),
  from: getOptionalEnv('SMS_FROM', ''),
  maxSmsLength: 160,
  maxUnicodeSmsLength: 70,
  maxSmsPerBatch: 100,
  timeout: 10,
  retryAttempts: 3,
  retryDelay: 60,
} as const;
