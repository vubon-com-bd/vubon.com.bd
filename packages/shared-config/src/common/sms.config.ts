/**
 * SMS Configuration
 * এসএমএস কনফিগারেশন
 */
export type SMSProvider = 'banglasms' | 'sendsms' | 'twilio' | 'mim';

export interface SMSConfig {
  enabled: boolean;
  provider: SMSProvider;
  apiKey: string;
  apiSecret: string;
  senderId: string;
  senderIdBangla: string;
  baseUrl: string;
  retryAttempts: number;
  retryDelay: number;
  rateLimit: number;
  testMode: boolean;
  maxLength: number;
}

export const createSMSConfig = (): SMSConfig => ({
  enabled: true,
  provider: (process.env.SMS_PROVIDER as SMSProvider) || 'banglasms',
  apiKey: process.env.SMS_API_KEY || '',
  apiSecret: process.env.SMS_API_SECRET || '',
  senderId: process.env.SMS_SENDER_ID || 'VUBON',
  senderIdBangla: process.env.SMS_SENDER_ID_BANGLA || 'ভুবন',
  baseUrl: process.env.SMS_BASE_URL || 'https://api.banglasms.com/v1',
  retryAttempts: parseInt(process.env.SMS_RETRY_ATTEMPTS || '3'),
  retryDelay: parseInt(process.env.SMS_RETRY_DELAY || '5000'),
  rateLimit: parseInt(process.env.SMS_RATE_LIMIT || '100'),
  testMode: process.env.SMS_TEST_MODE === 'true',
  maxLength: 160,
});
