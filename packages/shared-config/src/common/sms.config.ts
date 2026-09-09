import { getEnv } from './env/env.validation';

export const smsConfig = {
  provider: getEnv('SMS_PROVIDER', 'twilio'),
  apiKey: getEnv('SMS_API_KEY', ''),
  apiSecret: getEnv('SMS_API_SECRET', ''),
  from: getEnv('SMS_FROM', ''),
  maxSmsLength: 160,
  maxUnicodeSmsLength: 70,
  maxSmsPerBatch: 100,
  timeout: 10,
  retryAttempts: 3,
  retryDelay: 60,
};
