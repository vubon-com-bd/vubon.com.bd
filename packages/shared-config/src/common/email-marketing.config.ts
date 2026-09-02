/**
 * Email Marketing Configuration
 * ইমেইল মার্কেটিং কনফিগারেশন
 */
export type EmailMarketingProvider = 'mailchimp' | 'sendgrid' | 'mailgun' | 'custom';

export interface EmailMarketingConfig {
  enabled: boolean;
  provider: EmailMarketingProvider;
  apiKey: string;
  listId: string;
  segments: {
    name: string;
    condition: string;
  }[];
  campaigns: {
    enabled: boolean;
    autoGenerate: boolean;
    schedule: string;
  };
  templates: {
    enabled: boolean;
    path: string;
    defaultTemplate: string;
  };
  analytics: {
    enabled: boolean;
    trackOpens: boolean;
    trackClicks: boolean;
  };
  compliance: {
    doubleOptIn: boolean;
    unsubscribeLink: boolean;
    footer: string;
  };
}

export const createEmailMarketingConfig = (): EmailMarketingConfig => ({
  enabled: true,
  provider: (process.env.EMAIL_MARKETING_PROVIDER as EmailMarketingProvider) || 'sendgrid',
  apiKey: process.env.EMAIL_MARKETING_API_KEY || '',
  listId: process.env.EMAIL_MARKETING_LIST_ID || '',
  segments: [
    { name: 'Active Users', condition: 'lastLogin > 30' },
    { name: 'New Users', condition: 'createdAt > 7' },
    { name: 'VIP Users', condition: 'totalSpent > 5000' },
  ],
  campaigns: {
    enabled: true,
    autoGenerate: false,
    schedule: '0 8 * * 1',
  },
  templates: {
    enabled: true,
    path: 'templates/email-marketing',
    defaultTemplate: 'default',
  },
  analytics: {
    enabled: true,
    trackOpens: true,
    trackClicks: true,
  },
  compliance: {
    doubleOptIn: true,
    unsubscribeLink: true,
    footer: 'You are receiving this because you opted in at vubon.com.bd',
  },
});
