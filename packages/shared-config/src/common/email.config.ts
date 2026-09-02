/**
 * Email Configuration
 * ইমেইল কনফিগারেশন
 */
export type EmailProvider = 'sendgrid' | 'mailgun' | 'aws' | 'smtp';

export interface EmailConfig {
  provider: EmailProvider;
  apiKey: string;
  apiSecret: string;
  from: string;
  fromName: string;
  fromNameBangla: string;
  baseUrl: string;
  retryAttempts: number;
  retryDelay: number;
  rateLimit: number;
  testMode: boolean;
}

export const emailConfig = (): EmailConfig => ({
  provider: (process.env.EMAIL_PROVIDER as EmailProvider) || 'sendgrid',
  apiKey: process.env.EMAIL_API_KEY || '',
  apiSecret: process.env.EMAIL_API_SECRET || '',
  from: process.env.EMAIL_FROM || 'noreply@vubon.com.bd',
  fromName: process.env.EMAIL_FROM_NAME || 'Vubon Platform',
  fromNameBangla: process.env.EMAIL_FROM_NAME_BANGLA || 'ভুবন প্ল্যাটফর্ম',
  baseUrl: process.env.EMAIL_BASE_URL || 'https://api.sendgrid.com/v3',
  retryAttempts: parseInt(process.env.EMAIL_RETRY_ATTEMPTS || '3'),
  retryDelay: parseInt(process.env.EMAIL_RETRY_DELAY || '5000'),
  rateLimit: parseInt(process.env.EMAIL_RATE_LIMIT || '1000'),
  testMode: process.env.EMAIL_TEST_MODE === 'true',
});
