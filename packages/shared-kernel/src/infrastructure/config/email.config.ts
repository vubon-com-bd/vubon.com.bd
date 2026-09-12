export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  from: string;
  fromName: string;
  rateLimit: number;
  testMode: boolean;
}

export const getEmailConfig = (): EmailConfig => ({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASSWORD || '',
  },
  from: process.env.EMAIL_FROM || 'noreply@vubon.com.bd',
  fromName: process.env.EMAIL_FROM_NAME || 'Vubon Platform',
  rateLimit: parseInt(process.env.EMAIL_RATE_LIMIT || '1000'),
  testMode: process.env.EMAIL_TEST_MODE === 'true',
});
